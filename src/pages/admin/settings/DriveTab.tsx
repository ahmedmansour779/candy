/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Radio, Space, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SettingHeader from "../../../components/SettingHeader";
import CheckBoxWrapper from "../../../components/UI/CheckBoxWrapper";
import RadioWrapper from "../../../components/UI/RadioWrapper";
import { fetchEditAdminSetting } from "../../../api/EditAdminSettings";

interface Inputs {
  "drive->default_view": string;
  "drive->send_share_notification": boolean;
  "share->suggest_emails": boolean;
}

const DriveTab = ({
  data,
}: {
  data: any;
}) => {
  const { handleSubmit, control } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().label("Required"),
        view_status: yup.number().label("Required"),
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
        title="Drive"
        info="Configure defaults for drive user dashboard."
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
            name="drive->default_view"
            control={control}
            render={({ field }) => (
              <RadioWrapper title={"Default List View"}>
                <Radio.Group defaultValue={1} {...field}>
                  <Space className="" direction="vertical">
                    <Radio value={"list"}>List View</Radio>
                    <Radio value={"grid"}>Grid View</Radio>
                  </Space>
                </Radio.Group>
              </RadioWrapper>
            )}
          />
          <Controller
            name="drive->send_share_notification"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Share Notifications"}
                desc="Send a notification to user when a file or folder is shared with them."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="share->suggest_emails"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Suggest Emails"}
                desc="Suggest email address of existing users when sharing a file or folder."
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

export default DriveTab;
