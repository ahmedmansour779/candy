import axiosInstance from "..";

function getAllUsers(params?: Record<string, number | string>) {
  return axiosInstance.get<null, { data: User[] }>(`/handleUsers`, { params });
}

function showUser(id: number) {
  return axiosInstance.get<null, { data: User }>(`/showUser/${id}`);
}

function addUser(data: Record<string, string | number>) {
  return axiosInstance.post<null>(`/addUser`, data);
}

function updateUser(id: number, data: Record<string, string | number>) {
  return axiosInstance.post<null>(`/updateUser/${id}`, data, {
    params: {
      _method: "put",
    },
  });
}

function deleteUser(id: number) {
  return axiosInstance.post<null>(`/deleteUser/${id}`, {
    _method: "delete",
  });
}

const usersApi = {
  getAllUsers,
  showUser,
  addUser,
  updateUser,
  deleteUser,
};
export default usersApi;
