import React from "react";
import PageHeading from "../../components/PageHeading";
import { Flex, Segmented, Select } from "antd";
import BriefInfo from "./components/BriefInfo";
import HomelineChart from "./components/HomelineChart";
import HomePieChart from "./components/HomePieChart";

import fileIcon from "../../assets/icons/file_icon.svg";
import folderIcon from "../../assets/icons/folder_icon.svg";
import usersIcon from "../../assets/icons/users_icon.svg";
import spaceIcon from "../../assets/icons/space_icon.svg";

const BriefItems = [
  {
    title: "New Files",
    value: "11,930",
    icon: fileIcon,
  },
  {
    title: "New Folder",
    value: "872",
    icon: folderIcon,
  },
  {
    title: "New Users",
    value: "134",
    icon: usersIcon,
  },
  {
    title: "Total Space ",
    value: "1.4 GB",
    icon: spaceIcon,
  },
];

const index = () => {
  return (
    <div className="p-8">
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
      <BriefInfo items={BriefItems} />
      <Flex gap={24} className="mt-6 max-md:flex-col">
        <HomelineChart />
        <HomePieChart />
      </Flex>
    </div>
  );
};

export default index;
