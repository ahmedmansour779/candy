import { Typography } from "antd";
import React from "react";

const { Text } = Typography;
const PageHeading = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between items-center mb-4  max-md:flex-col max-md:items-start gap-4 ">
      <Text className="text-3xl text-[#0154A0] font-medium">{title}</Text>
      <div className="h-[45px]"> {children}</div>
    </div>
  );
};

export default PageHeading;
