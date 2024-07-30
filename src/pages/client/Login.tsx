import React from "react";
import Logo from "../../assets/images/logo@2x.png";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Space,
  Typography,
  Divider,
} from "antd";
const { Text } = Typography;

import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import authApi from "../../api/authApi";
import { useNavigate } from "react-router-dom";

interface Inputs {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required().label("Please enter your email"),
        password: yup.string().required().label("Please enter your password"),
      })
    ),
  });

  const login = useMutation({
    mutationFn: (data: Inputs) => {
      return authApi.login(data);
    },
    onError: (e: unknown) => {
      e;

      setError("email", {
        message: (e as { response: { data: { message: string } } }).response
          .data.message,
      });
    },
  });
  errors;

  function onSubmit(data: Inputs) {
    login.mutate(data);
    // console.log(data);
    navigate("/drive");

  }

  return (
    <div className="bg-[#EAEBF0] h-screen flex justify-center items-center p-1rem">
      <div className="w-full max-w-[512px]  bg-white rounded-2xl p-12">
        <div className="text-center">
          <div>
            <Image className="mb-8" src={Logo} preview={false} width={130} />
          </div>
          <Space direction="vertical">
            <Text className="text-3xl font-semibold text-[#0154A0] mb-2">
              Sign in
            </Text>
            <Text className="text-base font-medium text-[#888888] mb-2">
              Welcome back! Please enter your details.
            </Text>
          </Space>
          <Form onFinish={handleSubmit(onSubmit)} className="mt-8">
            {" "}
            <Flex
              style={{ marginTop: "1rem", flexDirection: "column" }}
              gap={"0.5rem"}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Email" defaultValue="" />
                )}
              />
              <Text type={"danger"} className="font-normal text-start">
                {errors.email?.message}
              </Text>
            </Flex>
            <Flex
              style={{ marginTop: "1rem", flexDirection: "column" }}
              gap={"0.5rem"}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    {...field}
                    placeholder="Password"
                    defaultValue=""
                  />
                )}
              />
              <Text type={"danger"} className="font-normal text-start">
                {errors.password?.message}
              </Text>
            </Flex>
            <div className="flex justify-between items-center mb-6">
              <Checkbox onChange={() => {}} className="mt-4 text-[#888888]">
                Remember for 30 days
              </Checkbox>
              <a href="" className="text-[#0154A0]">
                Forgot password?
              </a>
            </div>
            <Button
              loading={login.isLoading}
              htmlType="submit"
              type="primary"
              className="px-8 py-3 h-auto w-full"
            >
              Sign In
            </Button>
          </Form>
          <Divider className="!mt-6">Or</Divider>
          <Text className="text-[#888888]">
            Don’t have an account?{" "}
            <Text className="text-[#0154A0] cursor-pointer">Sign Up</Text>{" "}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
