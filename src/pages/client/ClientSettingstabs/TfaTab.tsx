import SettingHeader from "../../../components/SettingHeader";
import { Button, Flex } from "antd";

const TfaTab = () => {
  const onSubmit = () => {
    ("Enabled");
  };
  return (
    <>
      <SettingHeader
        title="Two Factor Authentication"
        info="When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application."
      />
      <Flex gap={12} justify="end" className="w-full max-md:flex-col-reverse ">
        <Button
          onClick={onSubmit}
          type="primary"
          className="max-md:w-full h-fit py-2 px-4"
        >
          Enable
        </Button>
      </Flex>
    </>
  );
};

export default TfaTab;
