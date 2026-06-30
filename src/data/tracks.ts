export type Track = {
  title: string;
  src: string; // path under public/, e.g. "/media/audio/red-hat-sunday.mp3"
};

// HERO AUDIO PLAYER
// Export 20–30 second mp3 clips of your best tracks (you own the masters),
// drop them in public/media/audio/, and list them here. The player in the
// hero renders automatically once this array has at least one track —
// while it's empty, nothing shows and nothing breaks.
export const tracks: Track[] = [
  // { title: "Red Hat Sunday", src: "/media/audio/red-hat-sunday.mp3" },
  // { title: "Boot Sequence", src: "/media/audio/boot-sequence.mp3" },
];
