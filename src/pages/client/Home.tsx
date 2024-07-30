/* eslint-disable @typescript-eslint/no-unused-vars */
import Page from "../../components/shared/Page";
import Card1 from "../../components/cards/Card1";
import CardUpload from "../../components/cards/CardUpload";
import CardWithMenu from "../../components/cards/CardWithMenu";
import { Card1Icons } from "../../utils/cardsData";

import HomeHead from "../../components/UI/HomeHead";
import { Flex, Select, Typography } from "antd";
import SectionTitle from "../../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import MyFoldersTable from "../../components/tables/MyFoldersTable";
import filesApi from "../../api/filesApi";
import { BarChart, Bar, ResponsiveContainer, Rectangle, XAxis } from "recharts";

import uploadIcon from "../../assets/icons/upload_icon.svg";
import red from "../../assets/icons/download_icon.svg";

const { Text } = Typography;

const data = [
  { name: "Jan", pv: 110 },
  { name: "Feb", pv: 80 },
  { name: "Mar", pv: 110 },
  { name: "Apr", pv: 120 },
  { name: "May", pv: 100 },
  { name: "Jun", pv: 90 },
  { name: "Jul", pv: 110 },
];

export default function Home() {

  // this part is only for simulate file uploading
  const { catchFile } = useSelector((state: RootState) => state.GlobalReducer);

  const [filesType, setFilesType] = useState<string[]>([]);
  
  useEffect(() => {
    if (catchFile) {
      const newFilesType = Array.from(catchFile).map((item: any) => item.type?.split("/")[0]);
      setFilesType(newFilesType);
    }
  }, [catchFile]);
  





  const fileEntries = useQuery({
    queryKey: ["file_entries"],
    queryFn: () => {
      return filesApi.getFileEntries();
    },
  });

  return (
    <Page className="p-4">
      <HomeHead />

      <Flex gap={24} className="max-xl:flex-col">
        <Flex vertical gap={32} flex={1} className="w-full">
          <div className="grid grid-cols-3 max-lg:grid-cols-2    gap-6">
            {Card1Icons.map((item, i) => (
              <Card1 key={i} icon={item.icon} text={item.text} dataSize={12} />
            ))}
          </div>
          {/* <div className="flex flex-wrap gap-4 w-full">
            {fileEntries?.data?.data &&
              fileEntries?.data?.data.map((item, i) => {
                if (item.type === "image")
                  return <CardWithMenu key={i} item={item} />;
              })}
          </div> */}
          <SectionTitle title="Recent view" />

          <div className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1  gap-6">
            {
              recent.map((items,index)=>
                <CardWithMenu 
              item={{ name: items.mime, file_size: items.file_size , link:items.url, type:items.type }} />
              )
            }
          </div>

          <SectionTitle title="My Folders" />
          <MyFoldersTable />
        </Flex>
        <div className="max-w-[336px] min-w-[336px] max-xl:max-w-none w-full">
          {" "}
          <div className="flex justify-between items-center mb-4  max-md:flex-col max-md:items-start gap-4 ">
            <Text className="text-lg text-[#0154A0] font-medium">
              My Activity
            </Text>
            <div className="h-[45px]">
              {" "}
              <Select
                defaultValue={1}
                style={{ width: 120 }}
                defaultActiveFirstOption={true}
                className="
            [&>.ant-select-selector]:!border-none 
            [&>.ant-select-selector]:rounded-none 
            h-full
            "
                options={[
                  { value: 1, label: "Weekly" },
                  { value: 2, label: "Monthly" },
                  { value: 3, label: "Yearly" },
                ]}
              />
            </div>
          </div>
          <ResponsiveContainer width={"100%"} height={150}>
            <BarChart width={150} height={40} data={data}>
              <XAxis
                tick={{ fill: "#888888", fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
                dataKey="name"
              />
              <Bar
                dataKey="pv"
                fill="#0154A0"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
                radius={8}
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex  gap-16 mt-4">
            <div className=" flex justify-between  rounded-lg">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-[#0154A0] flex justify-center items-center rounded-lg">
                  <img src={uploadIcon} alt="" />
                </div>
                <div className="flex flex-col">
                  <Text className="text-[18px] font-medium leading-7">
                    10.22 GB
                  </Text>
                  <Text className="text-[12px] font-medium">Upload</Text>
                </div>
              </div>
            </div>
            <div className=" flex justify-between  rounded-lg">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-[#0154A0] flex justify-center items-center rounded-lg">
                  <img src={red} alt="" />
                </div>
                <div className="flex flex-col">
                  <Text className="text-[18px] font-medium leading-7">
                    3.22 GB
                  </Text>
                  <Text className="text-[12px] font-medium">Download</Text>
                </div>
              </div>
            </div>
          </div>
          <SectionTitle title="File Success Upload" />
          <div className="flex flex-col pb-20 sm:pb-0 gap-4 mt-4">
            {Card1Icons.map((item, i) => (
              <CardUpload
                key={i}
                icon={item.icon}
                text={item.text}
                dataSize={12}
                filesType={filesType}
              />
            ))}
          </div>
        </div>
      </Flex>
    </Page>
  );
}