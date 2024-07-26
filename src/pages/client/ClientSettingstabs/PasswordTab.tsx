import SettingHeader from "../../../components/SettingHeader";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Input } from "antd";
import InputWrapper from "../../../components/UI/InputWrapper";

interface Inputs {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const PasswordTab = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        old_password: yup.string().required("Required"),
        new_password: yup.string().required("Required"),
        confirm_password: yup
          .string()
          .oneOf([yup.ref("new_password")], "Passwords must match"),
      })
    ),
  });
  errors;

  const onSubmit = (data: Inputs) => {
    data;
  };
  return (
    <>
      <SettingHeader title="Manage Passwords" />
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
            name="old_password"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Current Password"}>
                <Input.Password
                  {...field}
                  placeholder="Enter old password"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="new_password"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"New Password"}>
                <Input.Password
                  {...field}
                  placeholder="Enter new password"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"New Password"}>
                <Form.Item
                  className=" mb-0"
                  style={{ color: "#222E57" }}
                  {...(errors.confirm_password && {
                    help: errors.confirm_password.message,
                    validateStatus: "error",
                  })} // Conditional
                >
                  <Input.Password
                    {...field}
                    placeholder="confirm new password"
                    className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3"
                  />
                </Form.Item>
              </InputWrapper>
            )}
          />

          <Flex
            gap={12}
            justify="end"
            className="w-full max-md:flex-col-reverse "
          >
            <Button
              htmlType="submit"
              type="primary"
              className="max-md:w-full h-fit py-2 px-4"
            >
              Update Password
            </Button>
          </Flex>
        </Flex>
      </Form>
    </>
  );
};

export default PasswordTab;
