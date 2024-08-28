/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
// import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Image,
  Input,
  Select,
  Spin,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
import usersApi from "../../api/admin/usersApi";
// import { User } from "../../types/backend";
import PageHeading from "../PageHeading";
import CheckBoxWrapper from "../UI/CheckBoxWrapper";
import InputWrapper from "../UI/InputWrapper";

const { Option } = Select;

interface Inputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  emailConfirmed: boolean;
  roles: number[];
  allowedStorageSpace: number;
  avatar: UploadFile | null;
  allowedStorageType: string;
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
    <div className="w-16 h-16 overflow-hidden rounded-full">
      <Image
        src={imageUrl}
        alt={file.name}
        className="object-cover object-center w-full h-full"
      />
    </div>
  );
};

const AdminUsersForm = ({ target }: { target?: any }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const navigate = useNavigate();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const { handleSubmit, control } = useForm<Inputs>({
    // resolver: yupResolver(
    //   yup.object({
    //     username: yup.string().label("Required"),
    //     email: yup.string().email().label("Required"),
    //     preffered_language: yup.number().label("Required"),
    //   })
    // ),

    defaultValues: target ? { ...target} : {},
  });

  const addMutation = useMutation({
    mutationFn: (data: Inputs) => {
      //@ts-expect-error: IJob error
      return usersApi.addUser(data as AddUser);
    },
    onSuccess: () => {
      navigate("/admin/users");
    },
  });
  const editMutation = useMutation({
    mutationFn: (data: Inputs) => {
      //@ts-expect-error: IJob error
      return usersApi.updateUser(target?.id as number, data as AddUser);
    },
    onSuccess: () => {
      navigate("/admin/users");
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if (target) {
      console.log({...data,username:`${data.first_name} ${data.last_name}`,roles:[...target.roles]});
      const dataReq = {...data,username:`${data.first_name} ${data.last_name}`,roles:[...target.roles]};
      editMutation.mutate(dataReq);
      return;
    }
    addMutation.mutate({...data,username:`${data.first_name} ${data.last_name}`});
  };

  return (
    <div className="p-8">
      {" "}
      <PageHeading
        title={target ? `Edit "${target.first_name || target.username} ${target.last_name || ""}"` : "Add new user"}
      >
        <div className="flex h-full">
          {" "}
          <Button
            onClick={handleSubmit(onSubmit)}
            type="primary"
            className="h-full"
            loading={addMutation.isLoading || editMutation.isLoading}
          >
            Save
          </Button>
        </div>
      </PageHeading>
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
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Password"}>
                <Input.Password
                  {...field}
                  placeholder="Enter new password"
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Confirm Password"}>
                <Input.Password
                  {...field}
                  placeholder="Enter password again"
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"First Name"}>
                <Input
                  {...field}
                  placeholder="Enter first name"
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Last Name"}>
                <Input
                  {...field}
                  placeholder="Enter last name"
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="emailConfirmed"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Email Confirmed"}
                desc="Whether email address has been confirmed. User will not be able to login until address is confirmed, unless confirmation is disabled from settings page."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="allowedStorageSpace"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Allowed storage space"}>
                <Input
                  {...field}
                  addonAfter={
                    <Controller
                      name="allowedStorageType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          style={{ width: "fit-content" }}
                        >
                          <Option value="bytes">Bytes</Option>
                          <Option value="kb">KB</Option>
                          <Option value="mb">MB</Option>
                          <Option value="gb">GB</Option>
                          <Option value="tb">TB</Option>
                        </Select>
                      )}
                    />
                  }
                  placeholder="Enter allowed storage space"
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Roles"}>
                <Select
                  {...field}
                  mode="tags"
                  size="middle"
                  placeholder="Choose role..."
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-4 [&>.ant-select-selector]:!py-2 [&>.ant-select-selector]:!min-h-14      "
                  options={[
                    { value: "user", label: "User" },
                    { value: "guest", label: "Guest" },
                  ]}
                ></Select>
              </InputWrapper>
            )}
          />
        </Flex>
      </Form>
    </div>
  );
};

export default AdminUsersForm;
