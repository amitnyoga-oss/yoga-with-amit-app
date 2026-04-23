
/// <reference types="vite/client" />

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCYTjNDSbrdhAV2QkE2W-UTA';

export async function fetchVideos(query: string = ''): Promise<Video[]> {
  if (!API_KEY || API_KEY === 'MY_YOUTUBE_API_KEY' || API_KEY.trim() === '') {
    console.warn('YouTube API Key missing or not configured. Returning mock data.');
    return getMockVideos();
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=12&order=date&type=video&q=${query}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return getMockVideos();
  }
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
