import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/slices/userSlice";

// import { HomeIcon } from "../shared/CustomIcons";

function HeaderContent({
  setIsNavCollapsed,
}: {
  setIsNavCollapsed: (value: boolean) => void;
}) {
  const location = useLocation();
  const properItems: { link: string; icon: JSX.Element }[] =
    location.pathname.includes("admin") ? adminItems : clientItems;

  const dispatch = useDispatch()
  const myUrl = useNavigate()
  const logout = () => {
    Cookies.remove("user")
    dispatch(removeUser())
    myUrl("/login")
  };
  return (
    <div className="overflow-y-scroll h-full">
      <div className="flex px-5 justify-center sm:flex-col sm:justify-between items-center gap-[15px] sm:gap-[30px] h-full">
        <div className="flex sm:flex-col gap-[15px] sm:gap-[30px]  items-center">
          {properItems.map(({ link, icon }, index) => (
            <Link to={link} key={index}>
              <IconItem
                handleClick={() => {
                  setIsNavCollapsed(true);
                }}
                icon={icon}
                link={link}
                location={location.pathname}
              />
            </Link>
          ))}
        </div>
        <button onClick={()=>logout()}>
          <IconItem link="none" icon={<ExitIcon />} />
        </button>
      </div>
    </div>
  );
}

export default HeaderContent;

