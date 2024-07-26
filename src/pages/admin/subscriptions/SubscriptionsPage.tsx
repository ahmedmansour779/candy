import React, { useState } from "react";
import PageHeading from "../../../components/PageHeading";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
const { Text } = Typography;

import FilterIcon from "../../../assets/icons/FilterIcon";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CustomPagination from "../../../components/shared/CustomPagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import subscriptionsApi from "../../../api/admin/subscriptionsApi";
import { Controller, useForm } from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useDisclosure from "../../../hooks/useDisclosure";
import DeleteModal from "../../../components/modals/DeleteModal";
import usersApi from "../../../api/admin/usersApi";
import plansApi from "../../../api/admin/plansApi";

const SubscriptionsPage = () => {
  const subscriptionsModal = useDisclosure();
  const [target, setTarget] = useState<Subscription | null>(null);

  const handleAddUser = () => {
    setTarget(null);
    subscriptionsModal.onOpen();
  };

  const handleEditUser = (user: Subscription) => {
    setTarget(user);
    subscriptionsModal.onOpen();
  };
  return (
    <div className="p-8">
      {" "}
      <PageHeading title="Subscriptions">
        <div className="flex h-full">
          {" "}
          <Button iconPosition="start" className="h-full" icon={<FilterIcon />}>
            Filter
          </Button>
          <Button
            type="primary"
            iconPosition="end"
            className="h-full"
            icon={<PlusOutlined />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </div>
      </PageHeading>
      <FilterHead />
      <UsersTable onEditUser={handleEditUser} />
      <SubscriptionSuspendModal
        open={subscriptionsModal.open}
        onClose={subscriptionsModal.onClose}
        target={target}
      />
    </div>
  );
};

export default SubscriptionsPage;

function FilterHead() {
  return (
    <div className="flex justify-between max-md:flex-col gap-4 items-center max-md:items-start ">
      <Input
        className="max-w-[364px] max-md:max-w-full border-none p-4"
        placeholder="Search here"
        prefix={<SearchOutlined />}
      />
      <Text className="text-[#888888] text-base font-medium">
        Viewing
        <Text className="text-[#0154A0]"> 10 </Text>
        of
        <Text className="text-[#0154A0]"> 100 </Text>
        Customer
      </Text>
    </div>
  );
}

const rowSelection = {
  getCheckboxProps: (record: Subscription) => ({
    disabled: record.user_name === "Disabled User", // Column configuration not to be checked
    name: record.user_name,
  }),
};

function UsersTable({
  onEditUser,
}: {
  onEditUser: (user: Subscription) => void;
}) {
  const deleteModal = useDisclosure();

  const [target, setTarget] = useState<Subscription | null>(null);

  const SubscriptionsData = useQuery({
    queryKey: ["roles"],
    queryFn: () => subscriptionsApi.getAllSubscriptions(),
  });

  const deleteMutation = useMutation({
    mutationFn: () => subscriptionsApi.deleteSubscription(target?.id as number),
    onSuccess: () => {
      deleteModal.onClose();
      SubscriptionsData.refetch();
    },
  });

  const columns: TableColumnsType<Subscription> = [
    {
      title: "Customers",
      dataIndex: "user_name",
      render: (value, record) => {
        return (
          <div className="flex gap-2 flex-col">
            <Text>{value}</Text>
            <Text className="text-[14px] text-[#475467]">
              {record.user_email}
            </Text>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => {
        return value ? (
          <CheckOutlined style={{ color: "#22C55E" }} />
        ) : (
          <CloseOutlined style={{ color: "#CC161D" }} />
        );
      },
      align: "center",
    },
    {
      title: "Plans",
      dataIndex: "plan",
      render: (value) => {
        typeof value;

        return (
          <Tag style={{ fontSize: "0.75rem" }} color="blue">
            {value}
          </Tag>
        );
      },
    },

    {
      title: "Renews at",
      dataIndex: "renews_at",
      render: (value) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    {
      title: "Ends at",
      dataIndex: "ends_at",
      render: (value) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (value) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    {
      title: "Actions",
      render: (e) => (
        <div className="flex gap-2">
          <Button
            onClick={() => onEditUser(e)}
            type="text"
            icon={<EditOutlined />}
          />
          <Button
            type="text"
            onClick={() => {
              setTarget(e);
              deleteModal.onOpen();
            }}
            icon={<DeleteOutlined style={{ color: "#CC161D" }} />}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="mt-4">
      <Table
        pagination={CustomPagination({
          total: SubscriptionsData.data?.data.length || 0,
        })}
        dataSource={SubscriptionsData.data?.data || []}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        scroll={{ x: 1500 }}
        loading={SubscriptionsData.isLoading}
      />
      <DeleteModal
        title="Delete subscription"
        description="Are you sure you want to delete this subscription?"
        open={deleteModal.open}
        onClose={deleteModal.onClose}
        handleOk={deleteMutation.mutate}
        deleteIsLoading={deleteMutation.isLoading}
      />
    </div>
  );
}

interface Inputs {
  expire_date: string;
  expire_reason: string;
}
const SubscriptionSuspendModal = ({
  open,
  onClose,
  target,
}: {
  open: boolean;
  onClose: () => void;
  target: Subscription | null;
}) => {
  const [searchKey, setSearchKey] = useState("");

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
  });

  const usersData = useQuery({
    queryKey: ["users", searchKey],
    queryFn: () => usersApi.getAllUsers({ page: 1, search: searchKey }),
  });
  console.log("🚀 ~ UsersTable ~ usersData:", usersData.data);

  const userOptions = usersData.data?.data.map((user) => ({
    label: user.username,
    value: user.id,
  }));

  const plansData = useQuery({
    queryKey: ["plans"],
    queryFn: () => plansApi.getAllplans(),
  });

  const planOptions = plansData.data?.products.map((plan) => ({
    label: plan.name,
    value: plan.id,
  }));

  const debounceFetcher = (value: string) => {
    setTimeout(() => {
      setSearchKey(value);
    }, 250);
  };

  const onSubmit = (data: Inputs) => {
    console.log({
      ...data,
    });
  };

  return (
    <Modal
      title={target ? `Edit ${target.user_email}` : "Add Subscription"}
      open={open}
      onOk={() => {
        handleSubmit(onSubmit)();
      }}
      onCancel={onClose}
      okText="Save"
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
            render={() => (
              <Flex className="flex-col mt-4" gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  User
                </Text>

                <Select
                  allowClear
                  onClear={() => {
                    setSearchKey("");
                  }}
                  placeholder="Search by email"
                  showSearch
                  labelInValue
                  filterOption={false}
                  onSearch={debounceFetcher}
                  notFoundContent={
                    usersData.isLoading ? <Spin size="small" /> : null
                  }
                  options={userOptions || []}
                />
              </Flex>
            )}
          />
          <Controller
            name="expire_date"
            control={control}
            render={() => (
              <Flex className="flex-col mt-4" gap={"0.75rem"}>
                <Text style={{ fontWeight: "500", color: "#222E57" }}>
                  Plan
                </Text>

                <Select
                  allowClear
                  labelInValue
                  filterOption={false}
                  notFoundContent={
                    usersData.isLoading ? <Spin size="small" /> : null
                  }
                  options={planOptions || []}
                />
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
                  Description
                </Text>
                <TextArea
                  rows={8}
                  {...field}
                  className=" rounded-2xl  py-3 px-3"
                />
              </Flex>
            )}
          />
        </Flex>
        <Controller
          name="expire_date"
          control={control}
          render={({ field }) => (
            <Flex className="flex-col mt-4" gap={"0.75rem"}>
              <Text style={{ fontWeight: "500", color: "#222E57" }}>
                Renews at
              </Text>

              <Flex gap={"0.5rem"} vertical>
                <DatePicker
                  {...field}
                  className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3 w-full"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
                <Text className="text-xs text-red-500">
                  {errors.expire_date?.message}
                </Text>
              </Flex>
            </Flex>
          )}
        />
        <Controller
          name="expire_date"
          control={control}
          render={({ field }) => (
            <Flex className="flex-col mt-4" gap={"0.75rem"}>
              <Text style={{ fontWeight: "500", color: "#222E57" }}>
                Ends at
              </Text>

              <Flex gap={"0.5rem"} vertical>
                <DatePicker
                  {...field}
                  className="bg-[#EAEBF0] rounded-2xl border-none py-3 px-3 w-full"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
                <Text className="text-xs text-red-500">
                  {errors.expire_date?.message}
                </Text>
              </Flex>
            </Flex>
          )}
        />
        <Button hidden type="primary" htmlType="submit" />
      </Form>
    </Modal>
  );
};
