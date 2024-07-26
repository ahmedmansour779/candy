import { Button, Dropdown, Image, MenuProps, Typography } from "antd";
import Logo from "../../../src/assets/images/logo@2x.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
const { Text } = Typography;

import {
  ClockCircleFilled,
  DownOutlined,
  ShareAltOutlined,
  StarFilled,
  PlusCircleOutlined,
  FileOutlined,
  FolderOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import SidebarFolders from "./SidebarFolders";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import filesApi from "../../api/filesApi";

import TopMenuCurve from "../../assets/images/top-side.png";
import BottomMenuCurve from "../../assets/images/bottom-side.png";

interface FileWithNewProperty extends File {
  newProperty: string;
}

export default function SliderContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLink = location.pathname.includes("admin");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);

    // Mutate the uploaded file here
    const modifiedFiles: FileWithNewProperty[] = acceptedFiles.map((file) => {
      // Example mutation
      const modifiedFile: FileWithNewProperty = {
        ...file,
        newProperty: "someValue",
      };
      return modifiedFile;
    });

    // Do something with the modified files
    storeFile.mutate({ file: modifiedFiles[0] });
  }, []);
  const storeFile = useMutation({
    mutationFn: (data: { file: File }) => {
      return filesApi.storeFileEntry(data);
    },
  });

  const { open } = useDropzone({
    onDrop,
  });

  const uploadButtonItems: MenuProps["items"] = [
    {
      label: <Text>Upload File</Text>,
      key: "1",
      icon: <FileOutlined />,
      onClick: () => open(),
    },
    {
      label: "Upload folder",
      key: "2",
      icon: <FolderOutlined />,
    },
    {
      label: "Create new folder",
      key: "3",
      icon: <FolderAddOutlined />,
    },
  ];

  return (
    <div className="px-6 flex flex-col h-full gap-9">
      {/* <div className="demo-logo-vertical" /> */}
      <div className="cursor-pointer flex" onClick={() => navigate("/drive")}>
        <Image src={Logo} preview={false} width={130} />
      </div>
      <div className="flex items-center gap-4">
        <Image
          preview={false}
          src={`https://i.pravatar.cc/300/?img=12`}
          alt=""
          className="rounded-full !w-10"
        />
        <Dropdown menu={{ items: itemsmenu }} trigger={["click"]}>
          <div className="bg-primary-light text-primary-500 leading-none p-3 rounded-2xl text-xs gap-1 flex cursor-pointer">
            {isAdminLink ? "Admin" : "My Workspace"}
            <DownOutlined />
          </div>
        </Dropdown>
      </div>

      <Dropdown menu={{ items: uploadButtonItems }} trigger={["click"]}>
        <Button
          type="primary"
          style={{ padding: "10px 16px", height: "auto" }}
          icon={<PlusCircleOutlined />}
        >
          Create New
        </Button>
      </Dropdown>

      <SidebarFolders />
      <div className="flex flex-col gap-6">
        <Button
          type="link"
          className="p-0 flex items-center justify-start gap-2 text-sm font-medium text-[#888888]"
        >
          <ShareAltOutlined />
          <Text className="text-[#222E57]">Shared with me</Text>
        </Button>
        <Button
          type="link"
          className="p-0 flex items-center justify-start gap-2 text-sm font-medium text-[#888888]"
        >
          <ClockCircleFilled />
          <Text>Recent</Text>
        </Button>
        <Button
          type="link"
          className="p-0 flex items-center justify-start gap-2 text-sm font-medium text-[#888888]"
        >
          <StarFilled />
          <Text>Starred</Text>
        </Button>
        <Button
          type="link"
          className="p-0 flex items-center justify-start gap-2 text-sm font-medium text-[#888888]"
        >
          <TrashIcon />
          <Text>Trash</Text>
        </Button>
      </div>
      <div className="absolute top-0 left-0 w-28 max-lg:hidden">
        <img src={TopMenuCurve}></img>
      </div>
      <div className="absolute bottom-0 left-0 w-28 max-lg:hidden">
        <img src={BottomMenuCurve}></img>
      </div>
    </div>
  );
}
const itemsmenu: MenuProps["items"] = [
  {
    label: <Link to="/drive">My workspace</Link>,
    key: "1",
  },
  {
    label: <Link to="admin">Admin</Link>,
    key: "2",
  },
];

const TrashIcon = () => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="none"
    className="fill-[#888888] me-2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790175 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790175 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.05L1.865 13.15C1.90218 13.5199 2.0754 13.8628 2.35107 14.1123C2.62675 14.3617 2.98523 14.4999 3.357 14.5H8.642C9.01394 14.5001 9.37267 14.3621 9.64856 14.1126C9.92444 13.8631 10.0978 13.5201 10.135 13.15L10.95 5H11.25C11.4489 5 11.6397 4.92098 11.7803 4.78033C11.921 4.63968 12 4.44891 12 4.25C12 4.05109 11.921 3.86032 11.7803 3.71967C11.6397 3.57902 11.4489 3.5 11.25 3.5H9V2.75C9 2.15326 8.76295 1.58097 8.34099 1.15901C7.91903 0.737053 7.34674 0.5 6.75 0.5H5.25C4.65326 0.5 4.08097 0.737053 3.65901 1.15901C3.23705 1.58097 3 2.15326 3 2.75ZM5.25 2C5.05109 2 4.86032 2.07902 4.71967 2.21967C4.57902 2.36032 4.5 2.55109 4.5 2.75V3.5H7.5V2.75C7.5 2.55109 7.42098 2.36032 7.28033 2.21967C7.13968 2.07902 6.94891 2 6.75 2H5.25ZM4.05 5.5C4.14852 5.49502 4.24705 5.50952 4.33996 5.54268C4.43286 5.57584 4.51832 5.627 4.59142 5.69323C4.66453 5.75946 4.72385 5.83946 4.76599 5.92865C4.80813 6.01784 4.83226 6.11447 4.837 6.213L5.112 11.713C5.11933 11.9101 5.04872 12.1022 4.91546 12.2476C4.7822 12.393 4.59702 12.4801 4.40002 12.4899C4.20302 12.4998 4.01007 12.4317 3.86295 12.3003C3.71583 12.1689 3.62639 11.9849 3.614 11.788L3.339 6.288C3.33388 6.18956 3.34821 6.09107 3.38118 5.99818C3.41416 5.90528 3.46511 5.8198 3.53115 5.74661C3.59718 5.67343 3.677 5.61397 3.76603 5.57166C3.85506 5.52934 3.95155 5.50499 4.05 5.5ZM7.95 5.5C8.04844 5.50487 8.14496 5.52909 8.23404 5.57129C8.32312 5.61349 8.403 5.67283 8.46913 5.74592C8.53525 5.81901 8.58632 5.90442 8.61942 5.99726C8.65251 6.09011 8.66698 6.18856 8.662 6.287L8.387 11.787C8.37461 11.9839 8.28517 12.1679 8.13805 12.2993C7.99093 12.4307 7.79798 12.4988 7.60098 12.4889C7.40398 12.4791 7.2188 12.392 7.08554 12.2466C6.95228 12.1012 6.88167 11.9091 6.889 11.712L7.164 6.212C7.17409 6.01354 7.26253 5.82719 7.4099 5.69389C7.55727 5.56058 7.75152 5.49021 7.95 5.5Z"
    />
  </svg>
);
