import {
  EllipsisOutlined,
  LeftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Flex, Grid, Image, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import AttachIcon from "../../assets/icons/AttachIcon";
import SmileFace from "../../assets/icons/SmileFace";
import { useEffect, useState } from "react";
const { Text } = Typography;
const { useBreakpoint } = Grid;

const Chat = () => {
  return (
    <div className="chat-container">
      <Flex vertical className={`h-full border rounded-lg shadow-lg bg-white`}>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </Flex>
    </div>
  );
};

export default Chat;

const ChatHeader = () => {
  const navigate = useNavigate();
  const { xs } = useBreakpoint();
  return (
    <Flex
      justify="space-between"
      align="center"
      className="h-[72px] p-4 bg-white border-b shadow-md"
    >
      <Flex align="center" gap={8}>
        {xs && <LeftOutlined onClick={() => navigate("/chat")} />}
        <div className="relative w-10 h-10">
          <Image
            preview={false}
            src={`https://i.pravatar.cc/200/?img=11`}
            alt=""
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full bg-white flex justify-center items-center">
            <div
              className={`h-[10px] w-[10px] rounded-full bg-[#0154A0] duration-100 `}
            ></div>
          </div>
        </div>
        <Text className="text-lg font-medium text-[#222E57]">
          Hamdy Mohamed
        </Text>
      </Flex>
      <Flex gap={8}>
        <Button type="primary" icon={<StarOutlined />} />
        <Button type="default" icon={<EllipsisOutlined />} />
      </Flex>
    </Flex>
  );
};

interface messageProps {
  content: string;
  time: string;
  sender_Type: number;
}
const messages: messageProps[] = [
  {
    content:
      "Amet, laoreet posuere sit in. Cursus nec egestas interdum dui pelle ntesque egestas feugiat dui. Sed pulvinar sit laoreet.",
    time: "10:00 AM",
    sender_Type: 1,
  },
  {
    content:
      "Id ultricies quis ipsum eu nibh ullamcorper pharetra velit orci. Nulla nunc augue in sit. Nulla ultrices adipiscing turpis placerat in tempor sagittis tortor.",
    time: "10:15 AM",
    sender_Type: 2,
  },

  {
    content:
      "Risus nec mi, pellentesque pulvinar volutpat pretium orci. Elit, congue aliquam laoreet ullamcorper nunc sit placerat. Varius vitae magna non sit ipsum varius donec bibendum dolor. Et urna blandit posuere ut massa, dictumst in et.",
    time: "10:20 AM",
    sender_Type: 1,
  },
  {
    content:
      "Amet, laoreet posuere sit in. Cursus nec egestas interdum dui pelle ntesque egestas feugiat dui. Sed pulvinar sit laoreet.",
    time: "10:20 AM",
    sender_Type: 1,
  },
];

const ChatMessages = () => {
  const [maxHeight, setMaxHeight] = useState("77vh");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 325 && window.innerWidth <= 700) {
        setMaxHeight("100vh");
      } else {
        setMaxHeight("77vh");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set the initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Flex
      vertical
      flex={1}
      gap={20}
      style={{
        maxHeight: maxHeight,
        overflowY: "scroll",
        padding: '0 16px',
      }}
      className="bg-[#f5f5f5] rounded-b-lg"
      ref={(el) => el && el.scrollTo(0, el.scrollHeight)}
    >
      {messages.map((message, index) => (
        <ChatMessageCard key={index} message={message} />
      ))}
    </Flex>
  );
};

const ChatMessageCard = ({ message }: { message: messageProps }) => {
  return (
    <Flex
      className={` ${
        message.sender_Type === 1
          ? "ml-auto text-right flex-row-reverse"
          : "mr-auto flex-row"
      }
      `}
      gap={8}
    >
      <Flex>
        <div className="relative w-10 h-10">
          <Image
            preview={false}
            src={`https://i.pravatar.cc/200/?img=${
              message.sender_Type !== 1 ? 11 : 12
            }`}
            alt=""
            className="rounded-full"
          />
          <div className="absolute bottom-0 right-0 h-[14px] w-[14px] rounded-full bg-white flex justify-center items-center">
            <div
              className={`h-[10px] w-[10px] rounded-full bg-[#0154A0] duration-100 `}
            ></div>
          </div>
        </div>
      </Flex>
      <div
        className={`py-3 px-4 rounded-2xl max-w-[436px] ${
          message.sender_Type === 1 ? "bg-[#0154A0] " : "bg-white "
        } shadow-md`}
      >
        <Text
          className={` font-light ${
            message.sender_Type === 1 ? " text-white" : "text-[#222E57]"
          } `}
        >
          {message.content}
        </Text>
      </div>
    </Flex>
  );
};

// Send Bar
const ChatInput = () => {
  return (
    <Flex gap={16} className="h-20 max-md:px-4 py-4  bg-[#f5f5f5] border-t shadow-md">
      <div className="relative h-full " style={{ aspectRatio: "1/1" }}>
        <Image
          preview={false}
          src={`https://i.pravatar.cc/300/?img=12`}
          alt=""
          className="rounded-full "
        />
      </div>
      <div className="relative flex-1 h-full">
        <Input
          placeholder="Write your message here..."
          className="rounded-2xl h-full"
        ></Input>
        <Flex
          gap={20}
          align="center"
          className="absolute top-0 right-0 h-full pe-4"
        >
          <SmileFace />
          <AttachIcon />
        </Flex>
      </div>
    </Flex>
  );
};
