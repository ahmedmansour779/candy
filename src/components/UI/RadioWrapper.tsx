import { Divider, Flex, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const RadioWrapper = ({
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
        <Text style={{ color: "#222E57", fontSize: "14px", fontWeight: 500 }}>
          {" "}
          {title}{" "}
        </Text>
        <div className="">{children}</div>
        {desc && <Text className="text-xs text-[#888888]">{desc}</Text>}
      </Flex>
      <Divider className="mt-5" />
    </>
  );
};

export default RadioWrapper;
