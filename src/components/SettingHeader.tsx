import { Divider, Typography } from "antd";
import React from "react";

const { Text } = Typography;
const SettingHeader = ({ title, info }: { title: string; info?: string }) => {
  return (
    <div className="flex flex-col  mt-6 ">
      <Text className="text-lg text-[#101828] font-medium">{title}</Text>
      {info && (
        <Text className="text-sm text-[#888888] font-medium mt-1">{info}</Text>
      )}
      <Divider />
    </div>
  );
};

export default SettingHeader;
