import React from "react";
import SettingHeader from "../../../components/SettingHeader";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import FacebookIcon from "../../../assets/icons/FacebookIcon";
import XIcon from "../../../assets/icons/XIcon";
import { Button, Divider, Flex, Typography } from "antd";
const { Text } = Typography;

interface Item {
  icon: JSX.Element;
  title: string;
  enabled: boolean;
}

const items: Item[] = [
  { icon: <GoogleIcon />, title: "Google", enabled: false },
  { icon: <FacebookIcon />, title: "Facebook", enabled: false },
  { icon: <XIcon />, title: "X", enabled: true },
];

const SocialLoginTab = () => {
  return (
    <>
      <SettingHeader title="Manage social login" />
      {items.map((item) => {
        return (
          <>
            <Flex className=" flex justify-between items-center   ">
              <Flex className="flex gap-2 items-center">
                <div className="w-14 h-14 bg-[#EAEBF0] flex justify-center items-center rounded-lg">
                  {item.icon}
                </div>
                <Flex className="flex flex-col gap-1">
                  {" "}
                  <Text className="text-base font-medium">{item.title}</Text>
                  <Text className="text-[#888888]">
                    {item.enabled ? "Enabled" : "Disabled"}
                  </Text>
                </Flex>
              </Flex>
              <Button
                danger={item.enabled}
                className="border-[#0154A0] text-[#0154A0] !h-full w-20 py-3"
              >
                {item.enabled ? "Disable" : "Enable"}
              </Button>
            </Flex>
            <Divider className="mt-5" />
          </>
        );
      })}
      <Text className="text-[#888888]">
        If you disable social logins, you'll still be able to log in using your
        email and password.
      </Text>
    </>
  );
};

export default SocialLoginTab;
