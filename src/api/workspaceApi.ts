import { WorkSpace } from "../types/backend";
import axiosInstance from "./index";
import Cookies from "js-cookie";

function getWorkspaces() {
  const token = Cookies.get("user")
  return axiosInstance.get<null, { pagination: { data: WorkSpace[] } }>(
    "v1/workspace",{
      headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
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
