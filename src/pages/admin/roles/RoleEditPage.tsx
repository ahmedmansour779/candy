import React, { useRef, useState } from "react";
import AdminRoleForm, {
  ChildComponentHandle,
} from "../../../components/forms/AdminRoleForm";
import { useParams, useSearchParams } from "react-router-dom";
import PageHeading from "../../../components/PageHeading";
import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  Table,
  TableColumnsType,
  Tabs,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CustomPagination from "../../../components/shared/CustomPagination";
import useDisclosure from "../../../hooks/useDisclosure";
import { useQuery } from "@tanstack/react-query";
import rolesApi from "../../../api/admin/rolesApi";

const { Text } = Typography;

enum EnumTab {
  setting = 1,
  users,
}

type TabKey = keyof typeof EnumTab;

const RoleEditPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabKey = (searchParams.get("tab") || "setting") as TabKey;
  const tabIndex = String(EnumTab[tabKey]) || "1";

  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const childRef = useRef<ChildComponentHandle>(null);

  const handleClick = () => {
    if (childRef.current) {
      childRef.current.childFunction();
    }
  };

  const { id } = useParams();
  const userData = useQuery({
    queryKey: ["users"],
    queryFn: () => rolesApi.showRole(Number(id)),
  });
  console.log(userData.data);

  return (
    <div className="p-8">
      {userData.data && (
        <>
          {" "}
          <PageHeading title={`Edit ${userData.data.data.name} role`}>
            <div className="flex h-full">
              <Button
                loading={isBtnLoading}
                onClick={handleClick}
                type="primary"
                className="h-full"
              >
                Update
              </Button>
            </div>
          </PageHeading>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Setting",
                children: (
                  <AdminRoleForm
                    setIsLoading={setIsBtnLoading}
                    ref={childRef}
                    target={userData.data.data}
                  />
                ),
              },
              {
                key: "2",
                label: "Users",
                children: <AdminRoleEditUsersTable />,
              },
            ]}
            activeKey={tabIndex}
            onTabClick={(clickedTab) =>
              setSearchParams({ tab: EnumTab[Number(clickedTab)] })
            }
          />
        </>
      )}
    </div>
  );
};

export default RoleEditPage;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  user: string;
  assigned_at: string;
  email?: string;
}

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    user: "Mirna Atef",
    assigned_at: "2022-12-12",
    email: "wXgkS@example.com",
  },
  {
    key: "2",
    firstName: "Alice",
    lastName: "Smith",
    user: "alice_smith",
    assigned_at: "2023-01-15",
    email: "alice.smith@example.com",
  },
  {
    key: "3",
    firstName: "Bob",
    lastName: "Johnson",
    user: "bob_johnson",
    assigned_at: "2023-02-28",
    email: "bob.johnson@example.com",
  },
  {
    key: "4",
    firstName: "Sarah",
    lastName: "Williams",
    user: "sarah_williams",
    assigned_at: "2023-03-10",
    email: "sarah.williams@example.com",
  },
  {
    key: "5",
    firstName: "Michael",
    lastName: "Jones",
    user: "michael_jones",
    assigned_at: "2023-04-22",
    email: "michael.jones@example.com",
  },
  {
    key: "6",
    firstName: "Emily",
    lastName: "Davis",
    user: "emily_davis",
    assigned_at: "2023-05-05",
    email: "emily.davis@example.com",
  },
  {
    key: "7",
    firstName: "David",
    lastName: "Martinez",
    user: "david_martinez",
    assigned_at: "2023-06-18",
    email: "david.martinez@example.com",
  },
  {
    key: "8",
    firstName: "Jessica",
    lastName: "Brown",
    user: "jessica_brown",
    assigned_at: "2023-07-01",
    email: "jessica.brown@example.com",
  },
  {
    key: "9",
    firstName: "Daniel",
    lastName: "Garcia",
    user: "daniel_garcia",
    assigned_at: "2023-08-14",
    email: "daniel.garcia@example.com",
  },
  {
    key: "10",
    firstName: "Sophia",
    lastName: "Rodriguez",
    user: "sophia_rodriguez",
    assigned_at: "2023-09-27",
    email: "sophia.rodriguez@example.com",
  },
];
const rowSelection = {
  getCheckboxProps: (record: DataType) => ({
    disabled: record.lastName === "Disabled User", // Column configuration not to be checked
    name: record.lastName,
  }),
};

const AdminRoleEditUsersTable = () => {
  const assignUserModal = useDisclosure();
  const columns: TableColumnsType<DataType> = [
    {
      title: "User",
      dataIndex: "user",
      render: (value, record) => {
        return (
          <div className="flex gap-2 flex-col">
            <Text>{value}</Text>
            <Text className="text-[14px] text-[#475467]">{record.email}</Text>
          </div>
        );
      },
    },

    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Assigned at",
      dataIndex: "assigned_at",
    },
  ];
  return (
    <>
      <div className="flex justify-between max-md:flex-col gap-4 items-center max-md:items-start ">
        <Input
          className="max-w-[364px] max-md:max-w-full border-none p-4"
          placeholder="Search here"
          prefix={<SearchOutlined />}
        />
        <div className="flex h-full">
          <Button
            onClick={assignUserModal.onOpen}
            type="primary"
            className="h-full"
          >
            Assign User
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Table
          pagination={CustomPagination({ total: data.length })}
          dataSource={data}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          scroll={{ x: 1000 }}
        />
        <AssignUserModal
          open={assignUserModal.open}
          onOpen={assignUserModal.onOpen}
          onClose={assignUserModal.onClose}
        />
      </div>
    </>
  );
};

const AssignUserModal = ({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal
      title="Select a user"
      open={open}
      onOk={onOpen}
      onCancel={onClose}
      footer={null}
    >
      <Input
        className="max-w-full max-md:max-w-full border-none p-4 mt-6"
        placeholder="Search for user by email or name"
        prefix={<SearchOutlined />}
      />
      <div className="grid grid-cols-2 max-md:grid-cols-1  gap-6 mt-6">
        {data.map((item, index) => (
          <Flex
            key={item.user}
            gap={"0.5rem"}
            align="center"
            className="cursor-pointer p-2 hover:bg-[#f5f5f5] rounded-lg"
          >
            <Image
              preview={false}
              src={`https://i.pravatar.cc/200/?img=${index}`}
              className="rounded-full min-w-10 min-h-10 max-w-10 max-h-10"
            />
            <div className="flex  flex-col">
              <Text className="text-xs font-semibold text-[#0154A0]">
                {item.user}
              </Text>
              <Text className="text-xs text-[#888888]">{item.email}</Text>
            </div>
          </Flex>
        ))}
      </div>
    </Modal>
  );
};
