import prisma from '@/lib/prisma';

interface Video {
  id: string;
  title: string;
  url: string | null;
  playlistUrl: string | null;
  createdAt: Date;
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
        {videos.map((video: Video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
        ))}
      </div>
    </div>
  );
} 