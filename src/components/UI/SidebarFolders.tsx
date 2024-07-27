import { useQuery } from "@tanstack/react-query";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import foldersApi from "../../api/foldersApi";
import { FolderIcon } from "../../icons/icons";

export default function SidebarFolders() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const folders = useQuery({
    queryKey: ["fileEntries"],
    queryFn: () => {
      return foldersApi.getFolders();
    },
  });

  useEffect(() => {
    const arr: MenuItem[] = [];
    if (!folders.data) {
      //@ts-expect-error: IJob error

      folders?.data?.folders.forEach((item) => {
        if (item.parent_id && arr.length !== 0) {
          const targetedItem = findItemByKey(arr, item.parent_id);
          if (targetedItem) {
            // @ts-expect-error TODO
            targetedItem.children = [
              // @ts-expect-error TODO
              ...(targetedItem.children || []),
              {
                key: item.id,
                label: item.name,
                hash: item.hash,
                icon: <FolderIcon />,
              },
            ];
          }
        } else {
          arr.push({
            key: String(item.id),
            label: item.name,
            // @ts-expect-error TODO
            hash: item.hash,
            icon: <FolderIcon />,
          });
        }
      });
    }

    setMenuItems([
      {
        key: "0",
        label: "My Files",
        children: arr,
      },
    ]);
  }, [folders.data, folders.isLoading]);

  return (
    <div className="leading-none">
      <Menu
        style={{
          borderInlineEnd: "none",
        }}
        mode="inline"
        // openKeys={stateOpenKeys}
        // onOpenChange={onOpenChange}
        onClick={(e) => {
          // @ts-expect-error TODO
          const item = findItemByKey(menuItems[0].children, e.key);
          //@ts-expect-error TODO
          navigate(`/folders/${item?.hash}`);
        }}
        onAuxClick={(e) => {
          e;
        }}
        items={menuItems}
      />
    </div>
  );
}


type MenuItem = Required<MenuProps>["items"][number];
// @ts-expect-error TODO
function findItemByKey(items, key): MenuItem | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.key == key) {
      return item;
    }
    if (item.children) {
      const foundInChildren: MenuItem = findItemByKey(item.children, key);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
}
