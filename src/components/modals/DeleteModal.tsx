import { InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Modal, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const DeleteModal = ({
  title,
  description,
  open,
  onClose,
  handleOk,
  deleteIsLoading,
}: {
  title: string;
  description: string;
  open: boolean;
  onClose: () => void;
  handleOk: () => void;
  deleteIsLoading: boolean;
}) => {
  return (
    <Modal
      title={
        <Flex className="mb-3" align="center" gap={6}>
          <InfoCircleOutlined
            style={{ color: "#ff4d4f", fontSize: "1.25rem" }}
          />
          <Text className="text-lg text-[#ff4d4f] font-medium">{title}</Text>
        </Flex>
      }
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={deleteIsLoading}
      okText="Delete"
      closeIcon={null}
      okButtonProps={{ danger: true }}
    >
      <Text>{description}</Text>
    </Modal>
  );
};

export default DeleteModal;
