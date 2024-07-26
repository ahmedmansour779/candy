import React, { useState } from "react";
import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Select,
  Spin,
  Upload,
  UploadProps,
  Image,
} from "antd";
import InputWrapper from "../../../components/UI/InputWrapper";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";

interface Inputs {
  username: string;
  email: string;
  preffered_language: number;
}
const ImageComponent: React.FC<{ file: UploadFile }> = ({ file }) => {
  if (!file) {
    return null; // Or return a placeholder element
  }

  if (file.status === "uploading") {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }
  const imageUrl =
    file?.originFileObj && URL.createObjectURL(file.originFileObj);
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={file.name}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

const AccountSettingTab = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const { handleSubmit, control, reset } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        username: yup.string().label("Required"),
        email: yup.string().email().label("Required"),
        preffered_language: yup.number().label("Required"),
      })
    ),
    defaultValues: {
      username: "olivia",
      email: "olivia@me.com",
      preffered_language: 1,
    },
  });

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className="">
      <SettingHeader title="Profile" />
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
            name="username"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Username"}>
                <Input
                  {...field}
                  placeholder="Enter username"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <InputWrapper
            title={"Your photo"}
            titleDesc="This will be displayed on your profile."
          >
            <div className="w-full ">
              <Flex gap={4} align="center">
                {fileList[0] ? (
                  <ImageComponent file={fileList[0]} />
                ) : (
                  <Avatar src="" size={64} icon={<UserOutlined />} />
                )}
                {fileList[0] && (
                  <Button
                    onClick={() => setFileList([])}
                    type="text"
                    className="ms-2"
                  >
                    Delete
                  </Button>
                )}
                <Upload maxCount={1} showUploadList={false} onChange={onChange}>
                  <Button
                    type="link"
                    className="ms-2 text-[#0154A0] font-semibold"
                  >
                    {fileList[0] ? "Update" : "Upload"}
                  </Button>
                </Upload>
              </Flex>
            </div>
          </InputWrapper>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Email Address"}>
                <Input
                  {...field}
                  placeholder="Enter email address"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="preffered_language"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Preferred language"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={[
                      { value: 1, label: "en" },
                      { value: 2, label: "fr" },
                    ]}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />

          <Flex
            gap={12}
            justify="end"
            className="w-full max-md:flex-col-reverse "
          >
            <Button
              className="max-md:w-full h-fit py-2 px-4"
              onClick={() => {
                reset();
              }}
            >
              {" "}
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className="max-md:w-full h-fit py-2 px-4"
            >
              {" "}
              Save
            </Button>
          </Flex>
        </Flex>
      </Form>
    </div>
  );
};

export default AccountSettingTab;
