import { useParams } from "react-router-dom";
import AdminUsersForm from "../../../components/forms/AdminUsersForm";
import { useQuery } from "@tanstack/react-query";
import usersApi from "../../../api/admin/usersApi";

const UserEditPage = () => {
  const { id } = useParams();
  const userData = useQuery({
    queryKey: ["users"],
    queryFn: () => usersApi.showUser(Number(id)),
  });

  return userData.data?.data && <AdminUsersForm target={userData.data.data} />;
};

export default UserEditPage;
