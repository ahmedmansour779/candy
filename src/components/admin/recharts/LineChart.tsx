import { Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import calendarIcon from "../../../assets/icons/calendar_icon.svg";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sep",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Oct",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Nov",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Dec",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const { Text } = Typography;
const LineChartComponent = () => { 
  return (
    <div className="w-full h-full">
      <div className="flex justify-between max-md:flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Text className="font-semibold text-[14px]">Page View</Text>
          <Text className="font-medium text-3xl leading-10">24,189</Text>
        </div>
        <div className="flex gap-1 items-center self-start">
          <img className="" src={calendarIcon} alt="" />
          <Text className=" ">Dec 10, 2022 - Dec 10,2023</Text>
        </div>
      </div>
      <div className="h-72 my-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1" />

            <XAxis dataKey="name" />
            <Line
              strokeWidth={2}
              type="monotone"
              dataKey="pv"
              stroke="#0154A0"
              dot={false}
            />
            <Line
              strokeWidth={2}
              dot={false}
              type="monotone"
              dataKey="uv"
              stroke="#888888"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-end  gap-2">
        <div className="flex  items-center justify-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#0154A0" }}
          />
          <Text className="leading-5 font-medium text[14px]">
            Current Period
          </Text>
        </div>
        <div className="flex  items-center justify-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#889197" }}
          />
          <Text className="leading-5 font-medium text[14px]">
            Previous Period
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
