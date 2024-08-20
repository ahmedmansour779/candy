/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderIcon } from "../../icons/icons";
import { getFilesApi } from "../../api/amt/files/getFilesApi";

export interface Root {
  id: number;
  name: string;
  description: any;
  file_name: string;
  mime: any;
  file_size: number;
  user_id: any;
  parent_id: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  path: string;
  disk_prefix: any;
  type: string;
  extension: any;
  public: boolean;
  thumbnail: boolean;
  workspace_id: number;
  owner_id: number;
  hash: string;
  url: any;
  users: User[];
  tags: any[];
  permissions: any[];
}

interface User {
  id: number;
  name: string;
  email: string;
  // Define other properties of User if necessary
}

export default function SidebarFolders() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const [data, setData] = useState<Root[]>([]);

  useEffect(() => {
    getFilesApi(setData);
  }, []);

  useEffect(() => {
    const arr: MenuItem[] = [];
    if (data.length > 0) {
      data.forEach((item) => {
        if (item.parent_id && arr.length !== 0) {
          const targetedItem = findItemByKey(arr, String(item.parent_id));
          if (targetedItem && isSubMenu(targetedItem)) {
            targetedItem.children = [
              ...(targetedItem.children || []),
              {
                key: String(item.id),
                label: item.name,
                hash: item.hash,
                icon: <FolderIcon />,
              } as MenuItem,
            ];
          }
        } else {
          arr.push({
            key: String(item.id),
            label: item.name,
            hash: item.hash,
            icon: <FolderIcon />,
          } as MenuItem);
        }
      });
    }

    setMenuItems([
      {
        key: "0",
        label: "My Files",
        children: arr,
      } as MenuItem,
    ]);
  }, [data]);

  return (
    <div className="leading-none">
      <Menu
        style={{ borderInlineEnd: "none" }}
        mode="inline"
        onClick={(e) => {
          const item:any = menuItems[0];
          if (isSubMenu(item)) {
            const foundItem = findItemByKey(item.children, e.key);
            if (foundItem?.hash) {
              navigate(`/folders/${foundItem.hash}`);
            }
          }
        }}
        items={menuItems}
      />
    </div>
  );
}

type MenuItem = Required<MenuProps>["items"][number];

function isSubMenu(item: any): item is any & { children: any[] } {
  return 'children' in item;
}

function findItemByKey(items: any[], key: string): any | null {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.key === key) {
      return item;
    }
    if (isSubMenu(item)) {
      const foundInChildren = findItemByKey(item.children, key);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
}
