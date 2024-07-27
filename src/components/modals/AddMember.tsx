import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Typography, Form, Input } from "antd";
import React, { useState } from "react";

const { Text } = Typography;

const AddMemberModal = ({
  open,
  onClose,
  handleOk,
  addIsLoading,
}: {
  open: boolean;
  onClose: () => void;
  handleOk: (values: { name: string; email: string }) => void;
  addIsLoading: boolean;
}) => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch {
      setIsFormValid(false);
    }
  };

  return (
    <Modal
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          <PlusCircleOutlined
            style={{ color: "#52c41a", fontSize: "1.25rem" }}
          />
          <Text
            style={{ fontSize: "1.25rem", color: "#52c41a", fontWeight: 500 }}
          >
            Add Member
          </Text>
        </div>
      }
      open={open}
      onOk={() => form.submit()}
      onCancel={onClose}
      confirmLoading={addIsLoading}
      okText="Add"
      closeIcon={null}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
        onFinish={handleOk}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;
