import React from "react";
import { Typography } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
const { Text } = Typography;

interface Props {
  children?: React.ReactNode;
  text: string;
  icon: string | JSX.Element;
  dataSize: string | number;
}
export default function CardUpload({ text, icon, dataSize }: Props) {
  return (
    <div className="px-6 py-4 flex items-center justify-between card">
      <div className="flex-center gap-4 h-fit">
        <img src={icon as string} alt={text} />
        <div className="flex flex-col items-start gap-1">
          <Text className="capitalize text-primary-500 font-medium">
            {text}
          </Text>
          <Text className="text-gray-500 text-xs">{dataSize} MB</Text>
        </div>
      </div>
      <CheckCircleFilled className="text-xl text-[#27C72B]" />
    </div>
  );
}
