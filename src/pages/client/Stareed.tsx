/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchGetAllStar } from "../../api/amt/workspace/GetAllStar";
import { useDispatch } from "react-redux";
import { PlayCircleFilled } from "@ant-design/icons";
import { convertBytes } from "../../utils/helpers";
import { truncate } from "lodash";
import { Typography } from "antd";
const { Text } = Typography;

const Stareed = () => {
    const [data,setData] = useState<any[]>([]);
    const dispatch = useDispatch()
    useEffect(()=>{
        fetchGetAllStar(setData,dispatch)
    },[])
    console.log(data)
    return (
        <div className="ml-[30px] side sm:ml-[160px] md:ml-[250px] lg:ml-0">
            <div className="py-5 px-5">
                <h1 className="text-3xl">Starred</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-3 pb-16 sm:pb-0">
                    {
                        data?.map((item,index)=>
                            <div key={index} className="h-fit cursor-pointer flex flex-col border overflow-hidden rounded-2xl">
                                <div className="h-[125px] w-full max-md:h-[200px]">
                                    {
                                    item.type === "video" ? 
                                    <video src={`https://angeloai.co/${item.url}`} className="w-full h-full object-cover" controls></video>
                                    :
                                    <img
                                        className="w-full h-full object-cover "
                                        alt="example"
                                        src={`https://angeloai.co/${item.url}`}
                                    />
                                    }
                                </div>
                                <div
                                    className={`flex flex-col items-center justify-center w-full gap-2 p-2 px-2 duration-150 bg-[#0154A01A]`}
                                >
                                    <div className="leading-none flex-center gap-2 ">
                                        {
                                            item.type === "video" ? <PlayCircleFilled className="text-primary-600 text-2xl" />
                                            :null
                                        }
                                        <Text className="text-primary-500">
                                            {truncate(item.name, { length: 20 })}
                                        </Text>
                                    </div>
                                    <Text className="text-gray-600">
                                    {convertBytes(item.file_size)}
                                    </Text>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Stareed;