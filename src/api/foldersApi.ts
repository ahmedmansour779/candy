import { Folders } from "../types/backend";
import axiosInstance from "./index";
function getFolders() {
  return axiosInstance.get<null, { folders: Folders[] }>("users/1/folders", {
    params: {
      workspaceId: 2,
      userId: 1,
    },
  });
}

const foldersApi = {
  getFolders,
};
export default foldersApi;
