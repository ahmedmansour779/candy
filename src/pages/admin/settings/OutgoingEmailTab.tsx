/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Input, Select } from "antd";
import InputWrapper from "../../../components/UI/InputWrapper";
import { fetchEditAdminSetting } from "../../../api/EditAdminSettings";

interface Inputs {
  "mail_from_address": string;
  "mail->contact_page_address": string;
  "mail_from_name": string;
  mail_driver: string;
  mailgun_domain: string;
  mailgun_api: string;
  mailgun_endpoint: string;
}

const outgoingEmailSchema = yup.object({
  "mail_from_address": yup.string().label("From address"),
  "mail->contact_page_address": yup.string().label("Contact page address"),
  "mail_from_name": yup.string().label("From name"),
  mail_driver: yup.string().label("Outgoing mail method"),
  mailgun_domain: yup.string().label("Mailgun domain"),
  mailgun_api: yup.string().label("Mailgun API key"),
  mailgun_endpoint: yup.string().label("Mailgun endpoint"),
});

const OutgoingEmailTab = ({data}:{data:any}) => {
  const { handleSubmit, control, reset } = useForm<Inputs>({
    resolver: yupResolver(outgoingEmailSchema),
    defaultValues: {...data},
  });
  const onSubmit = (data: Inputs) => {
    console.log(data);
    fetchEditAdminSetting(data)
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
            name="mail_from_address"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"From address"}
                desc="All outgoing application emails will be sent from this email address.
              "
              >
                <Input
                  {...field}
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"contact@candycloudy.com"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="mail->contact_page_address"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Contact page address"}
                desc="Where emails from https://candycloudy.com/contact page should be sent to.
              "
              >
                <Input
                  {...field}
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"contact@candycloudy.com"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="mail_from_name"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"From name"}
                desc="All outgoing application emails will be sent using this name."
              >
                <Input
                  {...field}
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"candycloudy"}
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="mail_driver"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Outgoing mail method"}>
                <Select
                  {...field}
                  // defaultValue={1}
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                  options={[
                    { value: "maligun", label: "Maligun" },
                    { value: "gmail api", label: "Gmail Api" },
                    { value: "smtp", label: "SMTP" },
                    { value: "postmark", label: "Postmark" },
                    { value: "ses", label: "Ses" },
                  ]}
                ></Select>
              </InputWrapper>
            )}
          />
          <Controller
            name="mailgun_domain"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Mailgun domain"}
                desc="Usually the domain of your site (site.com)"
              >
                <Input
                  {...field}
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"candycloudy.com"}
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="mailgun_api"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Mailgun API key"}
                desc="Should start with `key-`"
              >
                <Input
                  {...field}
                  className="px-3 py-3 border-none rounded-2xl"
                  // defaultValue={"KwvMVMZTT0FvuglJENsb7MY3w1f6fq"}
                />
              </InputWrapper>
            )}
          />{" "}
          <Controller
            name="mailgun_endpoint"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Mailgun endpoint"}
                desc="Can be left empty, if your mailgun account is in the US region."
              >
                <Input
                  {...field}
                  placeholder="api.eu.mailgun.net"
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

export default OutgoingEmailTab;
