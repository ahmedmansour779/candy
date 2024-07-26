import qaEngineers from "../../assets/images/undraw_qa_engineers_dg-5-p.svg";
import Page from "./Page";
import { Typography } from "antd";

const { Title } = Typography;
export default function Error() {
  return (
    <Page docTitle="Something went wrong">
      <div className="py-20 m-auto text-center">
        <img
          src={qaEngineers}
          alt="Engineer"
          className="mb-8 w-[1070px] h-[780px]"
        />
        <Title level={2} color="red.600">
          Something went wrong
        </Title>
        <div className="text-2xl">
          Something went wrong, details can be found on browser console
          <br />
          Please contact site administrators.
        </div>
      </div>
    </Page>
  );
}
