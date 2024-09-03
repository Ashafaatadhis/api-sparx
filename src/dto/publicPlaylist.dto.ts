import { Playlist, PlaylistSong, Prisma, Song } from "@prisma/client";

type PlaylistWithSongs = Prisma.PlaylistGetPayload<{
  include: {
    playlistSong: {
      include: {
        Song: true;
      };
    };
  };
}>;

type SongPlaylist = Prisma.SongGetPayload<{
  include: {
    Genre: {
      select: {
        id: true;
        genreName: true;
      };
    };
    SubGenre: {
      select: {
        id: true;
        subGenreName: true;
      };
    };
  };
}>;

export const responsePublicPlaylistSong = (data: SongPlaylist) => {
  return {
    id: data.id,
    title: data.title,
    singer: data.singer,
    coverSong: data.coverSong,
    genreId: data.genreId,
    subGenreId: data.subGenreId,
    BPM: data.bpm,
    genre: {
      id: data.Genre.id,
      name: data.Genre.genreName,
    },
    subGenre: {
      id: data.SubGenre?.id,
      name: data.SubGenre?.subGenreName,
    },
    tempo: data.tempo,
    vocal: data.vocal,
    duration: data.duration,
    filePath: data.filePath,
    uploadedBy: data.uploadedBy,
  };
};

export const responsePublicPlaylist = (data: PlaylistWithSongs) => {
  return {
    id: data.id,
    playlistName: data.playlistName,
    createdBy: data.createdBy,
    isPublic: data.isPublic,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
    songs: data.playlistSong.map((value) => {
      return {
        id: value.Song.id,
        title: value.Song.title,
        singer: value.Song.singer,
        coverSong: value.Song.coverSong,
        genreId: value.Song.genreId,
        subGenreId: value.Song.subGenreId,
        BPM: value.Song.bpm,
        tempo: value.Song.tempo,
        vocal: value.Song.vocal,
        duration: value.Song.duration,
        filePath: value.Song.filePath,
        uploadedBy: value.Song.uploadedBy,
      };
    }),
  };
};
