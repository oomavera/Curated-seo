import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '../components/MDXComponents';
import BlogHeader from '../components/BlogHeader';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Curated Cleanings Blog',
    };
  }

  return {
    title: `${post.title} | Curated Cleanings Blog`,
    description: post.subtitle || `${post.title} - Expert cleaning insights from Curated Cleanings`,
    openGraph: {
      title: post.title,
      description: post.subtitle || `${post.title} - Expert cleaning insights from Curated Cleanings`,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle || `${post.title} - Expert cleaning insights from Curated Cleanings`,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen font-inter" style={{ backgroundColor: '#ffffff' }}>
      {/* Fixed Blog Header */}
      <BlogHeader variant="article" />
      
      {/* Back to Blog Link */}
      <div className="border-b border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center hover:underline transition-colors text-sm font-medium"
            style={{ color: '#000000' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category */}
          <div className="text-xs uppercase text-gray-500 tracking-wide font-medium mb-4">
            {post.category.replace('-', ' ')}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl leading-tight tracking-tight" style={{ color: '#000000' }}>
            {post.title}
          </h1>
          
          {/* Subtitle */}
          {post.subtitle && (
            <p className="mt-6 text-xl leading-relaxed" style={{ color: '#000000' }}>
              {post.subtitle}
            </p>
          )}
          
          {/* Article Metadata */}
          <div className="mt-8 text-sm" style={{ color: '#666666' }}>
            — {post.author}, {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} • {post.readingTime}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[2/1] max-w-6xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:underline hover:prose-a:no-underline prose-img:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:pl-6 prose-blockquote:italic" style={{ color: '#000000' }}>
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Article Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm" style={{ color: '#666666' }}>
              Published {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} by {post.author}
            </div>
            <Link
              href="/blog"
              className="font-medium hover:underline transition-colors text-sm"
              style={{ color: '#000000' }}
            >
              ← All Posts
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}