import { deleteFiles } from "../utils/uploadFile";

export default async function deleteFile(file: string): Promise<boolean> {
  const { result } = await deleteFiles(file);

  if (result !== "ok") {
    return false;
  }

  return true;
}
