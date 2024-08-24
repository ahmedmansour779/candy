/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  DeleteFilled
} from "@ant-design/icons";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import SidebarFolders from "./SidebarFolders";

import BottomMenuCurve from "../../assets/images/bottom-side.png";
import TopMenuCurve from "../../assets/images/top-side.png";
import { TrashIcon } from "../../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setCatchFile } from "../../store/slices/GlobalSlice";
import { addFiles } from "../../api/amt/files/addFilesApi";



export default function SliderContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch()
  const isAdminLink = location.pathname.includes("admin");

  const [data, setData] = useState<string | null>(null);

  const workspace:any = useSelector((state:RootState)=>state.workspace)
  // console.log("workspace => 1",workspace)
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("workspace => 2",workspace)
    const formData = new FormData();
    formData.append("workspaceId", `${workspace.id}`);
    formData.append("owner_id", `${workspace.owner_id}`);

    // Object.entries(acceptedFiles).forEach((file: any) => {
      formData.append("file", acceptedFiles[0]);
    // })

    dispatch(setCatchFile(acceptedFiles));
    addFiles(setData,formData);
  }, [workspace]);


  const { open } = useDropzone({
    onDrop,
  });


  const inputRef:any = useRef(null);

  const handleFolderSelect = (event:any) => {
    const files = event.target.files;
    console.log("Selected files:", files);
  };

  const uploadButtonItems: MenuProps["items"] = [
    {
      label: <Text>Upload File</Text>,
      key: "1",
      icon: <FileOutlined />,
      onClick: () => open(),
    },
    {
      label: 
      <div>
        <label htmlFor="folderInput">
          <button onClick={() => inputRef.current.click()}>Upload Folder</button>
        </label>
        <input
          type="file"
          id="folderInput"
          ref={inputRef}
          multiple
          style={{ display: 'none' }}
          onChange={handleFolderSelect}
          onClick={() => inputRef.current.setAttribute('webkitdirectory', 'true')}/>
      </div>,
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
    <div className="flex flex-col h-full px-6 overflow-y-scroll gap-9">
      <div className="flex cursor-pointer" onClick={() => navigate("/drive")}>
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
          <div className="flex gap-1 p-3 text-xs leading-none cursor-pointer bg-primary-light text-primary-500 rounded-2xl">
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

      <div className="flex flex-col gap-3">
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
        <Button onClick={()=>navigate("/drive/starred")}
          type="link"
          className="p-0 flex items-center justify-start gap-2 text-sm font-medium text-[#888888]"
        >
          <StarFilled />
          <Text>Starred</Text>
        </Button>
        <Button
          type="link"
          className="p-0 z-50 flex items-center justify-start gap-2 text-sm font-medium text-[#888888]"
        >
          <DeleteFilled/>
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


