import React from "react";
import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Input, Switch } from "antd";
import CheckBoxWrapper from "../../../components/UI/CheckBoxWrapper";
import InputWrapper from "../../../components/UI/InputWrapper";
import TextArea from "antd/es/input/TextArea";

interface Inputs {
  require_email_confirmation: number;
  disable_registration: number;
  single_device_login: number;
  compact_buttons: number;
  google_login: number;
  google_client_id: string;
  google_client_secret: string;
  facebook_login: number;
  facebook_app_id: string;
  facebook_app_secret: string;
  twitter_login: number;
  twitter_id: string;
  twitter_secret: string;
  domain_blacklist: string;
}

const authenticationSchema = yup.object({
  require_email_confirmation: yup.number().label("Require email confirmation"),
  disable_registration: yup.number().label("Disable registration"),
  single_device_login: yup.number().label("Single device login"),
  compact_buttons: yup.number().label("Compact buttons"),
  google_login: yup.number().label("Google login"),
  google_client_id: yup.string().label("Google client ID"),
  google_client_secret: yup.string().label("Google client secret"),
  facebook_login: yup.number().label("Facebook login"),
  facebook_app_id: yup.string().label("Facebook app ID"),
  facebook_app_secret: yup.string().label("Facebook app secret"),
  twitter_login: yup.number().label("Twitter login"),
  twitter_id: yup.string().label("Twitter ID"),
  twitter_secret: yup.string().label("Twitter secret"),
  domain_blacklist: yup.string().label("Domain blacklist"),
});

const AuthenticationTab = () => {
  const { handleSubmit, control, reset } = useForm<Inputs>({
    resolver: yupResolver(authenticationSchema),
    defaultValues: {},
  });
  const onSubmit = (data: Inputs) => {
    data;
  };
  return (
    <div className="">
      <SettingHeader
        title="Authentication"
        info="Configure registration, social login and related 3rd party integrations."
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
            name="require_email_confirmation"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Require email confirmation"}
                desc="Require newly registered users to validate their email address before being able to login.                "
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="disable_registration"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Disable registration"}
                desc="All registration related functionality (including social login) will be disabled.                "
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="single_device_login"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Single device login"}
                desc="Only allow one device to be logged into user account at the same time."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="compact_buttons"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Compact buttons"}
                desc="Use compact design for social login buttons."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="google_login"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Google login"}
                desc="Enable logging into the site via google."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="google_client_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Google client ID"}>
                <Input
                  {...field}
                  placeholder="Enter Google client ID"
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"I9YcHbapz0hZmiR4bBSqHZZOYNYjK7"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="google_client_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Google client secret"}>
                <Input
                  {...field}
                  placeholder="Enter Google client secret"
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"H6VCef9bdbfVzKhCvY4fBvOKDp9RVS"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="facebook_login"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Facebook login"}
                desc="Enable logging into the site via facebook."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="facebook_app_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Facebook app ID"}>
                <Input
                  {...field}
                  placeholder="Enter Facebook app ID"
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"HTnVSjWjrhFa9pIYXmLlZpUk79Q60Y"}
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="facebook_app_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Facebook app secret"}>
                <Input
                  {...field}
                  placeholder="Enter Facebook app secret"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="twitter_login"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Twitter login"}
                desc="Enable logging into the site via twitter."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="twitter_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Twitter ID"}>
                <Input
                  {...field}
                  placeholder="Enter Twitter ID"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="twitter_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Twitter secret"}>
                <Input
                  {...field}
                  placeholder="Enter Twitter secret"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="domain_blacklist"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Domain blacklist"}>
                <TextArea
                  rows={8}
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
        </Flex>
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
      </Form>
    </div>
  );
};

export default AuthenticationTab;
