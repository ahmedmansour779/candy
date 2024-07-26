import { AddRole, Role } from "../../types/backend";
import axiosInstance from "../index";

function getAllRoles(params?: Record<string, number>) {
  return axiosInstance.get<null, { data: Role[] }>(`/allRole`, params);
}

function showRole(id: number) {
  return axiosInstance.get<null, { data: Role }>(`/showRole/${id}`);
}

function addRole(data: Record<string, string | number>) {
  return axiosInstance.post<null>(`/addRole`, data);
}

function updateRole(id: number, data: AddRole) {
  return axiosInstance.post<null>(`/updateRole/${id}`, data, {
    params: {
      _method: "put",
    },
  });
}

function deleteRole(id: number) {
  return axiosInstance.post<null>(`/deleteRole/${id}`, {
    _method: "delete",
  });
}

const rolesApi = {
  getAllRoles,
  showRole,
  addRole,
  updateRole,
  deleteRole,
};
export default rolesApi;
