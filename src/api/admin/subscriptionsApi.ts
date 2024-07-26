import { AddPlan, Subscription } from "../../types/backend";
import axiosInstance from "../index";

function getAllSubscriptions(params?: Record<string, number>) {
  return axiosInstance.get<null, { data: Subscription[] }>(
    `/allSubscriptions`,
    params
  );
}

function showSubscription(id: number) {
  return axiosInstance.get<null, { product: Subscription }>(
    `/showSubscription/${id}`
  );
}

function addSubscription(data: AddPlan) {
  return axiosInstance.post<null>(`/addSubscription`, data);
}

function updateSubscription(id: number, data: Subscription) {
  return axiosInstance.put<null>(`/updateSubscription/${id}`, data);
}

function deleteSubscription(id: number) {
  return axiosInstance.delete<null>(`/deleteSubscription/${id}`);
}

const subscriptionsApi = {
  getAllSubscriptions,
  showSubscription,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
export default subscriptionsApi;
