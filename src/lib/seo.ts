import { siteConfig, buildAbsoluteUrl } from '../config/site';

export interface SeoMetaProps {
  title?: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumb?: { label: string; href?: string }[];
  faqItems?: { question: string; answer: string }[];
}

export function applySeoMetadata({
  title,
  description,
  path,
  type = 'website',
  image = '/og/green-guardian-home.png',
  publishedTime,
  modifiedTime,
  breadcrumb,
  faqItems
}: SeoMetaProps) {
  if (typeof document === 'undefined') return;

  const isHome = path === '/' || path === '';
  const finalTitle = isHome ? siteConfig.mainTitle : (title ? `${title} | ${siteConfig.name}` : siteConfig.mainTitle);
  const finalDescription = isHome ? siteConfig.mainDescription : (description || siteConfig.mainDescription);
  const canonicalUrl = buildAbsoluteUrl(path);
  const imageUrl = buildAbsoluteUrl(image);

  // 1. Document Title
  document.title = finalTitle;

  // 2. Helper to set or create meta tag
  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      if (isProperty) {
        el.setAttribute('property', nameOrProperty);
      } else {
        el.setAttribute('name', nameOrProperty);
      }
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Primary Meta Tags
  setMeta('description', finalDescription);
  setMeta('robots', 'index, follow');

  // 4. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 5. Open Graph
  setMeta('og:type', type, true);
  setMeta('og:locale', 'ko_KR', true);
  setMeta('og:site_name', siteConfig.name, true);
  setMeta('og:title', finalTitle, true);
  setMeta('og:description', finalDescription, true);
  setMeta('og:url', canonicalUrl, true);
  setMeta('og:image', imageUrl, true);

  // 6. Twitter
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', finalTitle);
  setMeta('twitter:description', finalDescription);
  setMeta('twitter:image', imageUrl);

  // 7. Structured Data (JSON-LD)
  let scriptEl = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'seo-json-ld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const baseOrigin = buildAbsoluteUrl('/');
  const orgId = `${baseOrigin}#organization`;
  const websiteId = `${baseOrigin}#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  const graph: any[] = [
    {
      "@type": "Organization",
      "@id": orgId,
      "name": siteConfig.name,
      "url": baseOrigin,
      "logo": {
        "@type": "ImageObject",
        "url": buildAbsoluteUrl('/icon-512.png')
      },
      "description": "릴게임 이용자를 위한 신뢰 기반 비영리 정보 허브 및 건전한 게임 가이드"
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      "url": baseOrigin,
      "name": siteConfig.name,
      "inLanguage": "ko-KR",
      "publisher": { "@id": orgId }
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      "url": canonicalUrl,
      "name": finalTitle,
      "description": finalDescription,
      "inLanguage": "ko-KR",
      "isPartOf": { "@id": websiteId }
    }
  ];

  // Add Article Schema for Guides and Game pages
  if (type === 'article' && !isHome) {
    graph.push({
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      "isPartOf": { "@id": webpageId },
      "headline": title || finalTitle,
      "description": finalDescription,
      "image": imageUrl,
      "datePublished": publishedTime || siteConfig.verifiedDate,
      "dateModified": modifiedTime || siteConfig.verifiedDate,
      "inLanguage": "ko-KR",
      "author": {
        "@type": "Organization",
        "name": siteConfig.editorialTeam,
        "url": baseOrigin
      },
      "publisher": { "@id": orgId },
      "mainEntityOfPage": { "@id": webpageId }
    });
  }

  // Add BreadcrumbList Schema if breadcrumbs exist
  if (breadcrumb && breadcrumb.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? buildAbsoluteUrl(item.href) : canonicalUrl
      }))
    });
  }

  // Add FAQPage Schema if faqItems exist and are displayed
  if (faqItems && faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  scriptEl.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  }, null, 2);
}
