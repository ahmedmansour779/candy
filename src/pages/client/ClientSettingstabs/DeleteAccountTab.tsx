import SettingHeader from "../../../components/SettingHeader";
import { Button, Flex } from "antd";

const DeleteAccountTab = () => {
  const onSubmit = () => {
    ("Enabled");
  };
  return (
    <>
      <SettingHeader title="Danger Zone" />
      <Flex className="w-full max-md:flex-col-reverse ">
        <Button
          onClick={onSubmit}
          type="primary"
          danger
          className="max-md:w-full h-fit py-2 px-4"
        >
          Delete Account
        </Button>
      </Flex>
    </>
  );
};

export default DeleteAccountTab;
