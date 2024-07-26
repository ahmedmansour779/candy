import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button, Flex, Form, Input, Select, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import SettingHeader from "../../../components/SettingHeader";
import CheckBoxWrapper from "../../../components/UI/CheckBoxWrapper";
import InputWrapper from "../../../components/UI/InputWrapper";
import { PAYMENT_METHODS } from "../../../constants/paymentMethods";
import { SubscriptionSettings } from "../../../types/backend";

interface Inputs {
  enable_subscription: number;
  "billing->paypal->enable": boolean;
  paypal_client_id: string;
  paypal_secret: string;
  paypal_gateway: string;
  paypal_webhook_id: string;
  paypal_test_mode: number;
  stripe_gateway: number;
  stripe_publishable_key: string;
  stripe_secret_key: string;
  stripe_webhook_signing_secret: string;
  accepted_cards: number[];
}

const subscriptionSchema = yup.object({
  enable_subscription: yup.number().label("Enable Subscription"),
  paypal_gateway: yup.number().label("PayPal Gateway"),
  paypal_client_id: yup.string().label("PayPal Client ID"),
  paypal_secret: yup.string().label("PayPal Secret"),
  paypal_webhook_id: yup.string().label("PayPal Webhook ID"),
  paypal_test_mode: yup.boolean().label("PayPal Test Mode"),
  stripe_gateway: yup.boolean().label("Stripe Gateway"),
  stripe_publishable_key: yup
    .string()
    .label("Stripe Publishable Key")
    .required(),
  stripe_secret_key: yup.string().label("Stripe Secret Key"),
  stripe_webhook_signing_secret: yup
    .string()
    .label("Stripe Webhook Signing Secret")
    .required(),
  view_status: yup.number().label("View Status"),
  accepted_cards: yup.array().of(yup.number()).label("Accepted Cards"),
});

const SubscriptionTab = ({
  data,
  // onSave,
  // isLoading,
}: {
  data: SubscriptionSettings;
  onSave: (data: Inputs) => void;
  isLoading: boolean;
}) => {
  const { handleSubmit, control, reset } = useForm<Inputs>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: { ...data },
  });
  const onSubmit = (data: Inputs) => {
    data;
  };
  return (
    <div className="">
      <SettingHeader
        title="Subscriptions"
        info="Configure gateway integration, accepted cards, invoices and other related settings."
      />
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
            name="enable_subscription"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Enable Subscriptions"}
                desc="Enable or disable all subscription related functionality across the site."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="paypal_gateway"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"PayPal Gateway"}
                desc="Enable PayPal payment gateway integration."
              >
                <Switch
                  checked={field.value == "1"}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="paypal_client_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"PayPal Client ID"}>
                <Input
                  {...field}
                  placeholder="Enter Paypal Client ID"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="paypal_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"PayPal Secret"}>
                <Input
                  {...field}
                  placeholder="Enter Paypal Secret"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="paypal_webhook_id"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"PayPal Webhook ID"}>
                <Input
                  {...field}
                  placeholder="Enter Paypal Webhook ID"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="paypal_test_mode"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"PayPal Test Mode"}
                desc="Allows testing PayPal payments with sandbox accounts."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />
          <Controller
            name="stripe_gateway"
            control={control}
            render={({ field }) => (
              <CheckBoxWrapper
                title={"Stripe gateway"}
                desc="Enable Stripe payment gateway integration."
              >
                <Switch
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e ? 1 : 0)}
                />
              </CheckBoxWrapper>
            )}
          />

          <Controller
            name="stripe_publishable_key"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Stripe publishable key"}>
                <Input
                  {...field}
                  placeholder="Enter Stripe publishable key"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="stripe_secret_key"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Stripe secret key"}>
                <Input
                  {...field}
                  placeholder="Enter Stripe secret key"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />

          <Controller
            name="stripe_webhook_signing_secret"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Stripe webhook signing secret"}>
                <Input
                  {...field}
                  placeholder="Enter Stripe webhook signing secret"
                  className=" rounded-2xl border-none py-3 px-3"
                />
              </InputWrapper>
            )}
          />
          <Controller
            name="accepted_cards"
            control={control}
            render={({ field }) => (
              <InputWrapper title={"Primary Site URL"}>
                <Select
                  {...field}
                  mode="tags"
                  size="middle"
                  defaultValue={1}
                  placeholder="Add new Card..."
                  className="flex-1 h-auto w-full  [&>.ant-select-selector]:!border-none [&>.ant-select-selector]:!px-4 [&>.ant-select-selector]:!py-2 [&>.ant-select-selector]:!min-h-14      "
                  options={PAYMENT_METHODS}
                ></Select>
              </InputWrapper>
            )}
          />
        </Flex>
        <Flex
          gap={12}
          justify="end"
          className="w-full max-md:flex-col-reverse "
        >
          <Button
            className="max-md:w-full h-fit py-2 px-4"
            onClick={() => {
              reset();
            }}
          >
            {" "}
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            className="max-md:w-full h-fit py-2 px-4"
          >
            {" "}
            Save
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default SubscriptionTab;
