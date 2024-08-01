import React from 'react';
import fileIcon from "../../../assets/icons/file_icon.svg";
import folderIcon from "../../../assets/icons/folder_icon.svg";
import usersIcon from "../../../assets/icons/users_icon.svg";
import spaceIcon from "../../../assets/icons/space_icon.svg";
interface Item {
  name: string;
  currentValue: number;
  previousValue: number;
  Value: number;
  percentageChange: number;
}

interface ItemDisplay {
  title: string;
  value: string;
  icon: string;
  percentageChange?: number; // Optional field for percentage change
}

interface Items {
  files: Item[];
  folders: Record<string, Item>;
  users: Record<string, Item>;
  space: Record<string, Item>;
}

const BriefInfo: React.FC<{ items: Items }> = ({ items }) => {
  // Function to handle rendering of a single item
  const renderItem = (item: ItemDisplay, index: number) => (
    <div
      key={index}
      className="shadow bg-white rounded-lg p-4 flex flex-col gap-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center rounded-lg bg-slate-100 p-1">
          <img src={item.icon} alt="icon" className="w-6 h-6" />
        </div>
        <p className="h-fit flex justify-end bg-green-100 border border-green-300 p-1 rounded-lg shadow text-green-500">
          {item.percentageChange !== undefined ? `${item.percentageChange}%` : 'N/A'}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium leading-7">
          {item.value}
        </p>
        <p className="text-[12px] font-medium">{
          item.title?.toString().length>10 ? item.title?.toString().substring(0, 7) + '...' : item.title
          }</p>
      </div>
    </div>
  );

  // Convert items into a flat array of ItemDisplay
  const transformItems = (items: Items): ItemDisplay[] => {
    const result: ItemDisplay[] = [];

    // Handle files (array)
    if (Array.isArray(items.files)) {
      items.files.forEach(file => {
        result.push({
          title: file.name,
          value: file.Value.toString(),
          icon: fileIcon,
          percentageChange: file.percentageChange,
        });
      });
    }

    // Handle folders (object)
    Object.values(items.folders).forEach(folder => {
      result.push({
        title: folder.name,
        value: folder.Value.toString(),
        icon: folderIcon,
        percentageChange: folder.percentageChange,
      });
    });

    // Handle users (object)
    Object.values(items.users).forEach(user => {
      result.push({
        title: user.name,
        value: user.Value.toString(),
        icon: usersIcon,
        percentageChange: user.percentageChange,
      });
    });

    // Handle space (object)
    Object.values(items.space).forEach(space => {
      result.push({
        title: space.name,
        value: space.Value.toString(),
        icon: spaceIcon,
        percentageChange: space.percentageChange,
      });
    });

    return result;
  };

  // Transform items and render
  const itemDisplays = transformItems(items);

  return (
    <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 text-sm">
      {itemDisplays.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default BriefInfo;
