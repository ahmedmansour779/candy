import axiosInstance from "./index";

function login(data: { email: string; password: string }) {
  return axiosInstance.post<null>("auth/login", {
    ...data,
    token_name: "iphone 12",
  });
}
function register() {
  return axiosInstance.post<null>("auth/register", {
    email: "mahmoud@me.com",
    password: "CloudApp@123",
    token_name: "iphone 12",
  });
}

const authApi = {
  login,
  register,
};

export default authApi;
