export interface Vinyl {
  id: string;
  artist: string;
  title: string;
  year: number;
  genre: string;
}

export interface VinylState {
  vinyls: Vinyl[];
  filter: { order: 'asc' | 'desc'; genre: string; artist: string };
  loadState: { status: 'idle' | 'loading' | 'loaded' | 'error' };
}
