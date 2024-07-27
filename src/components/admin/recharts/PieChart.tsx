import { Typography } from "antd";
const { Text } = Typography;

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
const data = [
  { name: "Group B", value: 130245, title: "Android" },

  { name: "Group A", value: 176542, title: "Iphone" },
];

const COLORS = ["#EC008C", "#0154A0"];

const PieChartComponent = () => {
  return (
    <div className="w-full h-full  max-w-[392px] max-md:max-w-full">
      <div className="flex justify-between max-md:flex-col gap-4">
        <Text className="font-semibold text-[14px]">Top Devices</Text>
      </div>
      <div className="h-[80%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              dataKey="value"
            >
              <Label
                width={30}
                position="center"
                content={
                  <CustomLabel
                    viewBox={{ cx: 0, cy: 0 }}
                    value1={"2"}
                    value2={" Devices"}
                  />
                }
              ></Label>

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-around items-center">
        {data.map((item, index) => (
          <div key={index} className="flex  items-center justify-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex flex-col ">
              <Text className="leading-5 font-medium text[14px]">
                {item.title}
              </Text>
              <Text className="text-[#888888] text[12px]">
                {item.value.toLocaleString()}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;

function CustomLabel({
  viewBox,
  value1,
  value2,
}: {
  viewBox: {
    cx: number;
    cy: number;
  };
  value1?: string;
  value2?: string;
}) {
  const { cx, cy } = viewBox;
  return (
    <>
      <text
        x={cx}
        y={cy - 5}
        fill="rgba(0, 0, 0, 0.87)"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="24px" fontWeight={600}>
          {value1}
        </tspan>
      </text>
      <text
        x={cx}
        y={cy + 20}
        fill="#333333"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="14px">{value2}</tspan>
      </text>
    </>
  );
}
