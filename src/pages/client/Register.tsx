/* eslint-disable @typescript-eslint/no-unused-vars */
import Logo from "../../assets/images/logo@2x.png";
import {
    Button,
    Flex,
    Form,
    Image,
    Input,
    Space,
    Typography,
    Divider,
    Radio,
} from "antd";
const { Text } = Typography;

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataRegister } from "../../api/register";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Inputs {
    first_name:string;
    last_name:string;
    age:string;
    gender: string;
    email: string;
    password: string;
    password_confirmation: string;
    job_occubation: string;
    add_company: string;
}
const Register = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(
            yup.object({
                first_name: yup.string().required().label("The first name"),
                last_name: yup.string().required().label("The last name"),
                age: yup.string().required().label("The age"),
                gender: yup.string().required().label("The gender"),
                job_occubation: yup.string().required().label("The job occupation"),
                add_company: yup.string().required().label("The company name"),
                email: yup.string().email().required().label("The email"),
                password: yup.string().required().min(8).label("The password"),
                password_confirmation: yup.string().required().label("The password confirmation"),
            })
        ),
    });

    const [showPass,setShowPass] = useState("password")
    const [showPassCon,setShowPassCon] = useState("password")
    const [passNotCon,setNot] = useState(false)
    
    function onSubmit(data: Inputs) {
        if(data.password !== data.password_confirmation){
            setNot(true)
        }
        else{
            setNot(false)
            // console.log(data);
            const sendData = {...data,token_name:"alia"}
            console.log(sendData);
            fetchDataRegister(sendData,navigate)
        }
    }

    return (
        <div className="bg-[#EAEBF0] flex justify-center items-center px-3 py-6">
            <div className="w-full max-w-[512px]  bg-white rounded-2xl p-12">
                <div className="text-center">
                <div>
                    <Image className="mb-8" src={Logo} preview={false} width={130} />
                </div>
                <Space direction="vertical">
                    <Text className="text-3xl font-semibold text-[#0154A0] mb-2">
                    Sign up
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
                            name="first_name"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="First Name" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.first_name?.message}
                        </Text>
                    </Flex>
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Controller
                            name="last_name"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="Last Name" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.last_name?.message}
                        </Text>
                    </Flex>
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
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Controller
                            name="password_confirmation"
                            control={control}
                            render={({ field }) => (
                                <div className="flex justify-between items-center border border-[#d9d9d9] hover:border-[#1d6dad] focus:border-[#1d6dad] rounded-lg pr-3">
                                    <Input
                                        type={showPassCon}
                                        {...field}
                                        placeholder="Password Confirmation"
                                        defaultValue=""
                                        className="border-none focus:shadow-none"
                                    />
                                    {
                                        showPassCon === "password" ?
                                        <EyeInvisibleOutlined onClick={()=>setShowPassCon("text")} className="cursor-pointer"/>
                                        :<EyeOutlined onClick={()=>setShowPassCon("password")} className="cursor-pointer"/>
                                    }
                                </div>
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.password_confirmation?.message}
                        </Text>
                        {
                            passNotCon ? 
                                <Text type={"danger"} className="font-normal text-start">
                                    password conformation is not same password
                                </Text>
                            :null
                        }
                    </Flex>
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Controller
                            name="age"
                            control={control}
                            render={({ field }) => (
                            <Input type="number" {...field} placeholder="Age" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.age?.message}
                        </Text>
                    </Flex>
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Controller
                            name="job_occubation"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="Job Occupation" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.job_occubation?.message}
                        </Text>
                    </Flex>
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Controller
                            name="add_company"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="Company Name" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.add_company?.message}
                        </Text>
                    </Flex>
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Text className="font-normal text-start">
                            Gender
                        </Text>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                            <Radio.Group {...field}>
                                <Space className="flex justify-start" direction="horizontal">
                                    <Radio value={"male"}>Male</Radio>
                                    <Radio value={"female"}>Female</Radio>
                                </Space>
                            </Radio.Group>
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.gender?.message}
                        </Text>
                    </Flex>
                    <Button
                    // loading={login.isLoading}
                    htmlType="submit"
                    type="primary"
                    className="px-8 py-3 mt-3 h-auto w-full"
                    >
                        Sign Up
                    </Button>
                </Form>
                <Divider className="!mt-6">Or</Divider>
                <Text className="text-[#888888]">
                    Do have an account?{" "}
                    <Link to={"/login"}  className="text-[#0154A0] cursor-pointer">Sign In</Link>{" "}
                </Text>
                </div>
            </div>
        </div>
    );
};

export default Register;