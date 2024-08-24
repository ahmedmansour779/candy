import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const GoglbalRoute = () => {
    const cook = Cookies.get("user")
    return (
        cook ?  <Navigate to={"drive"} /> : <Outlet/> 
    );
}

export default GoglbalRoute;
