/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Switch,
  Table,
  // TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import PageHeading from "../../../components/PageHeading";
const { Text } = Typography;

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import TextArea from "antd/es/input/TextArea";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import usersApi from "../../../api/admin/usersApi";
import FilterIcon from "../../../assets/icons/FilterIcon";
import DeleteModal from "../../../components/modals/DeleteModal";
import CustomPagination from "../../../components/shared/CustomPagination";
import useDisclosure from "../../../hooks/useDisclosure";
import { User } from "../../../types/backend";

const UsersPage = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [lengthData, setLength] = useState<number | undefined>();

  return (
    <div className="p-8 mb-16 sm:mb-0 ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
      {" "}
      <PageHeading title="Users">
        <div className="flex h-full">
          {" "}
          <Button iconPosition="start" className="h-full" icon={<FilterIcon />}>
            Filter
          </Button>
          <Link to={"new"}>
            {" "}
            <Button
              type="primary"
              iconPosition="end"
              className="h-full"
              icon={<PlusOutlined />}
            >
              Add New User
            </Button>
          </Link>
        </div>
      </PageHeading>
      <FilterHead setUserEmail={setUserEmail} lengthData={lengthData} />
      <UsersTable userEmail={userEmail} setLength={setLength} />
    </div>
  );
};

export default UsersPage;

function FilterHead({
  setUserEmail,
  lengthData
}: {
  setUserEmail: (value: string) => void;
  lengthData:number | undefined;
}) {
  return (
    <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start ">
      <Input
        className="max-w-[364px] max-md:max-w-full border-none p-4"
        placeholder="Search here"
        prefix={<SearchOutlined />}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Text className="text-[#888888] text-base font-medium">
        Viewing
        <Text className="text-[#0154A0]"> {lengthData} </Text>
        of
        <Text className="text-[#0154A0]"> 100 </Text>
        User
      </Text>
    </div>
  );
}

// const rowSelection = {
//   getCheckboxProps: (record: DataType) => ({
//     disabled: record.lastName === "Disabled User", // Column configuration not to be checked
//     name: record.lastName,
//   }),
// };

function UsersTable({ userEmail,setLength }: { userEmail: string | null,setLength:React.Dispatch<React.SetStateAction<number | undefined>> }) {
  console.log("🚀 ~ UsersTable ~ userEmail:", userEmail);
  const deleteModal = useDisclosure();
  const suspendUserModal = useDisclosure();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  console.log("🚀 ~ UsersTable ~ page:", page);

  const usersData = useQuery({
    queryKey: ["users", page],
    queryFn: () => usersApi.getAllUsers({ page: page }),
  });
  console.log("🚀 ~ UsersTable ~ usersData:", usersData.data);

  useEffect(()=>{
    setLength(usersData?.data?.data?.length);
  },[usersData?.data])
  const deleteMutation = useMutation({
    mutationFn: () => usersApi.deleteUser(deleteId as number),
    onSuccess: () => {
      deleteModal.onClose();
      usersData.refetch();
    },
  });

  const [target, setTarget] = useState<User | null>(null);
  const [deleteId, setId] = useState<number | null>(null);

  const navigate = useNavigate();
  const columns: any = [
    {
      title: "users",
      dataIndex: "username",
      render: (value:any, record:any) => {
        return (
          <div className="flex flex-col gap-2">
            <Text>{value}</Text>
            <Text className="text-[14px] text-[#475467]">{record.email}</Text>
          </div>
        );
      },
    },
    {
      title: "subscribed",
      dataIndex: "subscribed",
      render: (value:any) => {
        return value === 1 ? (
          <CheckOutlined style={{ color: "#22C55E" }} />
        ) : (
          <CloseOutlined style={{ color: "#CC161D" }} />
        );
      },
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (value:any) => {
        return (
          <Tag style={{ fontSize: "0.75rem" }} color="blue">
            {value}
          </Tag>
        );
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      render: (e:any, record:any) => {
        return <Text>{record.first_name || record.username}</Text>;
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      render: (e:any, record:any) => {
        return <Text>{record.last_name || record.username}</Text>;
      },
    },
    {
      title: "Last Updated",
      dataIndex: "last_updated",
      render: () => <Text>2022-12-12</Text>,
    },
    {
      title: "Actions",
      render: (e:any, record:any) => {
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                navigate(`${record.id}/edit`);
              }}
              type="text"
              icon={<EditOutlined />}
            />
            <Button
              onClick={() => {
                setTarget(e);
                suspendUserModal.onOpen();
              }}
              type="text"
              icon={<UserDeleteOutlined />}
            />
            <Button
              type="text"
              onClick={() => {
                setId(record.id);
                deleteModal.onOpen();
              }}
              icon={<DeleteOutlined style={{ color: "#CC161D" }} />}
            />
          </div>
        );
      },
    },
  ];
  const data = usersData.data?.data.filter(item=>item.email.includes(userEmail || ""))
  return (
    <div className="mt-4">
      <Table
        pagination={CustomPagination({ total: 100 })}
        dataSource={data || []}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        columns={columns}
        scroll={{ x: 1000 }}
        loading={usersData.isLoading}
      />
      <DeleteModal
        title="Delete user"
        description="Are you sure you want to delete this user?"
        open={deleteModal.open}
        onClose={deleteModal.onClose}
        handleOk={deleteMutation.mutate}
        deleteIsLoading={deleteMutation.isLoading}
      />
      <SuspendUserModal
        open={suspendUserModal.open}
        onClose={suspendUserModal.onClose}
        target={target}
      />
    </div>
  );
}

