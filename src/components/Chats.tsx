import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Typography } from "antd";
import { truncate } from "lodash";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Text } = Typography;

const Chats = () => {
  return (
    <Flex
      vertical
      gap={24}
      className="p-4 rounded-2xl bg-white h-full  max-w-[36px] min-w-[336px] max-lg:max-w-[280px] max-lg:min-w-[280px] max-sm:max-w-full max-sm:min-w-0 w-auto max-sm:w-full "
    >
      <Flex  justify="space-between" align="center">
        <Text className="text-lg font-medium text-[#222E57]">Inbox</Text>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          iconPosition="start"
          className="h-full py-[10px] px-4"
        >
          Add Chat
        </Button>
      </Flex>
      <Flex vertical flex={1} gap={16} className="overflow-y-auto">
        {new Array(30).fill(0).map((_, index) => (
          <ChatCard key={index + 1} chatId={index + 1} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Chats;

const ChatCard = ({ chatId }: { chatId: number }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isChatSelected = id === `${chatId}`;

  return (
    <Flex
      className={`p-4 min-h-[95px] cursor-pointer rounded-2xl  hover:bg-[#0154A01A] duration-100 ${
        isChatSelected && "bg-[#0154A01A] !cursor-default"
      } `}
      gap={8}
      onClick={() => navigate(`/drive/chat/${chatId}`)}
    >
      <div className="relative  w-10 h-10">
        <Image
          preview={false}
          src="https://avatars.githubusercontent.com/u/121273938?v=4"
          alt=""
          className="rounded-full"
        />
        <div className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full bg-white flex justify-center items-center">
          <div
            className={`h-[10px] w-[10px] rounded-full bg-[#0154A0] duration-100 ${
              isChatSelected && "!h-[15px] !w-[15px]"
            }`}
          ></div>
        </div>
      </div>
      <Flex vertical gap={6} flex={1}>
        <Flex justify="space-between" align="center">
          <Text className="text-sm font-medium text-[#0154A0]">
            Hamdy Mohamed
          </Text>
          <Text
            className={`text-[#888888] text-xs ${
              isChatSelected && "!text-[#0154A0]"
            } `}
          >
            {generateRandomTime()}
          </Text>
        </Flex>
        <Text
          className={`text-[#888888] text-sm ${
            isChatSelected && "!text-[#0154A0]"
          } `}
        >
          {truncate(
            "Hello world",
            { length: 60 }
          )}{" "}
        </Text>
      </Flex>
    </Flex>
  );
};

const generateRandomTime = () => {
  const hour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
  const minute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
  const indicator = Math.random() < 0.5 ? "AM" : "PM"; // Randomly choose AM or PM

  // Format the hour and minute to always have two digits
  const formattedHour = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  // Concatenate hour, minute, and AM/PM indicator
  return `${formattedHour}:${formattedMinute} ${indicator}`;
};
