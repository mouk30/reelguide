import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function calculateCrc(buf) {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'binary');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(calculateCrc(body), 0);
  return Buffer.concat([len, body, crc]);
}

function createPng(width, height, drawFn) {
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // Filter type None
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData, { level: 9 });
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // non-interlaced

  return Buffer.concat([
    header,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflated),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Convert PNG to simple single-image ICO
function createIcoFromPng(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type (1 for icon)
  header.writeUInt16LE(1, 4); // 1 image

  const directoryEntry = Buffer.alloc(16);
  directoryEntry.writeUInt8(width >= 256 ? 0 : width, 0);
  directoryEntry.writeUInt8(height >= 256 ? 0 : height, 1);
  directoryEntry.writeUInt8(0, 2); // Colors (0 = 256+ colors)
  directoryEntry.writeUInt8(0, 3); // Reserved
  directoryEntry.writeUInt16LE(1, 4); // Color planes
  directoryEntry.writeUInt16LE(32, 6); // Bits per pixel
  directoryEntry.writeUInt32LE(pngBuffer.length, 8); // Image byte size
  directoryEntry.writeUInt32LE(6 + 16, 12); // Offset of image data

  return Buffer.concat([header, directoryEntry, pngBuffer]);
}

const publicDir = path.resolve('public');
const ogDir = path.join(publicDir, 'og');
ensureDir(publicDir);
ensureDir(ogDir);

// 1. Generate Favicon SVG
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#176B4B" />
      <stop offset="100%" stop-color="#103B2C" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B7DB76" />
      <stop offset="100%" stop-color="#79B850" />
    </linearGradient>
  </defs>
  <!-- Background Rounded Rect -->
  <rect width="512" height="512" rx="112" fill="#103B2C" />
  
  <!-- Outer Shield Outline -->
  <path d="M 256 64 C 360 64 420 100 420 180 C 420 310 256 432 256 448 C 256 448 92 310 92 180 C 92 100 152 64 256 64 Z" 
        fill="url(#shieldGrad)" stroke="#B7DB76" stroke-width="12" />
        
  <!-- Stylized G + Leaf Emblem inside shield -->
  <!-- Outer Arc of G -->
  <path d="M 296 160 C 230 148 168 190 168 256 C 168 322 224 366 296 362 C 344 358 376 332 376 288 L 264 288 L 264 246 L 416 246 C 418 360 336 406 256 406 C 146 406 122 320 122 256 C 122 178 178 116 280 116 C 322 116 360 132 390 160 L 350 196 C 330 178 308 168 280 164 Z" 
        fill="#FFFFFF" opacity="0.96" />
        
  <!-- Sprouting Guardian Leaf on Top Right -->
  <path d="M 256 120 C 310 80 370 110 370 160 C 330 168 270 144 256 120 Z" 
        fill="url(#leafGrad)" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');

// Function to draw Shield + Emblem in pixel math for PNGs
function drawShieldEmblem(x, y, w, h) {
  // Normalize coords [-1, 1]
  const nx = (x / w) * 2 - 1;
  const ny = (y / h) * 2 - 1;

  // Background rounded square
  const cornerR = 0.78;
  const inBox = Math.abs(nx) < 0.94 && Math.abs(ny) < 0.94;
  const cornerDist = Math.hypot(Math.max(0, Math.abs(nx) - cornerR), Math.max(0, Math.abs(ny) - cornerR));
  if (cornerDist > 0.22) {
    return [0, 0, 0, 0]; // Transparent outer
  }

  // Base deep forest background
  let r = 16, g = 59, b = 44, a = 255;

  // Shield shape test
  // Top curve: ny between -0.72 and -0.4
  // Side taper down to (0, 0.75)
  const shieldY = ny + 0.1;
  const widthAtY = shieldY < -0.3 ? 0.64 : Math.max(0, 0.64 * (1 - (shieldY + 0.3) / 1.15));
  const inShield = Math.abs(nx) < widthAtY && shieldY >= -0.7 && shieldY <= 0.75;

  if (inShield) {
    // Shield fill: Evergreen
    r = 23; g = 107; b = 75;
    
    // Shield border
    const borderDist = Math.abs(Math.abs(nx) - widthAtY);
    if (borderDist < 0.04 || Math.abs(shieldY - (-0.7)) < 0.03 || Math.abs(shieldY - 0.75) < 0.04) {
      r = 183; g = 219; b = 118; // Lime border
    }

    // G glyph inside
    const distFromCenter = Math.hypot(nx, ny);
    if (distFromCenter > 0.22 && distFromCenter < 0.44) {
      // Cut out right opening
      const angle = Math.atan2(ny, nx);
      if (!(angle > -0.6 && angle < 0.2)) {
        r = 255; g = 255; b = 255; // White letter
      }
    }
    // G crossbar
    if (nx > 0.05 && nx < 0.38 && Math.abs(ny - 0.05) < 0.06) {
      r = 255; g = 255; b = 255;
    }

    // Leaf accent top right
    if (nx > 0.05 && nx < 0.45 && ny < -0.35 && ny > -0.65) {
      r = 183; g = 219; b = 118; // Lime Leaf
    }
  }

  return [r, g, b, a];
}

// Generate PNG sizes
const png48 = createPng(48, 48, drawShieldEmblem);
fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);

