import React from 'react';
import { ListOrdered } from 'lucide-react';

interface TableOfContentsProps {
  items: { id: string; title: string }[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-[#176B4B]/5 border border-[#176B4B]/20 rounded-2xl p-5 my-6">
      <div className="flex items-center gap-2 text-[#103B2C] font-bold text-sm mb-3">
        <ListOrdered className="w-4 h-4 text-[#176B4B]" />
        <span>이 문서의 목차 (Table of Contents)</span>
      </div>
      <nav aria-label="문서 목차">
        <ol className="space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-stone-700 hover:text-[#176B4B] hover:underline flex items-center gap-2 py-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#176B4B]/40 shrink-0" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
