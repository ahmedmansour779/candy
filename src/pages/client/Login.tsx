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

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataLogin } from "../../api/login";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface Inputs {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        email: yup.string().email().required().label("Please enter your email"),
        password: yup.string().required().label("Please enter your password"),
      })
    ),
  });
  
  const [showPass,setShowPass] = useState("password")

  const dispatch = useDispatch();
  function onSubmit(data: Inputs) {
    // console.log(data);
    fetchDataLogin(data,navigate,dispatch)
  }

  return (
    <div className="bg-[#EAEBF0] min-h-screen flex justify-center items-center px-3 py-6">
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
          <div className="flex justify-center gap-3 mt-4 sm:gap-6">
            <button className="bg-green-500 w-[120px] text-white p-2 px-3 rounded-md text-lg">Google</button>
            <button className="bg-blue-500 w-[120px] text-white p-2 px-3 rounded-md text-lg">Facebook</button>
            <button className="bg-black w-[120px] text-white p-2 px-3 rounded-md text-lg">X</button>
          </div>
          <Form onFinish={handleSubmit(onSubmit)} className="mt-5">
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
                  <div className="flex justify-between items-center border border-[#d9d9d9] hover:border-[#1d6dad] focus:border-[#1d6dad] rounded-lg pr-3">
                    <Input
                      type={showPass}
                      {...field}
                      placeholder="Password"
                      defaultValue=""
                      className="border-none focus:shadow-none"
                      />
                    {
                      showPass === "password" ?
                        <EyeInvisibleOutlined onClick={()=>setShowPass("text")} className="cursor-pointer"/>
                      :<EyeOutlined onClick={()=>setShowPass("password")} className="cursor-pointer"/>
                    }
                  </div>
                )}
              />
              <Text type={"danger"} className="font-normal text-start">
                {errors.password?.message}
              </Text>
            </Flex>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 mb-5">
              <Checkbox onChange={() => {}} className=" text-[#888888]">
                Remember for 30 days
              </Checkbox>
              <a href="" className="text-[#0154A0]">
                Forgot password?
              </a>
            </div>
            <Button
              // loading={login.isLoading}
              htmlType="submit"
              type="primary"
              className="w-full h-auto px-8 py-3"
            >
              Sign In
            </Button>
          </Form>
          <Divider className="!mt-6">Or</Divider>
          <Text className="text-[#888888]">
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-[#0154A0] cursor-pointer">Sign Up</Link>{" "}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
