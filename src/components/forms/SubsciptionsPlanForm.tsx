import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  // Collapse,
  // Typography,
  Flex,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  useEffect,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import plansApi from "../../api/admin/plansApi";
import { AddPlan, Plan } from "../../types/backend";
import PageHeading from "../PageHeading";
import CheckBoxWrapper from "../UI/CheckBoxWrapper";
import InputWrapper from "../UI/InputWrapper";

const { Option } = Select;
// const { Text } = Typography;

interface Feature {
  value: string;
}

interface Pricing {
  amount: number;
  currency: number;
  interval: number;
  interval_count?: string;
}

interface Inputs {
  name: string;
  description: string;
  position: number;
  available_space: number;
  recommended: boolean;
  hidden: boolean;
  free: boolean;
  featureList: Feature[];
  prices?: Pricing[];
}

const SubsciptionsPlanForm = ({ target }: { target?: Plan }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required().label("Required"),
        description: yup.string().required().label("Required"),
        position: yup.number().required().label("Required"),
        available_space: yup.number().required().label("Required"),
        recommended: yup.boolean().required().label("Required"),
        hidden: yup.boolean().required().label("Required"),
        free: yup.boolean().required().label("Required"),
        features: yup.array().of(
          yup.object().shape({
            value: yup.string().required("Feature is required"),
          })
        ),
        // pricings: yup.array().of(
        //   yup.object().shape({
        //     amount: yup.number().required("Amount is required"),
        //     currency: yup.number().required("Currency is required"),
        //     billingPeriod: yup.number().required("Billing period is required"),
        //     customBillingPeriod: yup.string().when("billingPeriod", {
        //       is: 7,
        //       then: yup.string().required("Custom billing period is required"),
        //     }),
        //   })
        // ),
      })
    ),
    defaultValues: target
      ? {
        ...target,
      }
      : {},
  });

  const {
    fields: features,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "featureList",
  });

  // const {
  //   fields: pricings,
  //   append: appendPricing,
  //   remove: removePricing,
  // } = useFieldArray({
  //   control,
  //   name: "pricings",
  // });

  // const [activePanels, setActivePanels] = useState<string[]>([]);

  useEffect(() => {
    if (target) {
      reset({
        featureList: target.feature_list.map((feature) => ({ value: feature })),
        ...target,
      });
    }
  }, [target, reset]);

  const addFeature = () => {
    appendFeature({ value: "" });
  };

  // const addPricing = () => {
  //   appendPricing({ amount: 0, currency: 1, billingPeriod: 1 });
  // };
  const addMutation = useMutation({
    mutationFn: (data: AddPlan) => {
      return plansApi.addPlan(data as AddPlan);
    },
    onSuccess: () => {
      navigate("/admin/subscriptions-plans");
    },
  });
  const editMutation = useMutation({
    mutationFn: (data: AddPlan) => {
      return plansApi.updatePlan(target?.id as number, data as AddPlan);
    },
    onSuccess: () => {
      navigate("/admin/subscriptions-plans");
    },
  });

  const onSubmit = (data: Inputs) => {
    const dataReq = {
      ...data,
      feature_list: data.featureList.map((feature) => feature.value),
    };

    if (target) {
      editMutation.mutate(dataReq as AddPlan);
      return;
    }
    addMutation.mutate(dataReq as AddPlan);
  };

  // const handleCollapseChange = (keys: string[]) => {
  //   setActivePanels(keys);
  // };
  console.log(errors);

  return (
    <div className="p-8">
      <PageHeading
        title={target ? `Edit "${target.name} plan"` : "Create new plan"}
      >
        <div className="flex h-full">
          <Button
            onClick={handleSubmit(onSubmit)}
            type="primary"
            className="h-full"
          >
            Save
          </Button>
        </div>
      </PageHeading>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Name"}>
                <Input
                  {...field}
                  placeholder="Enter name"
                  className="rounded-2xl border-none py-3 px-3"
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
                  className="rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Position in pricing table"}>
                <Select
                  {...field}
                  placeholder="Select Position"
                  className="w-full"
                >
                  {[...Array(5)].map((_, i) => (
                    <Option key={i} value={i + 1}>{`Position ${i + 1}`}</Option>
                  ))}
                </Select>
              </InputWrapper>
            )}
          />
          <Controller
            name="available_space"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Allowed storage space"}>
                <Input
                  {...field}
                  addonAfter={
                    <Select defaultValue="1">
                      <Option value="1">Bytes</Option>
                      <Option value="2">KB</Option>
                      <Option value="3">MB</Option>
                      <Option value="4">GB</Option>
                      <Option value="5">TB</Option>
                    </Select>
                  }
                  placeholder="Enter allowed storage space"
                  className="rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="recommended"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Recommended"}
                desc="Plan will be displayed more prominently on pricing page."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="hidden"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Hidden"}
                desc="Plan will not be shown on pricing or upgrade pages."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="free"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Free"}
                desc="Will be assigned to all users, if they are not subscribed already."
              >
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="featureList"
            control={control}
            render={() => (
              <InputWrapper title={"Feature list"} className="!items-start">
                {features.map((field, index) => (
                  <Flex
                    key={field.id}
                    align="center"
                    gap={8}
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    <Controller
                      name={`featureList.${index}.value` as const}
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Enter feature" />
                      )}
                    />
                    <CloseOutlined
                      onClick={() => removeFeature(index)}
                      style={{ color: "#ff4d4f", fontSize: "1.2rem" }}
                    />
                  </Flex>
                ))}
                {features.length < 10 && (
                  <Button
                    type="text"
                    onClick={addFeature}
                    icon={<PlusOutlined />}
                    className="text-[#0154A0]"
                  >
                    Add New Feature
                  </Button>
                )}
              </InputWrapper>
            )}
          />
          {/* <Controller
            name="pricings"
            control={control}
            render={() => (
              <InputWrapper title={"Pricing list"} className="!items-start">
                {pricings.map((field, index) => (
                  <Flex
                    align="center"
                    gap={8}
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    {" "}
                    <Collapse
                      key={field.id}
                      activeKey={activePanels}
                      onChange={(keys) => {
                        console.log(keys);

                        handleCollapseChange(keys as string[]);
                      }}
                      style={{ marginBottom: "8px", flex: 1 }}
                    >
                      <Collapse.Panel
                        header={`$${field.amount} / Month`}
                        key={field.id}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                        >
                          <Controller
                            name={`pricings.${index}.amount` as const}
                            control={control}
                            render={({ field }) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                }}
                              >
                                <Text>Amount</Text>
                                <Input {...field} placeholder="Enter Amount" />
                              </div>
                            )}
                          />
                          <Controller
                            name={`pricings.${index}.currency` as const}
                            control={control}
                            render={({ field }) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                }}
                              >
                                <Text>Currency</Text>
                                <Select {...field} className="w-full">
                                  <Option value={1}>USD</Option>
                                  <Option value={2}>INR</Option>
                                  <Option value={3}>EUR</Option>
                                  <Option value={4}>GBP</Option>
                                  <Option value={5}>AUD</Option>
                                  <Option value={6}>CAD</Option>
                                  <Option value={7}>JPY</Option>
                                </Select>
                              </div>
                            )}
                          />
                          <Controller
                            name={`pricings.${index}.billingPeriod` as const}
                            control={control}
                            render={({ field }) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                }}
                              >
                                <Text>Billing period</Text>
                                <Select
                                  {...field}
                                  className="w-full"
                                  onChange={(value) => {
                                    field.onChange(value);
                                    reset({
                                      pricings: pricings.map((pricing, idx) =>
                                        idx === index
                                          ? { ...pricing, billingPeriod: value }
                                          : pricing
                                      ),
                                    });
                                    if (!activePanels.includes(field.id)) {
                                      setActivePanels([
                                        ...activePanels,
                                        field.id,
                                      ]);
                                    }
                                  }}
                                >
                                  <Option value={1}>Monthly</Option>
                                  <Option value={2}>Yearly</Option>
                                </Select>
                              </div>
                            )}
                          />
                          {watch(`pricings.${index}.billingPeriod`) === 7 && (
                            <Controller
                              name={
                                `pricings.${index}.customBillingPeriod` as const
                              }
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Enter custom billing period"
                                />
                              )}
                            />
                          )}
                        </div>
                      </Collapse.Panel>
                    </Collapse>
                    <CloseOutlined
                      onClick={() => removePricing(index)}
                      style={{ color: "#ff4d4f", fontSize: "1.2rem" }}
                    />
                  </Flex>
                ))}
                {pricings.length < 2 && (
                  <Button
                    type="text"
                    onClick={addPricing}
                    icon={<PlusOutlined />}
                    className="text-[#0154A0]"
                  >
                    Add New Price
                  </Button>
                )}
              </InputWrapper>
            )}
          /> */}
        </div>
      </Form>
    </div>
  );
};

export default SubsciptionsPlanForm;
