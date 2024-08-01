/* eslint-disable react-hooks/exhaustive-deps */
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
import { BellIcon, DataIcon } from "../../icons/icons";
import { WorkSpace } from "../../types/backend";
import DeleteModal from "../modals/DeleteModal";
import AddMemberModal from "../modals/AddMember";

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
  const addMemberModal = useDisclosure(); // Add state for AddMemberModal
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
                      {
                        label: "Add a member",
                        key: "3",
                        onClick: () => {
                          setTarget(item);
                          addMemberModal.onOpen(); // Open AddMemberModal
                        },
                      },
                    ],
                    onClick: (key) => key,
                  }}
                  destroyPopupOnHide={false}
                  trigger={["click"]}
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

  const handleAddMember = (values: { emails: string[] }) => {
    // Assuming you need to process each email separately
    values.emails.forEach((email) => {
      console.log("Inviting member with email:", email);
      // Add your logic to handle each email here
    });
  };

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
                <Flex key={index} justify="space-between" align="center">
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
        {
          <AddMemberModal
            open={addMemberModal.open}
            onClose={addMemberModal.onClose}
            handleOk={handleAddMember}
            addIsLoading={false}
          />
        }
      </div>
    </div>
  );
}

export default HomeHead;

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
