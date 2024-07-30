import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
    const cook = Cookies.get("user")
    return (
        cook ? <Outlet/> : <Navigate to={"login"} />
    );
}

export default ProtectRoute;