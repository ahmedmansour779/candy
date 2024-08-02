/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch } from "antd";
import { Controller } from "react-hook-form";

const Ftp = ({method,register,control}:{method:string,register:any,control:any}) => {
    return (
        <div className={`${method=== "ftp" ? "block" : "hidden"} ftp mt-5 flex flex-col gap-5 border-b pb-5`}>
            <div>
                <label htmlFor="hostname">FTP hostname</label><br />
                <input {...register("ftp_hostname")} type="text" id="hostname" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="username">FTP username</label><br />
                <input {...register("ftp_username")} type="text" id="username" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="password">FTP password</label><br />
                <input {...register("ftp_password")} type="password" id="password" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="directory">FTP directory</label><br />
                <input {...register("ftp_directory")} type="text" id="directory" placeholder="/" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="port">FTP port</label><br />
                <input {...register("ftp_port")} type="number" id="port" placeholder="21" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <Controller
                    name="passvie"
                    control={control}
                    render={({ field }) => (
                        <div className="flex gap-3 items-center">
                            <Switch id="passvie"
                                checked={field.value == "1"}
                                onChange={(e) => field.onChange(e ? 1 : 0)}
                            />
                            <label htmlFor="passvie">Passvie</label>
                        </div>
                    )}
                />
                <Controller
                    name="ssl"
                    control={control}
                    render={({ field }) => (
                        <div className="flex gap-3 items-center mt-4">
                            <Switch id="ssl"
                                checked={field.value == "1"}
                                onChange={(e) => field.onChange(e ? 1 : 0)}
                            />
                            <label htmlFor="ssl">SSL</label>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default Ftp;
