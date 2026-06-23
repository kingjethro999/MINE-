import { createClient, Video } from "pexels";

export interface PexelsVideoItem {
  id: number;
  title: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
  width: number;
  height: number;
}

function getClient() {
  const apiKey = process.env.PEXELS_API_KEY ?? process.env.PEXEL_API_KEY;
  if (!apiKey) throw new Error("PEXELS_API_KEY (or PEXEL_API_KEY) is not configured");
  return createClient(apiKey);
}

function pickBestVideoFile(video: Video): string | null {
  const files = video.video_files ?? [];
  const mp4Files = files.filter((f) => String(f.file_type).includes("mp4"));
  const hd = mp4Files.find((f) => f.quality === "hd");
  const sd = mp4Files.find((f) => f.quality === "sd");
  return hd?.link ?? sd?.link ?? mp4Files[0]?.link ?? files[0]?.link ?? null;
}

export async function fetchPopularVideos(perPage = 20): Promise<PexelsVideoItem[]> {
  const client = getClient();
  const response = await client.videos.popular({ per_page: perPage, page: 1 });

  if (!("videos" in response)) return [];

  return response.videos
    .map((video) => {
      const videoUrl = pickBestVideoFile(video);
      if (!videoUrl) return null;
      return {
        id: video.id,
        title: `Video #${video.id}`,
        thumbnail: video.image,
        duration: video.duration,
        videoUrl,
        width: video.width,
        height: video.height,
      };
    })
    .filter((v): v is PexelsVideoItem => v !== null);
}

export async function fetchVideoById(id: number): Promise<PexelsVideoItem | null> {
  const client = getClient();
  const video = await client.videos.show({ id });
  const videoUrl = pickBestVideoFile(video);
  if (!videoUrl) return null;

  return {
    id: video.id,
    title: `Video #${video.id}`,
    thumbnail: video.image,
    duration: video.duration,
    videoUrl,
    width: video.width,
    height: video.height,
  };
}
