import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tag, Tooltip, Typography } from "antd";
import React, { ChangeEvent, useState } from "react";

const { Text } = Typography;

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  handleOk: (values: { emails: string[] }) => void;
  addIsLoading: boolean;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  open,
  onClose,
  handleOk,
  addIsLoading,
}) => {
  const [form] = Form.useForm();
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // add any thing to access posh
  const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleInputConfirm = () => {
    if (inputValue && validateEmail(inputValue)) {
      if (!emails.includes(inputValue)) {
        setEmails([...emails, inputValue]);
        setInputValue("");
        setInputError("");
      } else {
        setInputError("This email address has already been added.");
      }
    } else {
      setInputError("Please enter a valid email address.");
    }
  };

  const handleClose = (removedEmail: string) => {
    setEmails(emails.filter((email) => email !== removedEmail));
  };

  const handleFormSubmit = () => {
    form.validateFields().then(() => {
      handleOk({ emails });
      form.resetFields();
      setEmails([]);
    });
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
      onCancel={onClose}
      confirmLoading={addIsLoading}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add-email" type="primary" onClick={handleInputConfirm}>
          Add Email
        </Button>,

        <Button
          key="invite"
          type="primary"
          loading={addIsLoading}
          onClick={handleFormSubmit}
        >
          Invite
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Invite"
          validateStatus={inputError ? "error" : ""}
          help={inputError}
        >
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onPressEnter={handleInputConfirm}
            placeholder="Enter email addresses"
            suffix={
              inputError && (
                <Tooltip title={inputError} color="red">
                  <CloseCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              )
            }
          />
        </Form.Item>
        <Form.Item>
          <div>
            {emails.map((email) => (
              <Tag
                key={email}
                closable
                onClose={() => handleClose(email)}
                style={{
                  marginBottom: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {email}
              </Tag>
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;
