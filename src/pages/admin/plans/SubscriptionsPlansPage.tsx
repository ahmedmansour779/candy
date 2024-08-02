import { Button, Table, TableColumnsType, Typography } from "antd";
import { useState } from "react";
import PageHeading from "../../../components/PageHeading";
const { Text } = Typography;

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import plansApi from "../../../api/admin/plansApi";
import DeleteModal from "../../../components/modals/DeleteModal";
import useDisclosure from "../../../hooks/useDisclosure";
import { Plan } from "../../../types/backend";

const SubscriptionsPlansPage = () => {
  return (
    <div className="p-8 mb-16 sm:mb-0 ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
      {" "}
      <PageHeading title="Subscription Plans">
        <div className="flex h-full">
          {" "}
          <Link to={"new"}>
            {" "}
            <Button
              type="primary"
              iconPosition="end"
              className="h-full"
              icon={<PlusOutlined />}
            >
              Add New Plan
            </Button>
          </Link>
        </div>
      </PageHeading>
      <UsersTable />
    </div>
  );
};

export default SubscriptionsPlansPage;

function UsersTable() {
  const navigate = useNavigate();
  const deleteModal = useDisclosure();
  const [target, setTarget] = useState<Plan | null>(null);

  const plansData = useQuery({
    queryKey: ["plans"],
    queryFn: () => plansApi.getAllplans(),
  });

  const columns: TableColumnsType<Plan> = [
    {
      title: "Plan",
      dataIndex: "name",
    },
    {
      title: "Pricing",
      dataIndex: "free",
      render: (value) => {
        return <Text>{Number(value).toFixed(2)} EGP</Text>;
      },
    },
    {
      title: "Description",
      dataIndex: "available_space",
      render: (value) => {
        return <Text>{Number(value).toFixed(2)} GB</Text>;
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
      render: (e, record) => (
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
              deleteModal.onOpen();
            }}
            type="text"
            icon={<DeleteOutlined style={{ color: "#CC161D" }} />}
          />
        </div>
      ),
    },
  ];

  const deleteMutation = useMutation({
    mutationFn: () => plansApi.deletePlan(target?.id as number),
    onSuccess: () => {
      deleteModal.onClose();
      plansData.refetch();
    },
  });
  return (
    <div className="mt-4">
      <Table
        pagination={false}
        dataSource={plansData.data?.products || []}
        columns={columns}
        scroll={{ x: 1500 }}
        loading={plansData.isLoading}
      />
      <DeleteModal
        title="Delete plan"
        description="Are you sure you want to delete this plan?"
        open={deleteModal.open}
        onClose={deleteModal.onClose}
        handleOk={deleteMutation.mutate}
        deleteIsLoading={deleteMutation.isLoading}
      />
    </div>
  );
}
