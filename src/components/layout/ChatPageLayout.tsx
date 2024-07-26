import { Flex, Grid, Layout, Typography } from "antd";
import React from "react";
import Chats from "../Chats";
import { Outlet, useParams } from "react-router-dom";
const { useBreakpoint } = Grid;

const { Text } = Typography;
const mobileStyles = "fixed bottom-0 left-0 right-0 w-full h-full";

const ChatPageLayout = () => {
  const { id } = useParams();
  const screen = useBreakpoint();

  return (
    <Layout className="p-8 max-md:p-4 h-screen">
      <Flex gap={24} className="h-full">
        <Chats></Chats>
        <main
          className={`flex-1 ${screen.xs && mobileStyles} ${
            !id && screen.xs && "hidden"
          }`}
        >
          {!id && (
            <Flex
              justify="center"
              align="center"
              className="h-full max-md:hidden"
            >
              <Flex vertical gap={16} align="center">
                <Text className="text-lg font-semibold text-[#222E57]">
                  Welcome
                </Text>
                <Text className="text-sm font-medium text-[#888888]">
                  Select a chat to start messaging
                </Text>
              </Flex>
            </Flex>
          )}
          <Outlet></Outlet>
        </main>
      </Flex>
    </Layout>
  );
};

export default ChatPageLayout;