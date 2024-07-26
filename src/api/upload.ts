import axiosInstance from "./index";
function upload() {
  return axiosInstance.post<null>("uploads", {
    email: "admin@me.com",
    password: "CloudApp@123",
    token_name: "iphone 12",
  });
}

export { upload };
