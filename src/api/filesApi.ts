import axiosInstance from "./index";

function getFileEntries() {
  return axiosInstance.get<null>("v1/drive/file-entries", {
    // params: {
    //   pageId: 0,
    //   folderId: 0,
    //   workspaceId: 2,
    //   orderBy: "updated_at",
    //   orderDir: "desc",
    //   page: 1,
    // },
  });
}
function storeFileEntry(data: { file: File }) {
  return axiosInstance.post<null>(
    "file-entries",
    { ...data },
    {
      params: { workspaceId: 2 },
    }
  );
}

const filesApi = {
  getFileEntries,
  storeFileEntry,
};

export default filesApi;
