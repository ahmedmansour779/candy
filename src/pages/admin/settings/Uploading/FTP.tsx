import { Switch } from "antd";

const Ftp = ({method}:{method:string}) => {
    return (
        <div className={`${method=== "ftp" ? "block" : "hidden"} ftp mt-5 flex flex-col gap-5 border-b pb-5`}>
            <div>
                <label htmlFor="hostname">FTP hostname</label><br />
                <input type="text" id="hostname" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="username">FTP username</label><br />
                <input type="text" id="username" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="password">FTP password</label><br />
                <input type="password" id="password" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="directory">FTP directory</label><br />
                <input type="text" id="directory" placeholder="/" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="port">FTP port</label><br />
                <input type="number" id="port" placeholder="21" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <div className="flex gap-3 items-center">
                    <Switch id="passvie"/>
                    <label htmlFor="passvie">Passvie</label>
                </div>
                <div className="flex gap-3 mt-4 items-center">
                    <Switch id="ssl"/>
                    <label htmlFor="ssl">SSL</label>
                </div>
            </div>
        </div>
    );
}

export default Ftp;
