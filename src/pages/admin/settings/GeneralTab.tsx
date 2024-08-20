/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SettingHeader from "../../../components/SettingHeader";
import InputWrapper from "../../../components/UI/InputWrapper";
import { fetchAdminSetting } from "../../../api/getAdminSetting";
import { useEffect, useState } from "react";
import { fetchEditAdminSetting } from "../../../api/EditAdminSettings";

interface Inputs {
  app_url: string;
  "homepage->type": string;
  "themes->default_id": number;
  "themes->user_change"?: boolean;
}

const GeneralTab = ({
  data,
}: {
  data:any
}) => {
  
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        app_url: yup.string().label("Required"),
        "homepage->type": yup.string().label("Required"),
        "themes->default_id": yup.number().label("Required"),
      })
    ),
    defaultValues: {...data},
  });

  const onSubmit = (data: Inputs) => {
    // console.log(data);
    fetchEditAdminSetting(data)
    // const str = JSON.stringify(data);
    // const str2 = str.replaceAll("{","").replaceAll("}","").replaceAll(":","=").replaceAll(",","&").replaceAll('"',"").replaceAll('=//',"://")
    // console.log(str2);
  };

  return (
    <div className="">
      <SettingHeader
        title="General"
        info="Configure site url, homepage, theme and other general settings."
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
          <Controller
            name="app_url"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Primary Site URL"}>
                <Input
                  {...field}
                  placeholder="Enter site url"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="homepage->type"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Site Homepage "}>
                <Select
                  {...field}
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                  options={[
                    { value: "loginPage", label: "Login Page" },
                    { value: "registerPage", label: "Registration page" },
                    { value: "landingPage", label: "Landing page" },
                    { value: "customPage", label: "Custom Page" },
                  ]}
                ></Select>
              </InputWrapper>
            )}
          />
          <Controller
            name="themes->default_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Default Site Theme"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={[
                      { value: 0, label: "Default System" },
                      { value: 1, label: "Dark" },
                      { value: 2, label: "Light" },
                    ]}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />
          <InputWrapper title={"Generate Sitemap"}>
            <Flex className="w-full">
              <Button className="w-full h-auto py-3" type="primary">
                Generate
              </Button>
            </Flex>
          </InputWrapper>
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

export default GeneralTab;