const icoData = createIcoFromPng(png48, 48, 48);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoData);

const png180 = createPng(180, 180, drawShieldEmblem);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);

const png192 = createPng(192, 192, drawShieldEmblem);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);

const png512 = createPng(512, 512, drawShieldEmblem);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

// Generate Open Graph image (1200 x 630)
// High contrast, deep forest gradient with clean framing & emblem
function drawOgImage(x, y, w, h) {
  const u = x / w;
  const v = y / h;

  // Background gradient: from #103B2C (top-left) to #0A261C (bottom-right)
  let r = Math.floor(16 * (1 - u * 0.4) * (1 - v * 0.2));
  let g = Math.floor(59 * (1 - u * 0.3) * (1 - v * 0.2));
  let b = Math.floor(44 * (1 - u * 0.4) * (1 - v * 0.2));

  // Accent subtle mesh curves
  const wave = Math.sin(u * 6 + v * 3) * 0.5 + 0.5;
  if (wave > 0.85) {
    g = Math.min(255, g + 15);
    b = Math.min(255, b + 10);
  }

  // Inner card boundary (x from 0.05 to 0.95, y from 0.08 to 0.92)
  if (u >= 0.05 && u <= 0.95 && v >= 0.08 && v <= 0.92) {
    // Border check
    const isBorder = (u <= 0.055 || u >= 0.945 || v <= 0.088 || v >= 0.912);
    if (isBorder) {
      return [183, 219, 118, 255]; // Lime border accent
    }
    // Card background #144936
    r = 20; g = 73; b = 54;

    // Draw emblem on left side (center around u = 0.22, v = 0.5, radius = 0.25)
    const ex = (u - 0.22) / 0.16;
    const ey = (v - 0.5) / 0.30;
    const emblemDist = Math.hypot(ex, ey);
    if (emblemDist <= 1.0) {
      if (emblemDist > 0.88) {
        return [183, 219, 118, 255]; // Lime ring
      } else if (emblemDist > 0.5 && emblemDist < 0.72) {
        return [255, 255, 255, 255]; // G arc
      } else {
        return [23, 107, 75, 255]; // Shield interior
      }
    }

    // Headline strip zone (right side text area styling)
    if (u >= 0.44 && u <= 0.88 && v >= 0.35 && v <= 0.42) {
      return [183, 219, 118, 255]; // Brand accent bar
    }
  }

  return [r, g, b, 255];
}

const ogBuffer = createPng(1200, 630, drawOgImage);
fs.writeFileSync(path.join(ogDir, 'green-guardian-home.png'), ogBuffer);

// Manifest
const manifest = {
  name: "그린가디언 - 릴게임 정보 허브",
  short_name: "그린가디언",
  description: "릴게임 사이트 그린가디언에서 다양한 릴게임의 종류와 특징, 이용 방법 및 게임별 정보를 확인하세요.",
  start_url: "/",
  display: "standalone",
  background_color: "#103B2C",
  theme_color: "#103B2C",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png"
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

console.log('All brand assets, favicons, OG images, and manifest generated successfully.');
