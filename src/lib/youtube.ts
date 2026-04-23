
/// <reference types="vite/client" />

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  duration?: number;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const CHANNEL_ID = 'UCYTjNDSbrdhAV2QkE2W-UTA';

export async function fetchVideos(query: string = ''): Promise<Video[]> {
  if (!API_KEY || API_KEY === 'MY_YOUTUBE_API_KEY' || API_KEY.trim() === '') {
    console.warn('YouTube API Key missing or not configured. Returning mock data.');
    return getMockVideos();
  }

  try {
    // Add timestamp for cache busting to ensure we always get fresh data
    const timestamp = Date.now();
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=date&type=video&q=${query}&key=${API_KEY}&t=${timestamp}`,
      { cache: 'no-store' }
    );
    const searchData = await searchResponse.json();

    if (searchData.error) {
      throw new Error(searchData.error.message);
    }

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    
    // Fetch video details with cache busting
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}&t=${timestamp}`,
      { cache: 'no-store' }
    );
    const detailsData = await detailsResponse.json();
    
    // Create a map of durations
    const durationMap: Record<string, number> = {};
    detailsData.items.forEach((item: any) => {
      durationMap[item.id] = parseDuration(item.contentDetails.duration);
    });

    return searchData.items
      .map((item: any) => ({
        id: item.id.videoId,
        title: decodeHTMLEntities(item.snippet.title),
        thumbnail: item.snippet.thumbnails.high.url,
        description: decodeHTMLEntities(item.snippet.description),
        publishedAt: item.snippet.publishedAt,
        duration: durationMap[item.id.videoId] || 0
      }))
      .filter((video: any) => video.duration > 60); // Filter out Shorts (<= 60s)
  } catch (error) {
    console.error('Error fetching videos:', error);
    return getMockVideos();
  }
}

function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'"
  };
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&apos;/g, (match) => entities[match]);
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  return hours * 3600 + minutes * 60 + seconds;
}

function getMockVideos(): Video[] {
  return [
    {
      id: 'zIs77yYkscA',
      title: 'Morning Yoga Routine for Energy',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      description: 'Morning yoga energy flow to start your day right.',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'v7AYKMP6rOE',
      title: '15 Minute Yoga for Back Pain',
      thumbnail: 'https://images.unsplash.com/photo-1599447422178-c9b980993bc2?auto=format&fit=crop&q=80&w=800',
      description: 'Relieve tension in your lower back with this relief routine.',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'Enz98dDXQ28',
      title: 'Deep Breathing for Anxiety Relief',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
      description: 'Calm your mind with pranayama breathing techniques.',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-seniors',
      title: 'Gentle Yoga for Seniors 70+',
      thumbnail: 'https://images.unsplash.com/photo-1571019623452-970334dc518f?auto=format&fit=crop&q=80&w=800',
      description: 'A gentle 70+ seniors routine for mobility and balance.',
      publishedAt: new Date().toISOString(),
    },
    {
      id: "mock-men",
      title: "Yoga for Men: Full Body Strength",
      thumbnail: "https://images.unsplash.com/photo-1566501232841-11bb16e90191?auto=format&fit=crop&q=80&w=800",
      description: "Focusing on men's strength and flexibility.",
      publishedAt: new Date().toISOString(),
    },
    {
      id: "mock-women",
      title: "Yoga for Women: Wellness and Hormonal Balance",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
      description: "Focusing on women wellness and inner harmony.",
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-digestion',
      title: 'Yoga for Digestion and Gut Health',
      thumbnail: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
      description: 'Improve your gut health and digestion through mindful movement.',
      publishedAt: new Date().toISOString(),
    },
    {
      id: 'mock-eft',
      title: 'EFT Tapping for Emotional Healing',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
      description: 'Learn EFT tapping techniques for inner healing.',
      publishedAt: new Date().toISOString(),
    }
  ];
}
