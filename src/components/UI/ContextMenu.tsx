import { Dropdown, Menu, MenuProps } from "antd";

const inActive = "invisible hidden  opacity-0 z-50";
const active = "visible absolute opacity-100 z-50";
const ContextMenu = ({
  rightClick,
  positionX,
  positionY,
  isToggled,
  items,
  contextMenuRef,
}: {
  rightClick: boolean;
  positionX: number;
  positionY: number;
  isToggled: boolean;
  items: MenuProps["items"];
  contextMenuRef: any;
}) => {
  isToggled;

  return (
    <div ref={contextMenuRef}>
      <Menu
        style={{ top: positionY, left: positionX }}
        className={isToggled ? active : inActive}
        items={items}
      ></Menu>
    </div>
  );
};

export default ContextMenu;
