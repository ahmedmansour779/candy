import { AddPlan, Plan } from "../../types/backend";
import axiosInstance from "../index";

function getAllplans(params?: Record<string, number>) {
  return axiosInstance.get<null, { products: Plan[] }>(`/allProducts`, params);
}

function showplan(id: number) {
  return axiosInstance.get<null, { product: Plan }>(`/showProduct/${id}`);
}

function addPlan(data: AddPlan) {
  return axiosInstance.post<null>(`/addProduct`, data);
}

function updatePlan(id: number, data: AddPlan) {
  return axiosInstance.put<null>(`/updateProduct/${id}`, data);
}

function deletePlan(id: number) {
  return axiosInstance.delete<null>(`/deleteProduct/${id}`);
}

const plansApi = {
  getAllplans,
  showplan,
  addPlan,
  updatePlan,
  deletePlan,
};
export default plansApi;
