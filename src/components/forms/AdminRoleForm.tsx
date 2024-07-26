import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useMutation } from "@tanstack/react-query";
import { Flex, Form, Input, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import rolesApi from "../../api/admin/rolesApi";
import { AddRole, Role } from "../../types/backend";
import CheckBoxWrapper from "../UI/CheckBoxWrapper";
import InputWrapper from "../UI/InputWrapper";

interface Inputs {
  name: string;
  description: string;
  type: string;
  default: number;
  guests: number;
  internal?: number;
}

export interface ChildComponentHandle {
  childFunction: () => void;
}
interface Props {
  target?: Role;
  setIsLoading: (value: boolean) => void;
}

const AdminRoleForm = forwardRef<ChildComponentHandle, Props>(
  ({ target, setIsLoading }: Props, ref) => {
    useImperativeHandle(ref, () => ({
      childFunction,
    }));
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<Inputs>({
      resolver: yupResolver(
        yup.object({
          name: yup.string().required().label("Required"),
          description: yup.string().label("Required"),
          type: yup.string().required().label("Required"),
          isDefault: yup.number().label("Required"),
          isGuest: yup.number().label("Required"),
        })
      ),
      defaultValues: target
        ? {
          ...target,
          default: target.default ? 1 : 0,
          guests: target.guests ? 1 : 0,
        }
        : {
          default: 0,
          guests: 0,
        },
    });

    const childFunction = useCallback(() => {
      handleSubmit(onSubmit)();
    }, []);
    //@ts-expect-error: IJob error
    const addMutation = useMutation((data: Inputs) => rolesApi.addRole(data));
    const editMutation = useMutation((data: Inputs) => {
      return rolesApi.updateRole(target?.id as number, data as AddRole);
    });

    useEffect(() => {
      setIsLoading(addMutation.isLoading || editMutation.isLoading);
    }, [addMutation, editMutation, setIsLoading]);

    const onSubmit = (data: Inputs) => {
      if (target) {
        editMutation.mutate(data);
        return;
      }
      addMutation.mutate(data);
    };

    console.log(errors);

    return (
      <Form
        layout="vertical"
        onFinish={() => {
          handleSubmit(onSubmit)();
        }}
      >
        {" "}
        <Flex
          style={{ marginTop: "1rem", flexDirection: "column" }}
          gap={"0.5rem"}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Name"}>
                <Input
                  {...field}
                  placeholder="Enter name"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Description"}>
                <TextArea
                  rows={8}
                  {...field}
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <InputWrapper
                title={"Type"}
                desc="Whether this role will be assigned to users globally on the site or only within workspaces.
              "
              >
                <Flex className="w-full">
                  <Select
                    {...field}
                    placeholder="Select Type"
                    className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-3 [&>.ant-select-selector]:!py-3       "
                    options={[
                      { value: "sitewide", label: "SiteWide" },
                      { value: "workspace", label: "WorkSpace" },
                    ]}
                  ></Select>
                </Flex>
              </InputWrapper>
            )}
          />

          <Controller
            name="default"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Default"}
                desc="Assign this role to new users automatically.
                "
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="guests"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Guests"}
                desc="Assign this role to guests (not logged in users).
                "
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
        </Flex>
      </Form>
    );
  }
);

export default AdminRoleForm;
