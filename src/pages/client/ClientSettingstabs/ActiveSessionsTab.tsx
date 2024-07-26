import SettingHeader from "../../../components/SettingHeader";

import { Button, Divider, Flex, Typography } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
const { Text } = Typography;

interface Item {
  device: string;
  location: string;
}

const items: Item[] = [
  { device: "OS X - Chrome", location: "Toronto, Canada" },
  { device: "Windows - Chrome", location: "New Jersey, United States" },
  { device: "Linux - Chrome", location: "London, United Kingdom" },
  { device: "Mac - Safari", location: "California, United States" },
];

const ActiveSessionsTab = () => {
  return (
    <>
      <SettingHeader
        title="Active Sessions"
        info="If necessary, you may log out of all of your other browser sessions across all of your devices. Your recent sessions are listed below. If you feel your account has been compromised, you should also update your password."
      />
      {items.map((item) => {
        return (
          <>
            <Flex className="flex gap-2 ">
              <DesktopOutlined
                style={{ width: "24px", height: "24px" }}
                className="[&>svg]:!w-full [&>svg]:!h-full "
              />
              <Flex className="flex flex-col gap-1">
                {" "}
                <Text className="text-base font-medium">{item.device}</Text>
                <Text className="text-[#888888]">{item.location}</Text>
              </Flex>
            </Flex>
            <Divider className="mt-5" />
          </>
        );
      })}
      <Flex gap={12} justify="end" className="w-full max-md:flex-col-reverse ">
        <Button
          // onClick={onSubmit}
          type="primary"
          className="max-md:w-full h-fit py-2 px-4"
        >
          Logout Other Devices
        </Button>
      </Flex>
    </>
  );
};

export default ActiveSessionsTab;
