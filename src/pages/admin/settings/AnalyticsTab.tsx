import React, { useState } from "react";
import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  Button,
  Flex,
  Form,
  Input,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import InputWrapper from "../../../components/UI/InputWrapper";
const { Text } = Typography;
interface Inputs {
  google_analytics_id: string;
  google_tag_manager_id: string;
  google_maps_key: string;
}
const AnalyticsTab = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().label("Required"),
        view_status: yup.number().label("Required"),
      })
    ),
  });

  const onSubmit = (data: Inputs) => {
    data;
  };
  return (
    <div className="">
      <SettingHeader
        title="Analytics"
        info="Configure google analytics integration and credentials."
      />
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
          <InputWrapper title={"Google analytics property ID"}>
            <div className="w-full rounded-2xl border-none py-3 px-3 bg-white">
              <Upload maxCount={1} showUploadList={false} onChange={onChange}>
                <Button type="primary">Choose File</Button>
                <Text className="ms-2">
                  {fileList[0] ? fileList[0].name : "No file chosen"}
                </Text>
              </Upload>
            </div>
          </InputWrapper>
          <Controller
            name="google_analytics_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Google analytics property ID"}>
                <Input
                  {...field}
                  placeholder="ُEnter google analytics property ID"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="google_tag_manager_id"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Google tag manager measurement ID"}
                desc="Google analytics measurement ID only, not the whole javascript snippet."
              >
                <Input
                  {...field}
                  placeholder="Enter google tag manager ID"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="google_maps_key"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Google maps javascript API key"}
                desc="Only required in order to show world geochart on integrated analytics pages."
              >
                <Input
                  {...field}
                  placeholder="Enter google maps javascript API key"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
        </Flex>
        <Flex gap={12} justify="end" className="w-full  ">
          <Button
            htmlType="submit"
            type="primary"
            className="max-md:w-full h-fit py-2 px-4"
          >
            {" "}
            Update
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default AnalyticsTab;
