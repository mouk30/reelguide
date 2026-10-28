import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav
      aria-label="경로 탐색"
      className="py-3 px-4 sm:px-0 text-xs sm:text-sm text-stone-600 font-medium overflow-x-auto whitespace-nowrap"
    >
      <ol
        className="flex items-center gap-1.5"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Root Item */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-1"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            itemProp="item"
            className="flex items-center gap-1 text-stone-500 hover:text-[#103B2C] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#176B4B]" />
            <span itemProp="name">홈</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href) onNavigate(item.href);
                  }}
                  itemProp="item"
                  className="text-stone-500 hover:text-[#103B2C] transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span
                  itemProp="name"
                  className="text-[#103B2C] font-bold"
                  aria-current={isLast ? 'location' : undefined}
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
