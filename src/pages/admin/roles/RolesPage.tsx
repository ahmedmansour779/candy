import { Button, Select, Table, TableColumnsType, Typography } from "antd";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
const { Text } = Typography;

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import rolesApi from "../../../api/admin/rolesApi";
import DeleteModal from "../../../components/modals/DeleteModal";
import useDisclosure from "../../../hooks/useDisclosure";
import { Role } from "../../../types/backend";

const RolesPage = () => {
  return (
    <div className="p-8 mb-16 sm:mb-0 ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
      {" "}
      <PageHeading title="Roles">
        <Link to={"new"}>
          {" "}
          <Button
            type="primary"
            iconPosition="end"
            className="h-full"
            icon={<PlusOutlined />}
          >
            Add New Role
          </Button>
        </Link>
      </PageHeading>
      <FilterHead />
      <UsersTable />
    </div>
  );
};

export default RolesPage;

function FilterHead() {
  return (
    <div className="flex justify-between max-md:flex-col gap-4 items-center max-md:items-start ">
      <Text className="text-[#888888] text-base font-medium">
        Viewing
        <Text className="text-[#0154A0]"> 5 </Text>
        of
        <Text className="text-[#0154A0]"> 5 </Text>
        Roles
      </Text>
      <Select
        defaultValue="Sort By"
        style={{ width: 120 }}
        defaultActiveFirstOption={true}
        className="
            [&>.ant-select-selector]:!border-none 
            [&>.ant-select-selector]:rounded-none 
            h-full
            "
        options={[
          { value: 1, label: "desc" },
          { value: 2, label: "asc" },
        ]}
      />
    </div>
  );
}

// const rowSelection = {
//   getCheckboxProps: (record: Role) => ({
//     disabled: record.name === "Disabled User", // Column configuration not to be checked
//     name: record.id,
//   }),
// };

function UsersTable() {
  const navigate = useNavigate();
  const deleteModal = useDisclosure();
  const [target, setTarget] = useState<Role | null>(null);

  const rolesData = useQuery({
    queryKey: ["roles"],
    queryFn: () => rolesApi.getAllRoles(),
  });

  const deleteMutation = useMutation({
    mutationFn: () => rolesApi.deleteRole(target?.id as number),
    onSuccess: () => {
      deleteModal.onClose();
      rolesData.refetch();
    },
  });

  const columns: TableColumnsType<Role> = [
    {
      title: "role",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (value) => <Text>{value}</Text>,
      align: "center",
    },

    {
      title: "Last Updated",
      dataIndex: "last_updated",
      render: () => <Text>2022-12-12</Text>,
    },
    {
      title: "Actions",
      render: (e) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigate(`${e.id}/edit`);
            }}
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
        pagination={false}
        dataSource={rolesData.data?.data || []}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        columns={columns}
        scroll={{ x: 1500 }}
        loading={rolesData.isLoading}
      />
      <DeleteModal
        title="Delete role"
        description="Are you sure you want to delete this role?"
        open={deleteModal.open}
        onClose={deleteModal.onClose}
        handleOk={deleteMutation.mutate}
        deleteIsLoading={deleteMutation.isLoading}
      />
    </div>
  );
}
