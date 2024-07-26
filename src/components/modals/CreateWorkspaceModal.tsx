import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Form, Input, Modal, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import workspaceApi from "../../api/workspaceApi";
import { WorkSpace } from "../../types/backend";

interface Inputs {
  name: string;
}

const CreateWorkspaceModal = ({
  open,
  onClose,
  target,
}: {
  open: boolean;
  onClose: () => void;
  target?: WorkSpace;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required().label("Required").min(3),
      })
    ),
    defaultValues: target
      ? {
        name: target.name,
      }
      : {},
  });
  const queryClient = useQueryClient();

  const createWorkspace = useMutation({
    mutationFn: (data: Inputs) => {
      return workspaceApi.createWorkspace(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      onClose();
    },
    onError: (e: unknown) => {
      setError("name", { message: (e as Error).message });
    },
  });

  const renameWorkspace = useMutation({
    mutationFn: (data: { id: number; name: string }) => {
      return workspaceApi.updateWorkspace(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      onClose();
    },
    onError: (e: unknown) => {
      setError("name", { message: (e as Error).message });
    },
  });

  const onSubmit = (data: Inputs) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    if (target) {
      renameWorkspace.mutate({ id: target.id, name: data.name });
      return;
    }
    createWorkspace.mutate(data);
  };

  return (
    <Modal
      title={target ? "Rename workspace" : "Create workspace"}
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
              <Input {...field} placeholder="Workspace name" defaultValue="" />
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

export default CreateWorkspaceModal;
