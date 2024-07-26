import { Divider, Flex, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const InputWrapper = ({
  title,
  titleDesc,
  desc,
  children,
  className,
}: {
  title: string;
  titleDesc?: string;
  desc?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Flex
        className={`md:items-center max-md:flex-col max-md:gap-4 ${className}`}
      >
        <Flex className="min-w-[300px] max-lg:min-w-[200px] max-md:w-full flex flex-col gap-2">
          <Text style={{ color: "#222E57", fontSize: "14px" }}> {title} </Text>
          {titleDesc && (
            <Text className="text-xs text-[#888888]">{titleDesc}</Text>
          )}
        </Flex>
        <div className="flex-1 max-w-[512px] max-md:w-full flex flex-col gap-2">
          <div className="h-full"> {children} </div>
          {desc && <Text className="text-xs text-[#888888]">{desc}</Text>}
        </div>
      </Flex>
      <Divider className="mt-5" />
    </>
  );
};

export default InputWrapper;
