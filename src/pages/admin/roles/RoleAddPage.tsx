import React, { useRef, useState } from "react";
import AdminRoleForm, {
  ChildComponentHandle,
} from "../../../components/forms/AdminRoleForm";
import PageHeading from "../../../components/PageHeading";
import { Button } from "antd";

const RoleAddPage: React.FC = () => {
  const childRef = useRef<ChildComponentHandle>(null);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleClick = () => {
    if (childRef.current) {
      childRef.current.childFunction();
    }
  };
  return (
    <div className="p-8">
      <PageHeading title={"Add new role"}>
        <div className="flex h-full">
          {" "}
          <Button
            loading={isBtnLoading}
            onClick={handleClick}
            type="primary"
            className="h-full"
          >
            Save
          </Button>
        </div>
      </PageHeading>
      <AdminRoleForm setIsLoading={setIsBtnLoading} ref={childRef} />
    </div>
  );
};

export default RoleAddPage;
