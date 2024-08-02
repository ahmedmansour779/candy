import PageHeading from "../../components/PageHeading";
import { Segmented, Select } from "antd";
import BriefInfo from "./components/BriefInfo";


import HorizontalBarChartComponent from "../../components/admin/recharts/BarChart";
import PieChartComponent from "../../components/admin/recharts/PieChart";
import LineChartComponent from "../../components/admin/recharts/LineChart";
import GeoChart from "../../components/admin/recharts/GeoChart";
import { useEffect, useState } from "react";
import { briefINfoAllInOne } from "../../api/amt/briefInfo/briefInfoApi";


const index = () => {
  const [briefItems, setBriefItems] = useState<any>(null);
  useEffect(() => {
    briefINfoAllInOne(setBriefItems);
  }, [])



  return (
    <div className="p-8 mb-16 sm:mb-0 ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
      <PageHeading title="Visitors Report">
        <div className="flex h-full">
          {" "}
          <Segmented<string>
            options={["Month", "Week", "Year"]}
            className="
            [&>.ant-segmented-group]:h-full
           
            "
            onChange={(value) => {
              value; // string
            }}
          />
          <Select
            defaultValue="Custom"
            style={{ width: 120 }}
            defaultActiveFirstOption={true}
            className="
            [&>.ant-select-selector]:!border-none 
            [&>.ant-select-selector]:rounded-none 
            h-full
            "
            options={[
              { value: 1, label: "option1" },
              { value: 2, label: "option2" },
            ]}
          />
        </div>
      </PageHeading>
      {
        briefItems && <BriefInfo items={briefItems} />
      }
      <div className="grid grid-cols-1 gap-4 my-4 lg:grid-cols-2">
        <div className="h-full w-full p-4 rounded-lg shadow bg-white">
          <LineChartComponent />
        </div>
        <div className="h-full w-full p-4 rounded-lg shadow bg-white">
          <PieChartComponent />
        </div>
        <div className="h-full w-full p-4 rounded-lg shadow bg-white">
          <HorizontalBarChartComponent />
        </div>
        <div className="h-full w-full p-4 rounded-lg shadow bg-white">
          <GeoChart />
        </div>
      </div>

    </div>
  );
};

export default index;
