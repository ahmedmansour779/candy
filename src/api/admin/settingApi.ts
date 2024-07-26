import { ISettingKey, Setting } from "../../types/backend";
import axiosInstance from "../index";
function getAllSettings() {
  return axiosInstance.get<null, Setting>(`/allsettings`);
}

function updateSetting(data: ISettingKey) {
  return axiosInstance.put<null, { success: true }>(`/editsettings`, {
    ...data,
  });
}

const settingApi = {
  getAllSettings,
  updateSetting,
};

export default settingApi;
