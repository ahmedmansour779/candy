import { Tag, Typography } from "antd";
import React from "react";

interface Item {
  title: string;
  value: string;
  icon: string;
}
interface Items {
  items: Item[];
}

const { Text } = Typography;

const BriefInfo = ({ items }: Items) => {
  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-6 ">
      {items.map((item: Item, index) => (
        <div
          key={index}
          className="p-5 flex justify-between bg-white rounded-lg"
        >
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 bg-[#0154A01A] flex justify-center items-center rounded-lg">
              <img src={item.icon} alt="" />
            </div>
            <div className="flex flex-col">
              <Text className="text-[18px] font-medium leading-7">
                {item.value}
              </Text>
              <Text className="text-[12px] font-medium">{item.title}</Text>
            </div>
          </div>
          <Tag color="green" className="h-fit self-end">
            7.2%
          </Tag>
        </div>
      ))}
    </div>
  );
};

export default BriefInfo;
