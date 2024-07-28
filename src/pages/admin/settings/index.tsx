import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input, Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import settingApi from "../../../api/admin/settingApi";
import PageHeading from "../../../components/PageHeading";
import { ISettingKey, SubscriptionSettings } from "../../../types/backend";
import AnalyticsTab from "./AnalyticsTab";
import AuthenticationTab from "./AuthenticationTab";
import DriveTab from "./DriveTab";
import GeneralTab from "./GeneralTab";
import LocalizationTab from "./LocalizationTab";
import OutgoingEmailTab from "./OutgoingEmailTab";
import SubscriptionTab from "./SubscriptionTab";
import UploadingTab from "./UploadingTab";
import Cache from "./Cache";
import Logging from "./Logging";

enum EnumTab {
  general = 1,
  drive,
  subscription,
  localization,
  analytics,
  authentication,
  outgoing_email,
  uploading,
  cache,
  logging,
}
type TabKey = keyof typeof EnumTab;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabKey = (searchParams.get("tab") || "general") as TabKey;
  const tabIndex = String(EnumTab[tabKey]) || "1";

  const SettingData = useQuery({
    queryKey: ["roles"],
    queryFn: () => settingApi.getAllSettings(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ISettingKey) => settingApi.updateSetting(data),
    onSuccess: () => {
      SettingData.refetch();
    },
  });
  console.log(SettingData.data?.General);

  return (
    <div className="p-8 max-md:p-4">
      {" "}
      <PageHeading title="Settings">
        <Input
          className="max-w-[364px] max-md:max-w-full border-none p-4"
          placeholder="Search here"
          prefix={<SearchOutlined />}
        />
      </PageHeading>
      {SettingData.data && (
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "General",
              children: (
                <GeneralTab
                  data={SettingData.data?.General}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "2",
              label: "Drive",
              children: (
                <DriveTab
                  data={SettingData.data?.Drive}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "3",
              label: "Subscription",
              children: (
                <SubscriptionTab
                  data={SettingData.data.Subscriptions as unknown as SubscriptionSettings}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "4",
              label: "Localization",
              children: (
                <LocalizationTab
                // data={SettingData.data?.Localization}
                // onSave={updateMutation.mutate}
                // isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "5",
              label: "Analytics",
              children: (
                <AnalyticsTab
                // data={SettingData.data?.analytics}
                // onSave={updateMutation.mutate}
                // isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "6",
              label: "Authentication",
              children: (
                <AuthenticationTab
                // data={SettingData.data?.Authentication}
                // onSave={updateMutation.mutate}
                // isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "7",
              label: "Outgoing email",
              children: (
                <OutgoingEmailTab
                // data={SettingData.data?.Outgoing_email_settings}
                // onSave={updateMutation.mutate}
                // isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "8",
              label: "Uploading",
              children: (
                <UploadingTab
                />
              ),
            },
            {
              key: "9",
              label: "Cache",
              children: (
                <Cache/>
              ),
            },
            {
              key: "10",
              label: "Logging",
              children: (
                <Logging/>
              ),
            },
          ]}
          activeKey={tabIndex}
          onTabClick={(clickedTab) =>
            setSearchParams({ tab: EnumTab[Number(clickedTab)] })
          }
        />
      )}
    </div>
  );
};

export default Index;
