import React from "react";
import { Flex, Table, Tag, Typography } from "antd";
import playIcon from "../../assets/icons/play-icon.svg";

const { Column } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  owner: string;
  tags: string[];
  edit_date: string;
  format: string;
}

const data: DataType[] = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    owner: "Mirna Atef",
    tags: ["nice", "developer"],
    edit_date: "2022-12-12",
    format: "pdf",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    owner: "Mirna Atef",
    tags: ["loser"],
    edit_date: "2022-12-12",
    format: "mp4",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    owner: "Mirna Atef",
    tags: ["cool", "teacher"],
    edit_date: "2022-12-12",
    format: "mp3",
  },
];

const MyFoldersTable = () => {
  return (
    <Table
      pagination={{ position: ["none"] }}
      dataSource={data}
      className="home_table"
      scroll={{ x: 700 }}
    >
      <Column
        render={() => (
          <Flex align="center" gap={"0.5rem"}>
            <img src={playIcon as string} />
            <Typography>Game of Thrones.mp4</Typography>
          </Flex>
        )}
        title="Name file"
        dataIndex="age"
        key="age"
      />
      <Column title="Owners" dataIndex="owner" key="owner" />
      <Column title="Last Edit File" dataIndex="edit_date" key="edit_date" />
      <Column
        title="Members"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        )}
      />
      <Column title="Format" dataIndex="format" key="format" />
    </Table>
  );
};

export default MyFoldersTable;
