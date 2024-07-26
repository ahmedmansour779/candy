import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Radio, Select, Space, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SettingHeader from "../../../components/SettingHeader";
import CheckBoxWrapper from "../../../components/UI/CheckBoxWrapper";
import InputWrapper from "../../../components/UI/InputWrapper";
import RadioWrapper from "../../../components/UI/RadioWrapper";
interface Inputs {
  default_timezone: number;
  default_language: number;
  default_list_view: number;
  share_notifications: number;
}
const LocalizationTab = () => {
  const { handleSubmit, control, setValue } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        default_timezone: yup.number().label("Required"),
        default_language: yup.number().label("Required"),
        default_list_view: yup.number().label("Required"),
        share_notifications: yup.number().label("Required"),
      })
    ),
  });

  setValue("default_timezone", 1);
  const onSubmit = (data: Inputs) => {
    data;
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
            name="default_timezone"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Default Time Zone"}>
                <Select
                  {...field}
                  defaultValue={1}
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                  options={[
                    { value: 1, label: "Auto" },
                    { value: 2, label: "option" },
                  ]}
                ></Select>
              </InputWrapper>
            )}
          />
          <Controller
            name="default_language"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Default Language"}>
                <Flex className="w-full">
                  <Select
                    {...field}
                    defaultValue={1}
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={[
                      { value: 1, label: "Auto" },
                      { value: 2, label: "option" },
                    ]}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />
          <Controller
            name="default_list_view"
            control={control}
            render={({ field }) => (
              <RadioWrapper
                title={"Default List View"}
                desc="Default verbosity for all dates displayed across the site. Month/day order and separators will be adjusted automatically, based on user's locale."
              >
                <Radio.Group defaultValue={1} {...field}>
                  <Space className="" direction="vertical">
                    <Radio value={1}>Auto</Radio>
                    <Radio value={2}>02/11/202023</Radio>
                    <Radio value={3}>12/02/2023</Radio>
                    <Radio value={4}>10/11/2022</Radio>
                  </Space>
                </Radio.Group>
              </RadioWrapper>
            )}
          />
          <Controller
            name="share_notifications"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Enable Translations"}
                desc="If disabled, site will always be shown in default language and user will not be able to change their locale."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
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
