import { Dropdown, MenuProps, Typography } from "antd";
const { Text } = Typography;
import {
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FolderAddOutlined,
  LinkOutlined,
  PlayCircleFilled,
  StarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { truncate } from "lodash";
import { convertBytes } from "../../utils/helpers";
import useDisclosure from "../../hooks/useDisclosure";
import ShareFileModal from "../modals/ShareFileModal";
import { useState } from "react";
import RenameFileModal from "../modals/RenameFileModal";
import fileImage from "../../assets/images/Frame 427319331.png";
export default function CardWithMenu({
  item,
}: {
  item: { name: string; file_size: number };
}) {
  const shareModal = useDisclosure();
  const renameModal = useDisclosure();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: "Preview",
      key: "0",
      icon: <EyeOutlined />,
    },
    {
      label: "Share",
      key: "1",
      icon: <UserAddOutlined />,
      onClick: () => shareModal.onOpen(),
    },
    {
      label: "Get link",
      key: "2",
      icon: <LinkOutlined />,
    },
    {
      label: "Add to starred",
      key: "3",
      icon: <StarOutlined />,
    },
    {
      label: "Move to",
      key: "4",
      icon: <FolderAddOutlined />,
    },
    {
      label: "Rename",
      key: "5",
      icon: <EditOutlined />,
      onClick: () => renameModal.onOpen(),
    },
    {
      label: "Make a copy",
      key: "6",
      icon: <CopyOutlined />,
    },
    {
      label: "Download",
      key: "7",
      icon: <DownloadOutlined />,
    },
    {
      label: "Delete",
      key: "8",
      icon: <DeleteOutlined />,
    },
  ];
  return (
    <>
      <Dropdown
        trigger={["contextMenu"]}
        onOpenChange={(e) => {
          setIsDropdownVisible(e);
        }}
        menu={{ items }}
        overlayStyle={{
          minWidth: "auto",
        }}
      >
        <div className="h-fit flex flex-col  overflow-hidden rounded-2xl">
          <div className="h-[125px] w-full max-md:h-[200px]">
            <img
              className="w-full h-full object-cover "
              alt="example"
              src={fileImage}
            />
          </div>
          <div
            className={`flex items-center justify-between w-full p-4 duration-150 ${
              isDropdownVisible ? "bg-[#0154A01A]" : "bg-white"
            }`}
          >
            <div className="leading-none flex-center gap-2 ">
              <PlayCircleFilled className="text-primary-600 text-2xl" />
              <Text className="text-primary-500">
                {truncate(item.name, { length: 20 })}
              </Text>
            </div>
            <Text className="text-gray-600">
              {convertBytes(item.file_size)}
            </Text>
          </div>
        </div>
      </Dropdown>
      {shareModal.open && (
        <ShareFileModal
          open={shareModal.open}
          onClose={shareModal.onClose}
        ></ShareFileModal>
      )}
      {renameModal.open && (
        <RenameFileModal
          open={renameModal.open}
          onClose={renameModal.onClose}
        ></RenameFileModal>
      )}
    </>
  );
}
