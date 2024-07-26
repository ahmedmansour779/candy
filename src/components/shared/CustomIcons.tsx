// import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { SVGProps } from "react";

export const HomeIcon = ({ classNames }: { classNames?: string }) => (
  <i>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames}
      // width={props.width ?? 24}
      // height={props.height ?? 24}
      // fill="none"
    >
      <path
        // stroke={props.fill ?? "#0154A0"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .62.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  </i>
);
