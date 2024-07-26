import {
  Avatar,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Switch,
  Typography,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CloseOutlined } from "@ant-design/icons";
import FileIcon from "../../assets/icons/FileIcon";
import { useState } from "react";
import useDisclosure from "../../hooks/useDisclosure";
import LinkSettingModal from "./LinkSettingModal";
const { Text } = Typography;

interface Inputs {
  email: string;
  view_status: number;
}

const ShareFileModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isShareable, setIsShareable] = useState(false);

  const linkSettingModal = useDisclosure();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().label("Required"),
        view_status: yup.number().label("Required"),
      })
    ),
  });
  const view_status = watch("view_status");
  view_status;

  const onSubmit = (data: Inputs) => {
    data;
    reset({ view_status: 1 });
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://cloudcandy.com/drive/wyHdMOsINsiq"
      );
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    } catch (error) {
      // Handle clipboard write error
    }
  };

  return (
    <Modal
      title={<div>Share “Fady’s Wedding.jpeg”</div>}
      open={open}
      onCancel={onClose}
      footer={null}
      confirmLoading={false}
      closeIcon={
        <div className="flex justify-center items-center h-[28px] w-[28px] bg-[#0154A01A] rounded-full">
          <CloseOutlined style={{ color: "#0154A0" }} />
        </div>
      }
    >
      <Divider></Divider>

      <Form
        layout="vertical"
        onFinish={() => {
          handleSubmit(onSubmit)();
        }}
      >
        {" "}
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Item
                className=" mb-0"
                style={{ color: "#222E57" }}
                label={<Text style={{ color: "#222E57" }}>Invite people</Text>}
                {...(errors.email && {
                  help: errors.email.message,
                  validateStatus: "error",
                })} // Conditional
              >
                <Flex gap={"0.5rem"} className="mb-1">
                  <Input
                    {...field}
                    placeholder="Enter email addresses"
                    className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3"
                  />

                  <Controller
                    name="view_status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={1}
                        className="flex-1 h-auto  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!bg-[#0154A01A] [&>.ant-select-selector]:!rounded-2xl  "
                        options={[
                          { value: 1, label: "Can View" },
                          { value: 2, label: "Can Edit" },
                        ]}
                      ></Select>
                    )}
                  />
                </Flex>
              </Form.Item>
            )}
          />
        </Flex>
        <Button hidden type="primary" htmlType="submit" />
      </Form>

      <Flex className="flex-col mt-4" gap={"0.75rem"}>
        <Text style={{ fontWeight: "500", color: "#222E57" }}>
          Who has access
        </Text>
        <Flex align="center" className="w-full justify-between">
          <Flex gap={"0.5rem"} align="center">
            <Avatar
              size={40}
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="flex  flex-col">
              <Text className="text-xs font-semibold text-[#0154A0]">
                Demo Admin
              </Text>
              <Text className="text-xs text-[#888888]">admin@demo064.com</Text>
            </div>
          </Flex>
          <Text className="text-xs text-[#888888]">Owner</Text>
        </Flex>
      </Flex>

      <Divider></Divider>
      <Flex className="flex-col mt-4" gap={"0.75rem"}>
        <Text style={{ fontWeight: "500", color: "#222E57" }}>Share link</Text>
        <Flex align="center" className="w-full justify-between">
          <Flex gap={"0.5rem"} align="center">
            <Switch
              defaultValue={isShareable}
              onChange={(e) => {
                setIsShareable(e);
              }}
            />
            <Text className="text-xs text-[#333333]">
              Shareable link is created
            </Text>
          </Flex>
          {isShareable && (
            <Text
              onClick={linkSettingModal.onOpen}
              className="text-xs text-[#0154A0] cursor-pointer"
            >
              Link settings
            </Text>
          )}
        </Flex>
        <Flex gap={"0.5rem"}>
          <Input
            readOnly
            defaultValue={"https://cloudcandy.com/drive/wyHdMOsINsiq"}
            className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3"
            disabled={!isShareable}
          />
          <Flex>
            {" "}
            <Button
              className="h-full flex items-center"
              type="primary"
              icon={<FileIcon />}
              iconPosition="end"
              onClick={handleCopyLink}
              disabled={!isShareable}
            >
              {isLinkCopied ? "Copied" : "Copy Link"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {open && (
        <LinkSettingModal
          open={linkSettingModal.open}
          onClose={linkSettingModal.onClose}
        ></LinkSettingModal>
      )}
    </Modal>
  );
};

export default ShareFileModal;
