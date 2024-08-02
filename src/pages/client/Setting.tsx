import React from "react";
import { Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useSearchParams } from "react-router-dom";
import PageHeading from "../../components/PageHeading";

import AccountSettingTab from "./ClientSettingstabs/AccountSettingTab";
import SocialLoginTab from "./ClientSettingstabs/SocialLoginTab";
import PasswordTab from "./ClientSettingstabs/PasswordTab";
import TfaTab from "./ClientSettingstabs/TfaTab";
import ActiveSessionsTab from "./ClientSettingstabs/ActiveSessionsTab";
import LocationsAndLanguageTab from "./ClientSettingstabs/LocationsAndLanguageTab";
import DeleteAccountTab from "./ClientSettingstabs/DeleteAccountTab";

enum EnumTab {
  account_details = 1,
  social_login,
  password,
  tfa,
  active_sessions,
  Locations_and_languages,
  delete_account,
}
type TabKey = keyof typeof EnumTab;

const Setting = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabKey = (searchParams.get("tab") || "account_details") as TabKey;
  const tabIndex = String(EnumTab[tabKey]) || "1";

  return (
    <div className="p-8 max-md:p-4 mb-16 sm:mb-0 ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
      {" "}
      <PageHeading title="Settings">
        <Input
          className="max-w-[364px] max-md:max-w-full border-none p-4"
          placeholder="Search here"
          prefix={<SearchOutlined />}
        />
      </PageHeading>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Account Details",
            children: <AccountSettingTab />,
          },
          {
            key: "2",
            label: "Social Login",
            children: <SocialLoginTab />,
          },
          {
            key: "3",
            label: "Password",
            children: <PasswordTab />,
          },
          {
            key: "4",
            label: "TFA",
            children: <TfaTab />,
          },
          {
            key: "5",
            label: "Active Sessions",
            children: <ActiveSessionsTab />,
          },
          {
            key: "6",
            label: "Location and Language",
            children: <LocationsAndLanguageTab />,
          },
          {
            key: "7",
            label: "Delete Account",
            children: <DeleteAccountTab />,
          },
        ]}
        activeKey={tabIndex}
        onTabClick={(clickedTab) =>
          setSearchParams({ tab: EnumTab[Number(clickedTab)] })
        }
      />
    </div>
  );
};

export default Setting;
