import { Button, Divider, Typography } from "antd";
import { PricingTypes } from "../../pages/client/Pricing";

const { Text } = Typography;
interface Props {
  children?: React.ReactNode;
  perPrice: string | number;
  dataUsage: string | number;
  popular?: boolean;
  type?: keyof typeof PricingTypes;
  action?: () => void;
}
export default function PricingCard({
  perPrice,
  dataUsage,
  popular,
  action,
  type = "monthly",
}: Props) {
  return (
    <div className="card-pricing w-full p-6 h-[300px] flex flex-col justify-between items-start">
      {popular && (
        <div className=" bg-[#0154A01A] text-primary-500 p-2 rounded-full w-fit text-xs">
          Most Popular
        </div>
      )}

      <div className="flex flex-col gap-2 items-start">
        <Text className="text-lg font-semibold">{dataUsage}GB</Text>
        <Text className="text-gray-500 text-sm text-start">
          {dataUsage}GB of space for secure storage
        </Text>
      </div>
      <div className="w-full">
        <div className="flex gap-2 items-center">
          <Text className="text-5xl font-semibold text-primary-500">
            ${Number(perPrice).toFixed(2)}
          </Text>
          <Text className="text-gray-500 text-sm text-start">
            per
            <br />
            {type === "monthly" ? "month" : "year"}
          </Text>
        </div>
        <Divider className="my-4" />
        <Button
          type="primary"
          block
          style={{
            height: 40,
          }}
          onClick={action}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
