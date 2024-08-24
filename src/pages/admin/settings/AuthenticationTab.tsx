/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Input, Switch } from "antd";
import CheckBoxWrapper from "../../../components/UI/CheckBoxWrapper";
import InputWrapper from "../../../components/UI/InputWrapper";
import TextArea from "antd/es/input/TextArea";
import { fetchEditAdminSetting } from "../../../api/EditAdminSettings";

interface Inputs {
  "require_email_confirmation": boolean;
  "registration->disable": boolean;
  "single_device_login": boolean;
  "social->compact_buttons": boolean;
  google_login: boolean;
  google_id: string;
  google_secret: string;
  facebook_login: boolean;
  facebook_id: string;
  facebook_secret: string;
  twitter_login: boolean;
  twitter_id: string;
  twitter_secret: string;
  "auth->domain_blacklist": string;
}

const authenticationSchema = yup.object({
  "require_email_confirmation": yup.boolean().label("Require email confirmation"),
  "registration->disable": yup.boolean().label("Disable registration"),
  "single_device_login": yup.boolean().label("Single device login"),
  "social->compact_buttons": yup.boolean().label("Compact buttons"),
  google_login: yup.boolean().label("Google login"),
  google_id: yup.string().label("Google client ID"),
  google_secret: yup.string().label("Google client secret"),
  facebook_login: yup.boolean().label("Facebook login"),
  facebook_id: yup.string().label("Facebook app ID"),
  facebook_secret: yup.string().label("Facebook app secret"),
  twitter_login: yup.boolean().label("Twitter login"),
  twitter_id: yup.string().label("Twitter ID"),
  twitter_secret: yup.string().label("Twitter secret"),
  "auth->domain_blacklist": yup.string().label("Domain blacklist"),
});

const AuthenticationTab = ({data}:{data:any}) => {
  const {google , facebook, twitter} = data 
  const { handleSubmit, control, reset } = useForm<Inputs>({
    resolver: yupResolver(authenticationSchema),
    defaultValues: {
      ...data,
      google_id:google.google_id,
      google_secret:google.google_secret,
      facebook_id:facebook.facebook_id,
      facebook_secret:facebook.facebook_secret,
      twitter_id:twitter.twitter_id,
      twitter_secret:twitter.twitter_secret
    },
  });
  const onSubmit = (data: Inputs) => {
    console.log(data);
    const allData = {
      "auth->domain_blacklist":data["auth->domain_blacklist"],
      "registration->disable":data["registration->disable"],
      "require_email_confirmation":data["require_email_confirmation"],
      "single_device_login":data["single_device_login"],
      "social->compact_buttons":data["social->compact_buttons"],
      google:{
        google_id:data.google_id,
        google_secret:data.google_secret,
        google_login:data.google_login,
      },
      facebook:{
        facebook_id:data.facebook_id,
        facebook_secret:data.facebook_secret,
        facebook_login:data.facebook_login,
      },
      twitter:{
        twitter_id:data.twitter_id,
        twitter_secret:data.twitter_secret,
        twitter_login:data.twitter_login,
      }
    }
    console.log(allData)
    fetchEditAdminSetting(allData)
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
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="registration->disable"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Disable registration"}
                desc="All registration related functionality (including social login) will be disabled.                "
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
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
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="social->compact_buttons"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Compact buttons"}
                desc="Use compact design for social login buttons."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
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
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="google_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Google client ID"}>
                <Input
                  {...field}
                  placeholder="Enter Google client ID"
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"I9YcHbapz0hZmiR4bBSqHZZOYNYjK7"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="google_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Google client secret"}>
                <Input
                  {...field}
                  placeholder="Enter Google client secret"
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"H6VCef9bdbfVzKhCvY4fBvOKDp9RVS"}
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
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="facebook_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Facebook app ID"}>
                <Input
                  {...field}
                  placeholder="Enter Facebook app ID"
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"HTnVSjWjrhFa9pIYXmLlZpUk79Q60Y"}
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="facebook_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Facebook app secret"}>
                <Input
                  {...field}
                  placeholder="Enter Facebook app secret"
                  className="px-3 py-3 border-none rounded-2xl"
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
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
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
                  className="px-3 py-3 border-none rounded-2xl"
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
                  className="px-3 py-3 border-none rounded-2xl"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="auth->domain_blacklist"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Domain blacklist"}>
                <TextArea
                  rows={8}
                  {...field}
                  className="px-3 py-3 border-none rounded-2xl"
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
            className="px-4 py-2 max-md:w-full h-fit"
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
            className="px-4 py-2 max-md:w-full h-fit"
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
