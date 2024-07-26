import React from "react";
import SubsciptionsPlanForm from "../../../components/forms/SubsciptionsPlanForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import plansApi from "../../../api/admin/plansApi";

const SubsciptionsPlanEdit = () => {
  const { id } = useParams();
  const planData = useQuery({
    queryKey: ["users"],
    queryFn: () => plansApi.showplan(Number(id)),
  });
  return (
    planData.data?.product && (
      <SubsciptionsPlanForm target={planData.data.product} />
    )
  );
};

export default SubsciptionsPlanEdit;
