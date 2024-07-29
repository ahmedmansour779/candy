import { SearchOutlined } from "@ant-design/icons";
import Input, { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";

const onSearch: SearchProps["onSearch"] = (value, _e, info) => (
  info?.source, value
);

export default function SearchBar() {
  return (
    <Input
      placeholder="Search here"
      allowClear
      size="large"
      // onSearch={onSearch}
      className="min-w-[100px] flex-1 rounded-[20px] p-4 border-none outline-none"
      prefix={
        <button onClick={() => "Custom action"}>
          <SearchOutlined
            style={{ color: "#888888", marginInlineEnd: ".7rem" }}
          />
        </button>
      }
      // enterButton={false}
    />
  );
}
