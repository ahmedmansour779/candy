import { Divider, Flex, Segmented, Typography } from "antd";
import Page from "../../components/shared/Page";
import { useState } from "react";
import { annualPricingData, monthlyPricingData } from "../../utils/cardsData";
import PricingCard from "../../components/cards/PricingCard";

const { Text, Title } = Typography;
export default function Pricing() {
  return (
    <Page docTitle="Pricing" className="py-8 px-4 leading-none ">
      <PricingComponent />
    </Page>
  );
}
export const PricingComponent = ({
  showTitle = true,
}: {
  showTitle?: boolean;
}) => {
  const [pircing, setPircing] = useState(PricingTypes.monthly);

  return (
    <>
      <div className="text-center">
        {" "}
        {showTitle && (
          <>
            <Title className="text-3xl font-semibold">Pricing plans</Title>
            <Text className="text-[#888888] text-sm">
              Simple, transparent pricing that grows with you. Try any plan free
              for 30 days.
            </Text>
          </>
        )}
        <Segmented
          rootClassName="pricing-segment p-2 rounded-2xl mt-8 gap-2 bg-primary-light !rounded-[24px]"
          className="min-w-[288px]"
          size="large"
          options={[PricingTypes.monthly, PricingTypes.annual]}
          onChange={(e) => {
            setPircing(e);
          }}
        />
      </div>
      <Divider />
      <Flex gap={32} className="max-md:flex-col justify-center">
        {pircing === PricingTypes.monthly ? (
          <MonthlyPricing />
        ) : (
          <AnnualPricing />
        )}
      </Flex>
    </>
  );
};

export enum PricingTypes {
  monthly = "Monthly billing",
  annual = "Annual billing",
}

const MonthlyPricing = () => {
  return (
    <>
      {monthlyPricingData.map((item, i) => (
        <PricingCard
          key={i}
          dataUsage={item.dataUsage}
          popular={item.popular}
          perPrice={item.perPrice}
        />
      ))}
    </>
  );
};
const AnnualPricing = () => {
  return (
    <>
      {annualPricingData.map((item, i) => (
        <PricingCard
          key={i}
          dataUsage={item.dataUsage}
          popular={item.popular}
          perPrice={item.perPrice}
          type="annual"
        />
      ))}
    </>
  );
};
