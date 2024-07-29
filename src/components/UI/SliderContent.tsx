import { Button, Dropdown, Image, MenuProps, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../src/assets/images/logo@2x.png";
const { Text } = Typography;

import {
  ClockCircleFilled,
  DownOutlined,
  FileOutlined,
  FolderAddOutlined,
  FolderOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SidebarFolders from "./SidebarFolders";

import BottomMenuCurve from "../../assets/images/bottom-side.png";
import TopMenuCurve from "../../assets/images/top-side.png";
import { TrashIcon } from "../../icons/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setCatchFile } from "../../store/slices/GlobalSlice";
import { addFiles } from "../../api/amt/files/addFilesApi";



export default function SliderContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch()
  const isAdminLink = location.pathname.includes("admin");

  const [data, setData] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("workspaceId", "15");
    formData.append("owner_id", "15");

    // Object.entries(acceptedFiles).forEach((file: any) => {
      formData.append("file", acceptedFiles[0]);
    // })

    dispatch(setCatchFile(acceptedFiles));
    addFiles(setData,formData);
  }, []);


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
    <div className="px-6 flex flex-col h-full gap-9 overflow-y-scroll">
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
          <Text> ent</Text>
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

      {/* These elements are now always visible */}
      <div className="absolute top-0 left-0 w-28">
        <img src={TopMenuCurve}></img>
      </div>
      <div className="absolute bottom-0 left-0 w-28">
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