const IconItem = ({
  link,
  icon,
  location,
  handleClick,
}: {
  link?: string;
  icon: JSX.Element;
  location?: string;
  handleClick?: () => void;
}) => {
  const isCurrent = location === link;

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer w-[44px] h-[44px] hover:bg-white rounded-xl transition-all flex-center stroke-white hover:stroke-primary-500 ${isCurrent && "bg-white !stroke-primary-500 "
        }`}
    >
      {icon}
    </div>
  );
};

const clientItems: { link: string; icon: JSX.Element }[] = [
  {
    link: "drive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[24px] h-[24px]"
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .62.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },

  {
    link: "drive/chat",
    icon: (
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 6.25H15.5M6.5 9.25H11M1.25 10.76C1.25 12.36 2.373 13.754 3.957 13.987C5.086 14.153 6.227 14.28 7.38 14.366C7.73 14.392 8.05 14.576 8.245 14.867L11 19L13.755 14.867C13.8516 14.7233 13.9798 14.6034 14.1297 14.5166C14.2795 14.4298 14.4472 14.3783 14.62 14.366C15.7652 14.2805 16.9069 14.1541 18.043 13.987C19.627 13.754 20.75 12.361 20.75 10.759V4.741C20.75 3.139 19.627 1.746 18.043 1.513C15.711 1.17072 13.357 0.99926 11 1C8.608 1 6.256 1.175 3.957 1.513C2.373 1.746 1.25 3.14 1.25 4.741V10.759V10.76Z"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    link: "drive/pricing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 4v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C11.536 10.219 10.768 10 10 10c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    link: "drive/settings",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.59396 3.94C9.68396 3.398 10.154 3 10.704 3H13.297C13.847 3 14.317 3.398 14.407 3.94L14.62 5.221C14.683 5.595 14.933 5.907 15.265 6.091C15.339 6.131 15.412 6.174 15.485 6.218C15.81 6.414 16.205 6.475 16.56 6.342L17.777 5.886C18.0264 5.79221 18.301 5.78998 18.5518 5.87971C18.8027 5.96945 19.0136 6.14531 19.147 6.376L20.443 8.623C20.576 8.8537 20.6229 9.12413 20.5753 9.38617C20.5277 9.6482 20.3887 9.88485 20.183 10.054L19.18 10.881C18.887 11.122 18.742 11.494 18.75 11.873C18.7514 11.958 18.7514 12.043 18.75 12.128C18.742 12.506 18.887 12.878 19.18 13.119L20.184 13.946C20.608 14.296 20.718 14.901 20.444 15.376L19.146 17.623C19.0128 17.8536 18.8022 18.0296 18.5515 18.1195C18.3008 18.2094 18.0263 18.2074 17.777 18.114L16.56 17.658C16.205 17.525 15.81 17.586 15.484 17.782C15.4115 17.8261 15.3381 17.8688 15.264 17.91C14.933 18.093 14.683 18.405 14.62 18.779L14.407 20.06C14.317 20.603 13.847 21 13.297 21H10.703C10.153 21 9.68396 20.602 9.59296 20.06L9.37996 18.779C9.31796 18.405 9.06796 18.093 8.73596 17.909C8.66181 17.8681 8.58846 17.8258 8.51596 17.782C8.19096 17.586 7.79596 17.525 7.43996 17.658L6.22296 18.114C5.97369 18.2075 5.69933 18.2096 5.44866 18.1199C5.19799 18.0302 4.98727 17.8545 4.85396 17.624L3.55696 15.377C3.4239 15.1463 3.37701 14.8759 3.42462 14.6138C3.47223 14.3518 3.61125 14.1152 3.81696 13.946L4.82096 13.119C5.11296 12.879 5.25796 12.506 5.25096 12.128C5.2494 12.043 5.2494 11.958 5.25096 11.873C5.25796 11.493 5.11296 11.122 4.82096 10.881L3.81696 10.054C3.6115 9.88489 3.47264 9.64843 3.42503 9.38662C3.37743 9.12481 3.42418 8.8546 3.55696 8.624L4.85396 6.377C4.98715 6.14614 5.19797 5.97006 5.44887 5.88014C5.69977 5.79021 5.97445 5.79229 6.22396 5.886L7.43996 6.342C7.79596 6.475 8.19096 6.414 8.51596 6.218C8.58796 6.174 8.66196 6.132 8.73596 6.09C9.06796 5.907 9.31796 5.595 9.37996 5.221L9.59396 3.94Z"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];
const adminItems: { link: string; icon: JSX.Element }[] = [
  {
    link: "/admin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M1 11.125C1 10.504 1.504 10 2.125 10h2.25c.621 0 1.125.504 1.125 1.125v6.75C5.5 18.496 4.996 19 4.375 19h-2.25A1.125 1.125 0 0 1 1 17.875v-6.75Zm6.75-4.5c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V6.625Zm6.75-4.5c0-.621.504-1.125 1.125-1.125h2.25C18.496 1 19 1.504 19 2.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V2.125Z"
        />
      </svg>
    ),
  },
  {
    link: "/admin/users",
    icon: (
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 17.128C14.853 17.3757 15.7368 17.5009 16.625 17.5C18.0534 17.5021 19.4633 17.1764 20.746 16.548C20.7839 15.6517 20.5286 14.7675 20.0188 14.0293C19.509 13.2912 18.7724 12.7394 17.9207 12.4575C17.0691 12.1757 16.1487 12.1791 15.2992 12.4674C14.4497 12.7557 13.7173 13.313 13.213 14.055M14 17.128V17.125C14 16.012 13.714 14.965 13.213 14.055M14 17.128V17.234C12.0755 18.3931 9.87064 19.0038 7.62402 19C5.29302 19 3.11202 18.355 1.25002 17.234L1.24902 17.125C1.24826 15.7095 1.71864 14.3339 2.58601 13.2153C3.45338 12.0966 4.6684 11.2984 6.03951 10.9466C7.41063 10.5948 8.85985 10.7093 10.1587 11.2721C11.4575 11.8349 12.5321 12.814 13.213 14.055M11 4.375C11 5.27011 10.6444 6.12855 10.0115 6.76149C9.37857 7.39442 8.52013 7.75 7.62502 7.75C6.72992 7.75 5.87147 7.39442 5.23854 6.76149C4.6056 6.12855 4.25002 5.27011 4.25002 4.375C4.25002 3.47989 4.6056 2.62145 5.23854 1.98851C5.87147 1.35558 6.72992 1 7.62502 1C8.52013 1 9.37857 1.35558 10.0115 1.98851C10.6444 2.62145 11 3.47989 11 4.375ZM19.25 6.625C19.25 7.32119 18.9735 7.98887 18.4812 8.48116C17.9889 8.97344 17.3212 9.25 16.625 9.25C15.9288 9.25 15.2612 8.97344 14.7689 8.48116C14.2766 7.98887 14 7.32119 14 6.625C14 5.92881 14.2766 5.26113 14.7689 4.76884C15.2612 4.27656 15.9288 4 16.625 4C17.3212 4 17.9889 4.27656 18.4812 4.76884C18.9735 5.26113 19.25 5.92881 19.25 6.625Z"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    link: "/admin/roles",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={22}
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 11h3.75M6 14h3.75M6 17h3.75m3 .75H15a2.25 2.25 0 0 0 2.25-2.25V5.108c0-1.135-.845-2.098-1.976-2.192a48.396 48.396 0 0 0-1.123-.08m0 0c.066.215.1.439.099.664a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75c0-.231.035-.454.1-.664m5.801 0A2.252 2.252 0 0 0 12 1.25h-1.5a2.25 2.25 0 0 0-2.15 1.586m0 0c-.376.023-.75.05-1.124.08C6.095 3.01 5.25 3.973 5.25 5.108V7.25m0 0H1.875C1.254 7.25.75 7.754.75 8.375v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V8.375c0-.621-.504-1.125-1.125-1.125H5.25ZM3.75 11h.008v.008H3.75V11Zm0 3h.008v.008H3.75V14Zm0 3h.008v.008H3.75V17Z"
        />
      </svg>
    ),
  },
  {
    link: "/admin/subscriptions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 4v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C11.536 10.219 10.768 10 10 10c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    link: "/admin/subscriptions-plans",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={22}
        fill="none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 11h3.75M6 14h3.75M6 17h3.75m3 .75H15a2.25 2.25 0 0 0 2.25-2.25V5.108c0-1.135-.845-2.098-1.976-2.192a48.396 48.396 0 0 0-1.123-.08m0 0c.066.215.1.439.099.664a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75c0-.231.035-.454.1-.664m5.801 0A2.252 2.252 0 0 0 12 1.25h-1.5a2.25 2.25 0 0 0-2.15 1.586m0 0c-.376.023-.75.05-1.124.08C6.095 3.01 5.25 3.973 5.25 5.108V7.25m0 0H1.875C1.254 7.25.75 7.754.75 8.375v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V8.375c0-.621-.504-1.125-1.125-1.125H5.25ZM3.75 11h.008v.008H3.75V11Zm0 3h.008v.008H3.75V14Zm0 3h.008v.008H3.75V17Z"
        />
      </svg>
    ),
  },
  {
    link: "/admin/settings",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.59396 3.94C9.68396 3.398 10.154 3 10.704 3H13.297C13.847 3 14.317 3.398 14.407 3.94L14.62 5.221C14.683 5.595 14.933 5.907 15.265 6.091C15.339 6.131 15.412 6.174 15.485 6.218C15.81 6.414 16.205 6.475 16.56 6.342L17.777 5.886C18.0264 5.79221 18.301 5.78998 18.5518 5.87971C18.8027 5.96945 19.0136 6.14531 19.147 6.376L20.443 8.623C20.576 8.8537 20.6229 9.12413 20.5753 9.38617C20.5277 9.6482 20.3887 9.88485 20.183 10.054L19.18 10.881C18.887 11.122 18.742 11.494 18.75 11.873C18.7514 11.958 18.7514 12.043 18.75 12.128C18.742 12.506 18.887 12.878 19.18 13.119L20.184 13.946C20.608 14.296 20.718 14.901 20.444 15.376L19.146 17.623C19.0128 17.8536 18.8022 18.0296 18.5515 18.1195C18.3008 18.2094 18.0263 18.2074 17.777 18.114L16.56 17.658C16.205 17.525 15.81 17.586 15.484 17.782C15.4115 17.8261 15.3381 17.8688 15.264 17.91C14.933 18.093 14.683 18.405 14.62 18.779L14.407 20.06C14.317 20.603 13.847 21 13.297 21H10.703C10.153 21 9.68396 20.602 9.59296 20.06L9.37996 18.779C9.31796 18.405 9.06796 18.093 8.73596 17.909C8.66181 17.8681 8.58846 17.8258 8.51596 17.782C8.19096 17.586 7.79596 17.525 7.43996 17.658L6.22296 18.114C5.97369 18.2075 5.69933 18.2096 5.44866 18.1199C5.19799 18.0302 4.98727 17.8545 4.85396 17.624L3.55696 15.377C3.4239 15.1463 3.37701 14.8759 3.42462 14.6138C3.47223 14.3518 3.61125 14.1152 3.81696 13.946L4.82096 13.119C5.11296 12.879 5.25796 12.506 5.25096 12.128C5.2494 12.043 5.2494 11.958 5.25096 11.873C5.25796 11.493 5.11296 11.122 4.82096 10.881L3.81696 10.054C3.6115 9.88489 3.47264 9.64843 3.42503 9.38662C3.37743 9.12481 3.42418 8.8546 3.55696 8.624L4.85396 6.377C4.98715 6.14614 5.19797 5.97006 5.44887 5.88014C5.69977 5.79021 5.97445 5.79229 6.22396 5.886L7.43996 6.342C7.79596 6.475 8.19096 6.414 8.51596 6.218C8.58796 6.174 8.66196 6.132 8.73596 6.09C9.06796 5.907 9.31796 5.595 9.37996 5.221L9.59396 3.94Z"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12Z"
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];

const ExitIcon = () => (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.25 7V3.25C7.25 2.65326 7.48705 2.08097 7.90901 1.65901C8.33097 1.23705 8.90326 1 9.5 1H15.5C16.0967 1 16.669 1.23705 17.091 1.65901C17.5129 2.08097 17.75 2.65326 17.75 3.25V16.75C17.75 17.3467 17.5129 17.919 17.091 18.341C16.669 18.7629 16.0967 19 15.5 19H9.5C8.90326 19 8.33097 18.7629 7.90901 18.341C7.48705 17.919 7.25 17.3467 7.25 16.75V13M11 7L14 10M14 10L11 13M14 10H1.25"
      strokeWidth="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
