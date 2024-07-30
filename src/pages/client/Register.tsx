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

interface Inputs {
    firstName:string;
    lastName:string;
    age:string;
    gender: string;
    email: string;
    password: string;
    job: string;
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
                firstName: yup.string().required().label("Please enter your first name"),
                lastName: yup.string().required().label("Please enter your last name"),
                age: yup.string().required().label("Please enter your age"),
                gender: yup.string().required().label("Please enter your gender"),
                job: yup.string().required().label("Please enter your job occupation"),
                email: yup.string().email().required().label("Please enter your email"),
                password: yup.string().required().label("Please enter your password"),
            })
        ),
    });
    
    function onSubmit(data: Inputs) {
        console.log(data);
        // fetchDataRegister(data,navigate)
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
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="First Name" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.firstName?.message}
                        </Text>
                    </Flex>
                    <Flex
                    style={{ marginTop: "1rem", flexDirection: "column" }}
                    gap={"0.5rem"}
                    >
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="Last Name" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.lastName?.message}
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
                            name="job"
                            control={control}
                            render={({ field }) => (
                            <Input {...field} placeholder="Job Occupation" defaultValue="" />
                            )}
                        />
                        <Text type={"danger"} className="font-normal text-start">
                            {errors.job?.message}
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