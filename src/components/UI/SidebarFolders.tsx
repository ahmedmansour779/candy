import { useQuery } from "@tanstack/react-query";
import { Menu, MenuProps } from "antd";
import foldersApi from "../../api/foldersApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  }, [folders.isLoading]);

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

const FolderIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.75 3.5C3.28587 3.5 2.84075 3.68437 2.51256 4.01256C2.18437 4.34075 2 4.78587 2 5.25V8.51C2.52239 8.17577 3.12984 7.99875 3.75 8H16.25C16.894 8 17.495 8.188 18 8.51V7.25C18 6.78587 17.8156 6.34075 17.4874 6.01256C17.1592 5.68437 16.7141 5.5 16.25 5.5H11.414C11.3811 5.50006 11.3486 5.49364 11.3182 5.48112C11.2879 5.46859 11.2603 5.4502 11.237 5.427L9.823 4.013C9.49499 3.68476 9.05004 3.50023 8.586 3.5H3.75ZM3.75 9.5C3.28587 9.5 2.84075 9.68437 2.51256 10.0126C2.18437 10.3408 2 10.7859 2 11.25V15.75C2 16.716 2.784 17.5 3.75 17.5H16.25C16.7141 17.5 17.1592 17.3156 17.4874 16.9874C17.8156 16.6592 18 16.2141 18 15.75V11.25C18 10.7859 17.8156 10.3408 17.4874 10.0126C17.1592 9.68437 16.7141 9.5 16.25 9.5H3.75Z"
      fill="#888888"
    />
  </svg>
);

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
