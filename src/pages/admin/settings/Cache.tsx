import { useState } from "react";
import SettingHeader from "../../../components/SettingHeader";

const Cache = () => {
    const [method,setMethod] = useState("")
    return (
        <div>
            <SettingHeader
                title="Cache settings"
                info="Select cache provider and manually clear cache."
            />
            <div>
                <form action="">
                    <div className="pb-5 border-b">
                        <div>
                            <label htmlFor="Cache">Cache method</label><br />
                            <select onChange={(e)=>setMethod(e.target.value)} id="Cache" className="h-9 px-2 rounded mt-2 outline-none w-[300px] border">
                                    <option value="file">File (Default)</option>
                                    <option value="none">None</option>
                                    <option value="aps">APS</option>
                                    <option value="memcached">Memcached</option>
                                    <option value="redis">Redis</option>
                            </select>
                            <p className="text-xs mt-1 text-gray-500">Which method should be used for storing and retrieving cached items.</p>
                        </div>
                        <div className={`${method=== "memcached" ? "block" : "hidden"} ftp mt-5 flex flex-col gap-5`}>
                            <div>
                                <label htmlFor="host">Memcached host</label><br />
                                <input type="text" id="host" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                            </div>
                            <div>
                                <label htmlFor="port">Memcached port</label><br />
                                <input type="number" id="port" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <button  className='text-blue-500 border border-blue-600 p-2 rounded bg-white'>
                            Clear cache
                        </button>
                        <div className="my-5">
                            <p  className="p-2 max-w-[500px] leading-6 rounded bg-orange-100 w-fit">
                                "File" is the best option for most cases and should not be changed, 
                                unless you are familiar with another cache method and have it set up on the server already.
                            </p>
                        </div>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-600 p-3 rounded text-white'>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Cache;
