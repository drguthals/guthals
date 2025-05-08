import prisma from '@/lib/prisma';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Video {
  id: string;
  title: string;
  url: string | null;
  playlistUrl: string | null;
  createdAt: Date;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?\/\s]{11})/);
  console.log('🚀 ~ getYouTubeId ~ match:', match);
  return match ? match[1] : null;
}

function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    select: {
      id: true,
      title: true,
      url: true,
      playlistUrl: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">🎥 Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video: Video) => {
          const thumbnail = video.url ? getYouTubeThumbnail(video.url) : null;
          console.log('🚀 ~ getYouTubeThumbnail ~ thumbnail:', thumbnail);

          return (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {thumbnail && (
                <ImageWithFallback
                  src={thumbnail}
                  fallbackSrc="/placeholder-thumbnail.jpg"
                  alt={`Thumbnail for ${video.title}`}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <div className="flex flex-col space-y-2">
                  {video.url && (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch Video →
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 