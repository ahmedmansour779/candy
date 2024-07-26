import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Divider,
  Drawer,
  Dropdown,
  Flex,
  Image,
  Typography,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";
import workspaceApi from "../../api/workspaceApi";
import WorkspaceActive from "../../assets/icons/WorkspaceActive.svg";
import useDisclosure from "../../hooks/useDisclosure";
import SearchBar from "../cards/SearchBar";
import CreateWorkspaceModal from "../modals/CreateWorkspaceModal";

import Cookies from "js-cookie";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import docsIcon from "../../assets/icons/docs-icon.svg";
import downloadsIcon from "../../assets/icons/downloads-icon.svg";
import imagesIcon from "../../assets/icons/images-icon.svg";
import playIcon from "../../assets/icons/play-icon.svg";
import { WorkSpace } from "../../types/backend";
import DeleteModal from "../modals/DeleteModal";

const { useToken } = theme;
const data = [
  { name: "Group A", value: 16.2, title: "Videos", icon: playIcon },
  { name: "Group B", value: 12.1, title: "Images", icon: imagesIcon },
  { name: "Group c", value: 9, title: "Documents", icon: docsIcon },
  { name: "Group d", value: 5.1, title: "Other Files", icon: downloadsIcon },
  { name: "Group e", value: 7.6, title: "Free Space" },
];

const COLORS = ["#0154A0", "#56D6F3", "#7490F4", "#FF4F4F", "#F3F6F9"];
function HomeHead() {
  const { token } = useToken();
  const [workspaceItems, setWorkspaceItems] = useState<
    {
      key: number;
      label: JSX.Element;
      type?: "group" | "divider" | undefined;
    }[]
  >([]);
  const { open, onOpen, onClose } = useDisclosure();
  const storageClosure = useDisclosure();
  const deleteModal = useDisclosure();
  const [target, setTarget] = useState<WorkSpace | undefined>(undefined);

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
    width: "364px",
    padding: "24px",
  };

  const workspaces = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => {
      return workspaceApi.getWorkspaces();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => workspaceApi.deleteWorkspace(target?.id as number),
    onSuccess: () => {
      deleteModal.onClose();
      workspaces.refetch();
    },
  });

  useEffect(() => {
    // Get the cookie
    const myCookie = Cookies.get("activeWorkspaceId");
    myCookie; // Should log 'cookieValue'
  }, []);
  useEffect(() => {
    if (workspaces?.data) {
      const workspaceItemsMapping = workspaces?.data?.pagination.data?.map(
        (item) => {
          return {
            key: item.id,
            label: (
              <Flex
                justify="space-between"
                align="center"
                style={{
                  backgroundColor: item.id === 1 ? "#0154A00F" : "transparent",
                  padding: "1rem",
                }}
              >
                {" "}
                <Flex gap={"0.5rem"}>
                  <div style={{ width: "40px", height: "40px" }}>
                    {item.id === 1 && (
                      <img width={40} height={40} src={WorkspaceActive}></img>
                    )}
                  </div>

                  <Flex gap={"0.5rem"} style={{ flexDirection: "column" }}>
                    <Typography.Text
                      style={{ color: "#222E57", fontWeight: "500" }}
                    >
                      {item.name}
                    </Typography.Text>
                    <Typography.Text
                      style={{ color: "#888888", fontWeight: "500" }}
                    >
                      {item.members_count} Members
                    </Typography.Text>
                  </Flex>
                </Flex>{" "}
                <Dropdown
                  className="workspace_menu "
                  menu={{
                    items: [
                      {
                        label: "Rename",
                        key: "1",
                        onClick: () => {
                          setTarget(item);
                          onOpen();
                        },
                      },
                      {
                        label: "Delete",
                        key: "2",
                        onClick: () => {
                          setTarget(item);
                          deleteModal.onOpen();
                        },
                      },
                    ],
                    onClick: (key) => key,
                  }}
                  destroyPopupOnHide={false}
                  trigger={["hover"]}
                >
                  <Button
                    icon
                    type="text"
                    className="text-[#333333] font-semibold"
                  >
                    Manage
                  </Button>
                </Dropdown>
              </Flex>
            ),
          };
        }
      );
      workspaceItemsMapping.unshift({
        key: 0,
        label: (
          <Flex
            gap={"0.5rem"}
            style={{
              // backgroundColor: "#0154A00F",
              padding: "1rem",
            }}
          >
            <div style={{ width: "40px", height: "40px" }}>
              {/* <img width={40} height={40} src={WorkspaceActive}></img> */}
            </div>
            <Flex gap={"0.5rem"} style={{ flexDirection: "column" }}>
              <Typography.Text style={{ color: "#222E57", fontWeight: "500" }}>
                Default
              </Typography.Text>
              <Typography.Text style={{ color: "#888888", fontWeight: "500" }}>
                Personal Workspace
              </Typography.Text>
            </Flex>
          </Flex>
        ),
      });

      workspaceItemsMapping.push({
        key: workspaceItemsMapping.length,
        label: (
          <Button
            type="primary"
            style={{
              width: "100%",
              padding: "12px 16px",
              height: "auto",
              fontWeight: "500",
            }}
            onClick={onOpen}
          >
            Create New Workspace
          </Button>
        ),
      });
      workspaceItemsMapping;

      setWorkspaceItems(workspaceItemsMapping);
    }
  }, [workspaces.data]);

  return (
    <div className="leading-none mb-8 flex items-center w-full justify-between gap-2 lg:gap-8 ">
      <SearchBar />
      <div className="leading-none flex-center h-full">
        <Button
          onClick={() => storageClosure.onOpen()}
          type="link"
          className="stroke-primary-600 hover:stroke-primary-500"
        >
          <DataIcon />
        </Button>
        <Button
          type="link"
          className="stroke-primary-600 hover:stroke-primary-500"
        >
          <BellIcon />
        </Button>
        <Divider
          type="vertical"
          className=""
          style={{
            height: 24,
          }}
        />

        <Dropdown
          className="workspace_menu "
          menu={{
            //@ts-expect-error: items error
            items: workspaceItems,
            onClick: (key) => key,
          }}
          trigger={["click"]}
          destroyPopupOnHide={false}
          dropdownRender={(menu) => (
            <div className="workspace_menu" style={contentStyle}>
              {React.cloneElement(menu as React.ReactElement, {
                style: menuStyle,
              })}
            </div>
          )}
        >
          <Button type="text" className="text-[#333333] font-semibold">
            My Workspace
          </Button>
        </Dropdown>

        <Drawer
          className="rounded-t-3xl rounded-bl-3xl p-9"
          onClose={storageClosure.onClose}
          open={storageClosure.open}
        >
          {" "}
          <div className="h-48 ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                >
                  <Label
                    width={30}
                    position="center"
                    content={
                      <CustomLabel
                        viewBox={{ cx: 0, cy: 0 }}
                        value1={"42.4 GB"}
                        value2={" of 50 GB capacity"}
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
          <Flex vertical gap={16}>
            {" "}
            {data.map((entry, index, array) => {
              if (index === array.length - 1) return null;

              return (
                <Flex justify="space-between" align="center">
                  <Flex gap={16}>
                    <div
                      className={`w-10 h-10 rounded-xl flex justify-center items-center relative overflow-hidden `}
                    >
                      <div
                        className={`absolute w-full h-full left-0 top-0 bg-[${COLORS[index]}] opacity-15   `}
                      ></div>
                      <Image preview={false} src={entry.icon}></Image>
                    </div>
                    <Flex vertical justify="space-between">
                      <Typography.Text>{entry.title}</Typography.Text>
                      <Typography.Text className="text-[#888888]">
                        302 files
                      </Typography.Text>
                    </Flex>
                  </Flex>
                  <Typography.Text className="text-[#333333] text-base font-semibold">
                    {entry.value} GB
                  </Typography.Text>
                </Flex>
              );
            })}
          </Flex>
        </Drawer>
        {open && (
          <CreateWorkspaceModal
            open={open}
            onClose={() => {
              onClose();
              setTarget(undefined);
            }}
            target={target}
          ></CreateWorkspaceModal>
        )}

        {
          <DeleteModal
            title="Delete Workspace"
            description="Are you sure you want to delete this Workspace?"
            open={deleteModal.open}
            onClose={deleteModal.onClose}
            handleOk={deleteMutation.mutate}
            deleteIsLoading={deleteMutation.isLoading}
          />
        }
      </div>
    </div>
  );
}

