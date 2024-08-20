/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Radio, Select, Space, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SettingHeader from "../../../components/SettingHeader";
import CheckBoxWrapper from "../../../components/UI/CheckBoxWrapper";
import InputWrapper from "../../../components/UI/InputWrapper";
import RadioWrapper from "../../../components/UI/RadioWrapper";
import { fetchEditAdminSetting } from "../../../api/EditAdminSettings";
interface Inputs {
  "dates->default_timezone": string;
  "locale->default": string;
  "dates->format": string;
  "i18n->enable": boolean;
}
const LocalizationTab = ({data}:{data:any}) => {
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        default_timezone: yup.string().label("Required"),
        default_language: yup.string().label("Required"),
        default_list_view: yup.string().label("Required"),
        share_notifications: yup.boolean().label("Required"),
      })
    ),
    defaultValues: { ...data },
  });

  const onSubmit = (data: Inputs) => {
    // console.log(data);
    fetchEditAdminSetting(data)
  };
  return (
    <div className="">
      <SettingHeader
        title="Localization"
        info="Configure global date, time and language settings."
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
            name="dates->default_timezone"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Default Time Zone"}>
                <Select
                  {...field}
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                  options={[
                    { value: "auto", label: "Auto" },
                    { value: "option", label: "option" },
                  ]}
                ></Select>
              </InputWrapper>
            )}
          />
          <Controller
            name="locale->default"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Default Language"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={[
                      { value: "auto", label: "Auto" },
                      { value: "option", label: "option" },
                    ]}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />
          <Controller
            name="dates->format"
            control={control}
            render={({ field }) => (
              <RadioWrapper
                title={"Default List View"}
                desc="Default verbosity for all dates displayed across the site. Month/day order and separators will be adjusted automatically, based on user's locale."
              >
                <Radio.Group defaultValue={1} {...field}>
                  <Space className="" direction="vertical">
                    <Radio value={"short"}>Auto</Radio>
                    <Radio value={"02/11/202023"}>02/11/202023</Radio>
                    <Radio value={"12/02/2023"}>12/02/2023</Radio>
                    <Radio value={"10/11/2022"}>10/11/2022</Radio>
                  </Space>
                </Radio.Group>
              </RadioWrapper>
            )}
          />
          <Controller
            name="i18n->enable"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Enable Translations"}
                desc="If disabled, site will always be shown in default language and user will not be able to change their locale."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
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

export default LocalizationTab;
