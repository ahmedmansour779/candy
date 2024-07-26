import axiosInstance from "./index";

function getWorkspaces() {
  return axiosInstance.get<null, { pagination: { data: WorkSpace[] } }>(
    "v1/workspace"
  );
}

function createWorkspace(data: { name: string }) {
  return axiosInstance.post<null>("v1/workspace", data, {
    params: {
      workspaceId: 2,
    },
  });
}

function updateWorkspace({ id, name }: { id: number; name: string }) {
  return axiosInstance.put<null>(`v1/workspace/${id}`, {
    name,
  });
}

function deleteWorkspace(id: number) {
  return axiosInstance.delete<null>(`v1/workspace/${id}`);
}

const workspaceApi = {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
};

export default workspaceApi;
