import Image from 'next/image';
import { ReactNode } from 'react';

interface QuoteBlockProps {
  children: ReactNode;
  author?: string;
}

export function QuoteBlock({ children, author }: QuoteBlockProps) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg">
      <div className="text-lg italic text-gray-700 mb-2">
        {children}
      </div>
      {author && (
        <cite className="text-sm font-medium text-gray-600 not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}

interface CalloutProps {
  children: ReactNode;
  type?: 'tip' | 'warning' | 'info';
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    tip: '💡',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-6 ${styles[type]}`}>
      <div className="flex items-start">
        <span className="text-xl mr-3 mt-0.5">{icons[type]}</span>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ImageWithCaptionProps {
  src: string;
  caption: string;
  alt?: string;
}

export function ImageWithCaption({ src, caption, alt }: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt || caption}
          fill
          className="object-cover"
        />
      </div>
      <figcaption className="text-center text-sm text-gray-600 mt-3 italic">
        {caption}
      </figcaption>
    </figure>
  );
}

// Custom heading components with better styling
function H1({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl font-bold mt-12 mb-6" style={{ color: '#000000' }}>{children}</h1>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: '#000000' }}>{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-medium mt-8 mb-3" style={{ color: '#000000' }}>{children}</h3>;
}

// Custom paragraph with better spacing
function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed mb-6" style={{ color: '#000000' }}>{children}</p>;
}

// Custom list components
function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc list-inside space-y-2 mb-6" style={{ color: '#000000' }}>{children}</ul>;
}

function OL({ children }: { children: ReactNode }) {
  return <ol className="list-decimal list-inside space-y-2 mb-6" style={{ color: '#000000' }}>{children}</ol>;
}

function LI({ children }: { children: ReactNode }) {
  return <li className="leading-relaxed" style={{ color: '#000000' }}>{children}</li>;
}

// Export all components for MDX
export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  QuoteBlock,
  Callout,
  ImageWithCaption,
};