/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Grid, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import "../../index.css";
import HeaderContent from "../UI/HeaderContent";
import SliderContent from "../UI/SliderContent";

const { useBreakpoint } = Grid;

const headerWidth = "84px";
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "100vh",
  width: headerWidth,
};

const siderStyle: React.CSSProperties = {
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#fff",
};

const layoutStyle = {
  overflow: "hidden",
  minHeight: "100vh",
};
export default function LayoutPage() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isSliderCollapsed, setIsSliderCollapsed] = useState(false);

  const { xs , sm } = useBreakpoint();

  return (
    <Layout style={layoutStyle} className={`bg-secondary-500 font-sans `}>
      <Layout
        style={{ minHeight: "100vh" }}
        className={`bg-[#FAFAFB] ms[${headerWidth}] ${isSliderCollapsed ? "ps-[85px]" : "ps-[320px]"
          } max-sm:ps-0 `}
      >
        {" "}
        <Flex className="fixed top-0 left-0 z-10">
          <Sider
            // style={headerStyle}
            breakpoint="lg"
            collapsedWidth="0"
            reverseArrow={true}
            // width={84}
            className=" !bg-[#0154a0]  max-lg:!order-1 !min-w-full h-16 bottom-0 sm:h-[100vh] sm:!min-w-[84px] sm:!max-w-[84px] max-md:!fixed max-sm:right-0 z-50"
            collapsed={xs && isNavCollapsed}
            onCollapse={(collapsed) => {
              setIsNavCollapsed(collapsed);
              setIsSliderCollapsed(true);
            }}
            collapsible={true}
          >
            <HeaderContent setIsNavCollapsed={setIsNavCollapsed} />
          </Sider>
          <Sider
            style={siderStyle}
            breakpoint="lg"
            collapsedWidth="0"
            width={235}
            collapsed={xs && isSliderCollapsed}
            className="h-lvh py-12 font-sans pb-20 sm:pb-12 max-md:!fixed max-sm:left-0 max-sm:h-screen z-10 relative"
            onCollapse={(collapsed) => {
              setIsSliderCollapsed(collapsed);
              setIsNavCollapsed(true);
            }}
          >
            <SliderContent />
          </Sider>
        </Flex>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
