import { Album } from './album';

export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  albums: Album[];
}
