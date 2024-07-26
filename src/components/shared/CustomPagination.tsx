import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, PaginationProps, TablePaginationConfig } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";

const CustomPagination = (
  params: TablePaginationConfig
): TablePaginationConfig => {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    ...params,
    itemRender: ItemRender,
    onChange: (page: number) => {
      setSearchParams({ page: String(page) });
    },
    pageSizeOptions: undefined,
    showSizeChanger: false,
    current: Number(searchParams.get("page")) || 1,
  };
};
export const ItemRender: PaginationProps["itemRender"] = (
  current,
  type,
  originalElement
) => {
  if (type === "prev") {
    return (
      <Button iconPosition="start" icon={<ArrowLeftOutlined />}>
        Previous
      </Button>
    );
  }
  if (type === "next") {
    return (
      <Button iconPosition="end" icon={<ArrowRightOutlined />}>
        Next
      </Button>
    );
  }
  if (type === "page") {
    return <a>{current}</a>;
  }
  return <div>{originalElement}</div>;
};

export default CustomPagination;
