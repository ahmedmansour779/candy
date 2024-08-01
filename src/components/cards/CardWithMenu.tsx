/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  StarFilled,
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
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { fetchAddToStar } from "../../api/amt/workspace/AddToStar";
import { fetchRemoveFrStar } from "../../api/amt/workspace/RemoveFrStar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
export default function CardWithMenu({
  item,
}: {
  item: {id:string, name: string; file_size: number; link:string, type:string };
}) {
  const shareModal = useDisclosure();
  const renameModal = useDisclosure();

  const starred = useSelector((state: RootState) => state.starred);
  console.log(starred);
  const eleInStar = starred.find((ele:any)=>+(ele?.id)===+(item.id))
  // console.log(eleInStar)

  const dispatch = useDispatch()
  const AddOrRemoveStarr = ()=>{
    if(eleInStar){
      fetchRemoveFrStar(item.id,dispatch)
    }
    else{
      fetchAddToStar(item.id,dispatch)
    }
  }

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
      label: eleInStar ? "Remove to starred"  : "Add to starred",
      key: "3",
      icon: eleInStar ? <StarFilled/> : <StarOutlined />,
      onClick: () => AddOrRemoveStarr(),
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
  
  Fancybox.bind(`[data-fancybox="gallery"]`, {
    contentClick: "toggleCover",
    Images: {
      Panzoom: {
        panMode: "mousemove",
        mouseMoveFactor: 1.1,
        mouseMoveFriction: 0.12,
      },
    },
  });
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
          <a href={`https://angeloai.co/${item.link}`} data-fancybox={`gallery`}>
            <div className="h-fit cursor-pointer flex flex-col  overflow-hidden rounded-2xl">
              <div className="h-[125px] w-full max-md:h-[200px]">
                {
                  item.type === "video" ? 
                  <video src={`https://angeloai.co/${item.link}`} className="w-full h-full object-cover" controls></video>
                  :
                  <img
                    className="w-full h-full object-cover "
                    alt="example"
                    src={`https://angeloai.co/${item.link}` || fileImage}
                  />
                }
              </div>
              <div
                className={`flex flex-col items-center justify-center w-full gap-2 p-2 px-2 duration-150 ${
                  isDropdownVisible ? "bg-[#0154A01A]" : "bg-white"
                }`}
              >
                <div className="leading-none flex-center gap-2 ">
                  {
                    item.type === "video" ? <PlayCircleFilled className="text-primary-600 text-2xl" />
                    :null
                  }
                  <Text className="text-primary-500">
                    {truncate(item.name, { length: 20 })}
                  </Text>
                </div>
                <Text className="text-gray-600">
                  {convertBytes(item.file_size)}
                </Text>
              </div>
            </div>
          </a>
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
