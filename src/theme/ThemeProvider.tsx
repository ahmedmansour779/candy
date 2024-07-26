import { ConfigProvider } from "antd";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#0154A0",
        fontFamily: "Poppins, sans-serif",
        lineHeight: 1,
      },

      components: {
        Segmented: {
          itemColor: "#344054",
          itemActiveBg: "#111111",
          itemSelectedBg: "#0154A0",
          itemSelectedColor: "#FFFFFF",
          fontWeightStrong: 500,
          controlPaddingHorizontal: 17,
          trackBg: "#fff",
          borderRadius: 0,
        },
        Button: {
          defaultBorderColor: "transparent",
        },
        Table: {
          headerBg: "#EAEBF0",
          headerColor: "#888888",
          cellPaddingBlock: 24,
        },
        Tabs: {
          itemSelectedColor: "#ffffff",
          itemColor: "#888888",
        },
        Switch: {
          handleSize: 16,
          trackHeight: 21,
          trackMinWidth: 40,
        },
        Radio: {
          radioSize: 20,
          dotSize: 5,
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
