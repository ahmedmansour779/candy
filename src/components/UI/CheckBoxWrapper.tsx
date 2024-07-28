import { Divider, Flex, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const CheckBoxWrapper = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Flex gap={16} className=" flex-col">
        <Flex gap={"0.5rem"} align="center">
          {children}
          <Text className="text-xs text-[#333333] font-medium">{title}</Text>
        </Flex>
        <Text className="text-xs text-[#888888]">{desc}</Text>
      </Flex>
      <Divider className="mt-5" />
    </>
  );
};

export default CheckBoxWrapper;
