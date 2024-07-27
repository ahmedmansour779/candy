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
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import filesApi from "../../api/filesApi";
import SidebarFolders from "./SidebarFolders";

import BottomMenuCurve from "../../assets/images/bottom-side.png";
import TopMenuCurve from "../../assets/images/top-side.png";
import { TrashIcon } from "../../icons/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setCatchFile } from "../../store/slices/GlobalSlice";

interface FileWithNewProperty extends File {
  newProperty: string;
}

export default function SliderContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch()
  const isAdminLink = location.pathname.includes("admin");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log("acceptedFiles", acceptedFiles);

    //this part is for testing (progressbar on upload a file)

    dispatch(setCatchFile(acceptedFiles));

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


