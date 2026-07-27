import { useEffect, useState } from 'react';
import { Instagram, Heart } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { salon, gallery } from '../data/mockData';

const GRAPH_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

export default function InstagramFeed() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!GRAPH_TOKEN || GRAPH_TOKEN === 'YOUR_INSTAGRAM_GRAPH_API_TOKEN') {
      // No token yet — use the curated placeholder grid built from gallery images.
      setPosts(gallery.slice(0, 6).map((g) => ({ id: g.id, media_url: g.image, caption: g.category })));
      return;
    }
    fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink&access_token=${GRAPH_TOKEN}`
    )
      .then((r) => r.json())
      .then((data) => setPosts(data.data?.slice(0, 6) || []))
      .catch(() => setPosts(gallery.slice(0, 6).map((g) => ({ id: g.id, media_url: g.image, caption: g.category }))));
  }, []);

  return (
    <section id="instagram" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Follow Along"
          title="Fresh looks, posted daily"
          subtitle={
            <>
              Follow{' '}
              <a
                href={`https://instagram.com/${salon.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="text-rose underline underline-offset-4"
              >
                @{salon.instagram}
              </a>{' '}
              for behind-the-scenes transformations.
            </>
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
          {(posts || Array.from({ length: 6 })).map((post, i) => (
            <a
              key={post?.id || i}
              href={post?.permalink || `https://instagram.com/${salon.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-blush"
            >
              {post?.media_url && (
                <img
                  src={post.media_url}
                  alt={post.caption || 'Aura Beauty Lounge Instagram post'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <div className="absolute inset-0 bg-plum/0 group-hover:bg-plum/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Heart size={20} className="text-ivory" />
              </div>
            </a>
          ))}
        </div>
        <a
          href={`https://instagram.com/${salon.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 font-body text-sm text-rose"
        >
          <Instagram size={16} /> View full profile
        </a>
      </div>
    </section>
  );
}
