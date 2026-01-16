export type AllGame = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  background_image?: string | null;
  released?: string | null;
  rating: number;
  ratings_count?: number;
  metacritic?: number | null;
  genres?: Genre[];
  parent_platforms?: ParentPlatform[];
};

export type ParentPlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export type Screenshot = {
  id: number;
  image: string;
  width?: number;
  height?: number;
  is_deleted?: boolean;
};

export type ScreenshotsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Screenshot[];
};

export type SingleGame = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  metacritic_platforms: MetacriticPlatform[];
  released?: string | null;
  background_image?: string;
  website?: string;
  rating: number;
  genres?: Genre[];
  description_raw: string;
};

export type MetacriticPlatform = {
  metascore: number;
  url: string;
  platform: {
    name: string;
    slug: string;
  };
};

export type Genre = {
  id: number;
  name: string;
  slug: string;
};
