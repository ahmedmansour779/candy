import React from "react";
import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Flex, Form, Input, Select } from "antd";
import InputWrapper from "../../../components/UI/InputWrapper";

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

const outgoingEmailSchema = yup.object({
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

const OutgoingEmailTab = () => {
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(outgoingEmailSchema),
    defaultValues: {},
  });
  const onSubmit = (data: Inputs) => {
    data;
  };
  return (
    <div>
      <SettingHeader
        title="Outgoing email settings"
        info="Change outgoing email handlers, email credentials and other related settings."
      />
      <Form
        layout="vertical"
        onFinish={() => {
          handleSubmit(onSubmit)();
        }}
      >
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="google_client_id"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"From address"}
                desc="All outgoing application emails will be sent from this email address.
              "
              >
                <Input
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"contact@candycloudy.com"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="google_client_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Contact page address"}
                desc="Where emails from https://candycloudy.com/contact page should be sent to.
              "
              >
                <Input
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"contact@candycloudy.com"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="facebook_app_id"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"From name"}
                desc="All outgoing application emails will be sent using this name."
              >
                <Input
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"candycloudy"}
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="disable_registration"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Outgoing mail method"}>
                <Select
                  {...field}
                  defaultValue={1}
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                  options={[
                    { value: 1, label: "Maligun" },
                    { value: 2, label: "Gmail Api" },
                    { value: 3, label: "SMTP" },
                    { value: 4, label: "Postmark" },
                    { value: 5, label: "Ses" },
                  ]}
                ></Select>
              </InputWrapper>
            )}
          />
          <Controller
            name="facebook_app_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Mailgun domain"}
                desc="Usually the domain of your site (site.com)"
              >
                <Input
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"candycloudy.com"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="twitter_id"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Mailgun API key"}
                desc="Should start with `key-`"
              >
                <Input
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                  defaultValue={"KwvMVMZTT0FvuglJENsb7MY3w1f6fq"}
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="twitter_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Mailgun endpoint"}
                desc="Can be left empty, if your mailgun account is in the US region."
              >
                <Input
                  {...field}
                  placeholder="api.eu.mailgun.net"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
        </Flex>
      </Form>
    </div>
  );
};

export default OutgoingEmailTab;
