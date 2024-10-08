import { Artist } from '../models';

export const ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'The Beatles',
    bio: 'The Beatles were an English rock band formed in Liverpool in 1960. With a line-up comprising John Lennon, Paul McCartney, George Harrison and Ringo Starr, they are regarded as the most influential band of all time.',
    imageUrl: 'assets/images/the-beatles.jpg',
    albums: [
      {
        id: '1',
        title: 'Please Please Me',
        year: 1963,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/PleasePleaseMe_albumcover.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '2',
        title: 'With the Beatles',
        year: 1963,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/42/Withthebeatlescover.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '3',
        title: "A Hard Day's Night",
        year: 1964,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/HardDayUK.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '4',
        title: 'Beatles for Sale',
        year: 1964,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Beatlesforsalecover.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '5',
        title: 'Help!',
        year: 1965,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/5/50/Help%21_%28The_Beatles_album_-_cover_art%29.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '6',
        title: 'Rubber Soul',
        year: 1965,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/50/Rubbersoulcover.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '7',
        title: 'Revolver',
        year: 1966,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/16/Revolver.jpg',
        artist: { id: '1', name: 'The Beatles' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
    ],
  },
  {
    id: '2',
    name: 'The Rolling Stones',
    bio: 'The Rolling Stones are an English rock band formed in London in 1962. The first settled line-up consisted of Brian Jones, Ian Stewart, Mick Jagger, Keith Richards, Bill Wyman, and Charlie Watts.',
    imageUrl: 'assets/images/the-rolling-stones.jpg',
    albums: [
      {
        id: '8',
        title: 'The Rolling Stones',
        year: 1964,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9b/RollingStonesalbum.jpg',
        artist: { id: '2', name: 'The Rolling Stones' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '9',
        title: 'The Rolling Stones No. 2',
        year: 1965,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4e/RollingStonesNo2albumcover.jpg',
        artist: { id: '2', name: 'The Rolling Stones' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '10',
        title: 'Out of Our Heads',
        year: 1965,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8b/OutofOurHeadsalbumcover.jpg',
        artist: { id: '2', name: 'The Rolling Stones' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '11',
        title: 'Aftermath',
        year: 1966,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Aftermath-RollingStones.jpg',
        artist: { id: '2', name: 'The Rolling Stones' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '12',
        title: 'Between the Buttons',
        year: 1967,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7e/BetweentheButtonsalbumcover.jpg',
        artist: { id: '2', name: 'The Rolling Stones' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
    ],
  },
  {
    id: '3',
    name: 'The Beach Boys',
    bio: "A band formed in Hawthorne, California, in 1961. The group's original lineup consisted of brothers Brian, Dennis, and Carl Wilson, their cousin Mike Love, and their friend Al Jardine.",
    imageUrl: 'assets/images/the-beach-boys.jpg',
    albums: [
      {
        id: '13',
        title: "Surfin' Safari",
        year: 1962,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9e/SurfinSafari.jpg',
        artist: { id: '3', name: 'The Beachboys' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '14',
        title: "Surfin' U.S.A.",
        year: 1963,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5e/SurfinUsa.jpg',
        artist: { id: '3', name: 'The Beachboys' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
      {
        id: '15',
        title: 'Pet Sounds',
        year: 1966,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/PetSoundsCover.jpg',
        artist: { id: '3', name: 'The Beachboys' },
        stock: { cd: 10, vinyl: 5, cassette: 0 },
      },
    ],
  },
];
