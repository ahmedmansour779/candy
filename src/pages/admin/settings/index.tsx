import React from "react";
import { Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PageHeading from "../../../components/PageHeading";
import GeneralTab from "./GeneralTab";
import DriveTab from "./DriveTab";
import SubscriptionTab from "./SubscriptionTab";
import LocalizationTab from "./LocalizationTab";
import AnalyticsTab from "./AnalyticsTab";
import { useSearchParams } from "react-router-dom";
import AuthenticationTab from "./AuthenticationTab";
import OutgoingEmailTab from "./OutgoingEmailTab";
import { useMutation, useQuery } from "@tanstack/react-query";
import settingApi from "../../../api/admin/settingApi";

enum EnumTab {
  general = 1,
  drive,
  subscription,
  localization,
  analytics,
  authentication,
  outgoing_email,
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
                  data={SettingData.data?.Subscriptions}
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
                  data={SettingData.data?.Localization}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "5",
              label: "Analytics",
              children: (
                <AnalyticsTab
                  data={SettingData.data?.analytics}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "6",
              label: "Authentication",
              children: (
                <AuthenticationTab
                  data={SettingData.data?.Authentication}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
              ),
            },
            {
              key: "7",
              label: "Outgoing email",
              children: (
                <OutgoingEmailTab
                  data={SettingData.data?.Outgoing_email_settings}
                  onSave={updateMutation.mutate}
                  isLoading={updateMutation.isLoading}
                />
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
