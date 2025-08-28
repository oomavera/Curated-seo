import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, BlogPost } from '@/lib/blog';
import BlogHeader from './components/BlogHeader';

export const metadata: Metadata = {
  title: 'Cleaning Tips & Insights | Curated Cleanings Blog',
  description: 'Expert cleaning tips, seasonal guides, and behind-the-scenes insights from our professional house cleaning team in Oviedo, Florida.',
  openGraph: {
    title: 'Cleaning Tips & Insights | Curated Cleanings Blog',
    description: 'Expert cleaning tips, seasonal guides, and behind-the-scenes insights from our professional house cleaning team in Oviedo, Florida.',
    type: 'website',
  },
};

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg">
        <div className="aspect-[2/1] relative overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4">
        <div className="text-xs uppercase text-gray-500 tracking-wide font-medium">
          {post.category.replace('-', ' ')}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-3xl font-bold mt-2 group-hover:underline leading-tight" style={{ color: '#000000' }}>
            {post.title}
          </h2>
        </Link>
        <p className="text-base mt-3 leading-relaxed line-clamp-2" style={{ color: '#000000' }}>
          {post.excerpt || post.subtitle}
        </p>
        <p className="text-sm mt-3" style={{ color: '#666666' }}>
          — {post.author}, {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-3">
        <div className="text-xs uppercase text-gray-500 tracking-wide font-medium">
          {post.category.replace('-', ' ')}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold mt-1 group-hover:underline leading-tight" style={{ color: '#000000' }}>
            {post.title}
          </h2>
        </Link>
        <p className="text-sm mt-1 leading-relaxed line-clamp-2" style={{ color: '#000000' }}>
          {post.excerpt || post.subtitle}
        </p>
        <p className="text-xs mt-2" style={{ color: '#666666' }}>
          — {post.author}, {new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
    </article>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featuredPost, ...otherPosts] = posts;
  const staggeredPosts = otherPosts.slice(0, 3);
  const standardPosts = otherPosts.slice(3);

  return (
    <div className="min-h-screen font-inter" style={{ backgroundColor: '#ffffff' }}>
      {/* Fixed Blog Header */}
      <BlogHeader variant="blog" />
      
      {/* Blog Header */}
      <div className="py-20 pt-32" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl tracking-tight" style={{ color: '#000000' }}>
              Cleaning Insights
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl leading-relaxed" style={{ color: '#000000' }}>
              Expert advice, seasonal guides, and behind-the-scenes stories from our professional cleaning team
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ backgroundColor: '#ffffff' }}>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
              Coming Soon!
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#000000' }}>
              We&apos;re working on creating amazing content for you. Check back soon for cleaning tips and insights.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Featured Post - Full Width */}
            {featuredPost && (
              <section>
                <FeaturedPostCard post={featuredPost} />
              </section>
            )}

            {/* Staggered Middle Section */}
            {staggeredPosts.length > 0 && (
              <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 grid-auto-flow-dense">
                {staggeredPosts.map((post, index) => (
                  <div
                    key={post.slug}
                    className={`${
                      index === 0 ? 'lg:col-span-2' : ''
                    } ${index === 1 ? 'md:col-start-2 lg:col-start-3' : ''}`}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </section>
            )}

            {/* Standard Vertical Feed */}
            {standardPosts.length > 0 && (
              <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {standardPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}