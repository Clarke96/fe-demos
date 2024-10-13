export interface Album {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  artist: { name: string; id: string };
  stock: number;
  rare: boolean;
}
