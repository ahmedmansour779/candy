/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from "@ant-design/icons";
import { Input, Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import PageHeading from "../../../components/PageHeading";
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
import { useEffect, useState } from "react";
import { fetchAdminSetting } from "../../../api/getAdminSetting";

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

  const [data,setData] = useState<any>({})
  useEffect(()=>{
    fetchAdminSetting(setData)
  },[])
  console.log(data)

  return (
    <div className="mb-16 sm:mb-0 p-8 max-md:p-4 ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
      {" "}
      <PageHeading title="Settings">
        <Input
          className="max-w-[364px] max-md:max-w-full border-none p-4"
          placeholder="Search here"
          prefix={<SearchOutlined />}
        />
      </PageHeading>
      {data && (
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "General",
              children: (
                <GeneralTab data={data?.General}/>
              ),
            },
            {
              key: "2",
              label: "Drive",
              children: (
                <DriveTab
                  data={data?.Drive}
                />
              ),
            },
            {
              key: "3",
              label: "Subscription",
              children: (
                <SubscriptionTab
                  data={data?.Subscriptions}
                />
              ),
            },
            {
              key: "4",
              label: "Localization",
              children: (
                <LocalizationTab data={data?.Localization}/>
              ),
            },
            {
              key: "5",
              label: "Analytics",
              children: (
                <AnalyticsTab
                data={data?.analytics}
                />
              ),
            },
            {
              key: "6",
              label: "Authentication",
              children: (
                <AuthenticationTab
                data={data?.Authentication}
                />
              ),
            },
            {
              key: "7",
              label: "Outgoing email",
              children: (
                <OutgoingEmailTab
                  data={data?.Outgoing_email_settings}
                />
              ),
            },
            {
              key: "8",
              label: "Uploading",
              children: (
                <UploadingTab data={data?.uploads}
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
