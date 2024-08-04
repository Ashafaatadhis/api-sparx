import { IPayload } from "../utils/jwt";
import { Playlist } from "@prisma/client";

export default (user: IPayload, playlist: Playlist) => {
  if (user.role === "ADMIN") {
    return true;
  }

  if (playlist.createdBy === user.sub) {
    return true;
  }

  return false;
};
