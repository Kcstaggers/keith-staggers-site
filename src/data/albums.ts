export type Album = {
  slug: string;
  title: string;
  spotifyId: string;
  appleMusicUrl?: string;
  amazonMusicUrl?: string;
  featured?: boolean;
  featuredBlurb?: string;
};

export const albums: Album[] = [
  {
    slug: "red-hat-sunday",
    title: "Red Hat Sunday",
    spotifyId: "1Fc9lc3SCo6LcblFj0WRQ4",
    appleMusicUrl: "https://music.apple.com/us/song/red-hat-sunday/1851424112",
    amazonMusicUrl: "https://music.amazon.com/albums/B0FZCP7JCX",
    featured: true,
    featuredBlurb:
      "The latest single. New cut, fresh off the bench. Press play.",
  },
  {
    slug: "deconstruction-hymns",
    title: "Deconstruction Hymns",
    spotifyId: "5ZG6C3fh1wAkc9w2qZioVg",
    appleMusicUrl: "https://music.apple.com/us/album/deconstruction-hymns/1841387567",
    amazonMusicUrl: "https://music.amazon.com/albums/B0FRYN3HY8",
  },
  {
    slug: "christmas-noel",
    title: "Christmas Noel",
    spotifyId: "1Ty8tkOz6PMHJixRd8A3Ii",
    appleMusicUrl: "https://music.apple.com/us/album/christmas-noel/1843011727",
    amazonMusicUrl: "https://music.amazon.com/albums/B0FT1THYPG",
  },
  {
    slug: "baltimore-soul",
    title: "Baltimore Soul",
    spotifyId: "6mMiYdwU2dnSkopk3kNPgD",
    appleMusicUrl: "https://music.apple.com/us/album/baltimore-soul/1791514309",
    amazonMusicUrl: "https://music.amazon.com/albums/B0DTDNQVFD",
  },
  {
    slug: "sinners-scripture",
    title: "Sinners Scripture",
    spotifyId: "00jl4CK3t8PXx7m26z33kr",
    appleMusicUrl: "https://music.apple.com/us/album/sinners-scripture/1792330032",
    amazonMusicUrl: "https://music.amazon.com/albums/B0DTNMG1V8",
  },
  {
    slug: "charm-city",
    title: "Charm City",
    spotifyId: "0vjF5tl3OW5cpglMtuvB5c",
    appleMusicUrl: "https://music.apple.com/us/album/charm-city/1795975391",
    amazonMusicUrl: "https://music.amazon.com/albums/B0DWLTRYVY",
  },
  {
    slug: "unrealized",
    title: "Unrealized",
    spotifyId: "0IRJ7i3q5jmhE1fuhqnAyu",
    appleMusicUrl: "https://music.apple.com/us/album/unrealized/1823574074",
    amazonMusicUrl: "https://music.amazon.com/albums/B0FG1QR3R7",
  },
];
