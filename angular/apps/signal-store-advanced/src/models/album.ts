export interface Album {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  artist: { name: string; id: string };
  stock: {
    cd: number;
    vinyl: number;
    cassette: number;
  };
}