export default HomeHead;

const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.857 15.082C14.7202 14.8614 16.5509 14.4217 18.311 13.772C16.8204 12.1208 15.9967 9.9745 16 7.75V7C16 5.4087 15.3679 3.88258 14.2427 2.75736C13.1174 1.63214 11.5913 1 10 1C8.40872 1 6.8826 1.63214 5.75738 2.75736C4.63216 3.88258 4.00002 5.4087 4.00002 7V7.75C4.00304 9.97463 3.17901 12.121 1.68802 13.772C3.42102 14.412 5.24802 14.857 7.14302 15.082M12.857 15.082C10.959 15.3071 9.04104 15.3071 7.14302 15.082M12.857 15.082C13.0011 15.5319 13.037 16.0094 12.9616 16.4757C12.8863 16.942 12.7019 17.384 12.4234 17.7656C12.145 18.1472 11.7803 18.4576 11.3592 18.6716C10.9381 18.8856 10.4724 18.9972 10 18.9972C9.52765 18.9972 9.06195 18.8856 8.64083 18.6716C8.21972 18.4576 7.85509 18.1472 7.57664 17.7656C7.29819 17.384 7.11379 16.942 7.03844 16.4757C6.96309 16.0094 6.99892 15.5319 7.14302 15.082M1.12402 5.5C1.40599 3.82497 2.15782 2.26444 3.29202 1M16.708 1C17.8422 2.26444 18.5941 3.82497 18.876 5.5"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DataIcon = () => (
  <svg
    width="18"
    height="22"
    viewBox="0 0 18 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.25 5.375C17.25 7.653 13.556 9.5 9 9.5C4.444 9.5 0.75 7.653 0.75 5.375M17.25 5.375C17.25 3.097 13.556 1.25 9 1.25C4.444 1.25 0.75 3.097 0.75 5.375M17.25 5.375V16.625C17.25 18.903 13.556 20.75 9 20.75C4.444 20.75 0.75 18.903 0.75 16.625V5.375M17.25 5.375V9.125M0.75 5.375V9.125M17.25 9.125V12.875C17.25 15.153 13.556 17 9 17C4.444 17 0.75 15.153 0.75 12.875V9.125M17.25 9.125C17.25 11.403 13.556 13.25 9 13.25C4.444 13.25 0.75 11.403 0.75 9.125"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

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
        <tspan alignmentBaseline="middle" fontSize="20px" fontWeight={600}>
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
