import { useMutation } from "@tanstack/react-query";
import { Flex, Form, Input, Modal, Typography } from "antd";
import workspaceApi from "../../api/workspaceApi";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

interface Inputs {
  name: string;
}

const RenameFileModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required().label("Required"),
      })
    ),
  });
  ("opened");

  const createWorkspace = useMutation({
    mutationFn: (data: Inputs) => {
      return workspaceApi.createWorkspace(data);
    },
    onSuccess: () => {
      onClose();
    },
    onError: (e: unknown) => {
      setError("name", { message: (e as Error).message });
    },
  });

  const onSubmit = (data: Inputs) => {
    createWorkspace.mutate(data);
  };

  return (
    <Modal
      title="Rename"
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={onClose}
      confirmLoading={createWorkspace.isLoading}
    >
      <Form>
        {" "}
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter a name" defaultValue="" />
            )}
          />
          <Typography.Text type={"danger"} style={{ fontWeight: "400" }}>
            {errors.name?.message}
          </Typography.Text>
        </Flex>
      </Form>
    </Modal>
  );
};

export default RenameFileModal;