interface Inputs {
  expire_date: string;
  expire_reason: string;
}
const SuspendUserModal = ({
  open,
  onClose,
  target,
}: {
  open: boolean;
  onClose: () => void;
  target: User | null;
}) => {
  const [isPermanent, setIsPermanent] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        expire_date: yup
          .string()
          .when("$isPermanent", (isPermanent, schema) =>
            !isPermanent
              ? schema.required("Expiration date is required")
              : schema.nullable()
          ),
      })
    ),
    context: { isPermanent },
  });

  console.log(errors);

  const onSubmit = (data: Inputs) => {
    console.log({
      ...data,
      expire_date: isPermanent ? null : data.expire_date,
    });
  };

  return (
    <Modal
      title={<>Suspend "{target?.username}"</>}
      open={open}
      onOk={() => {
        handleSubmit(onSubmit)();
      }}
      onCancel={onClose}
      okText="Suspend"
      confirmLoading={false}
      closeIcon={
        <div className="flex justify-center items-center h-[28px] w-[28px] bg-[#0154A01A] rounded-full">
          <CloseOutlined style={{ color: "#0154A0" }} />
        </div>
      }
    >
      <Divider />

      <Form layout="vertical">
        {" "}
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="expire_date"
            control={control}
            render={({ field }) => (
              <Flex className="flex-col mt-4" gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  Suspend Until
                </Text>

                <Flex gap={"0.5rem"} vertical>
                  <DatePicker
                    {...field}
                    disabled={isPermanent}
                    className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3 w-full"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  <Text className="text-xs text-red-500">
                    {errors.expire_date?.message}
                  </Text>
                </Flex>
                <Flex align="center" className="justify-between w-full">
                  <Flex gap={"0.5rem"} align="center">
                    <Switch
                      checked={isPermanent}
                      onChange={(e) => setIsPermanent(e ? !!1 : !!0)}
                    />
                    <Text className="text-xs text-[#333333]">Permanent</Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          />
        </Flex>
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="expire_reason"
            control={control}
            render={({ field }) => (
              <Flex className="flex-col mt-4" gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  Reason
                </Text>
                <TextArea
                  rows={8}
                  {...field}
                  className="px-3 py-3 rounded-2xl"
                />
              </Flex>
            )}
          />
        </Flex>
        <Button hidden type="primary" htmlType="submit" />
      </Form>
    </Modal>
  );
};
