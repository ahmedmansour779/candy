import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Switch,
  Typography,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { CloseOutlined } from "@ant-design/icons";
const { Text } = Typography;

interface Inputs {
  is_expiring: number;
  expire_date: string;
  is_password_protected: number;
  password: string;
  allow_download: number;
}

const LinkSettingModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { handleSubmit, control, watch } = useForm<Inputs>({
    resolver: yupResolver(yup.object({})),
  });
  const isExpiring = watch("is_expiring");
  const isPasswordProtected = watch("is_password_protected");

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <Modal
      title={<div>Shareable Link Settings</div>}
      open={open}
      onOk={onClose}
      onCancel={onClose}
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
            name="is_expiring"
            control={control}
            render={({ field }) => (
              <Flex className="flex-col mt-4" gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  Link expiration
                </Text>
                <Flex align="center" className="w-full justify-between">
                  <Flex gap={"0.5rem"} align="center">
                    <Switch
                      checked={field.value === 1}
                      onChange={(e) => field.onChange(e ? 1 : 0)}
                    />
                    <Text className="text-xs text-[#333333]">
                      Link is valid until
                    </Text>
                  </Flex>
                </Flex>
                {!!isExpiring && (
                  <Flex gap={"0.5rem"}>
                    <DatePicker className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3 w-full" />
                  </Flex>
                )}
              </Flex>
            )}
          />
        </Flex>
        <Flex style={{ flexDirection: "column" }}>
          <Divider className="my-4"></Divider>
          <Controller
            name="is_password_protected"
            control={control}
            render={({ field }) => (
              <Flex className="flex-col " gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  Password protect
                </Text>
                <Flex align="center" className="w-full justify-between">
                  <Flex gap={"0.5rem"} align="center">
                    <Switch
                      checked={field.value === 1}
                      onChange={(e) => field.onChange(e ? 1 : 0)}
                    />
                    <Text className="text-xs text-[#333333]">
                      Users will need to enter password in order to view this
                      link
                    </Text>
                  </Flex>
                </Flex>
                {!!isPasswordProtected && (
                  <Flex gap={"0.5rem"}>
                    <Input.Password className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3" />
                  </Flex>
                )}
              </Flex>
            )}
          />
        </Flex>
        <Flex style={{ flexDirection: "column" }}>
          <Divider className="my-4"></Divider>
          <Controller
            name="allow_download"
            control={control}
            render={({ field }) => (
              <Flex className="flex-col " gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  Allow download
                </Text>
                <Flex align="center" className="w-full justify-between">
                  <Flex gap={"0.5rem"} align="center">
                    <Switch
                      checked={field.value === 1}
                      onChange={(e) => field.onChange(e ? 1 : 0)}
                    />
                    <Text className="text-xs text-[#333333]">
                      Users with link can download this item
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          />
        </Flex>
        <Button hidden type="primary" htmlType="submit" />
      </Form>
    </Modal>
  );
};

export default LinkSettingModal;
