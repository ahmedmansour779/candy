/* eslint-disable @typescript-eslint/no-explicit-any */

import { Select } from "antd";
import { Controller } from "react-hook-form";

const AtherCom = ({register,control}:{register:any,control:any}) => {
    return (
        <div className="py-5">
            <div>
                <label htmlFor="file">Maximum file size</label>
                <div className="flex">
                    <input  {...register("uploads->max_size")} type="number" id="file" defaultValue={"3"} className="h-9 mt-2 outline-none w-[200px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                    <select defaultValue={"GB"} name="" id="" className="h-9 mt-2 outline-none w-[100px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300">
                        <option value="bytes">Bytes</option>
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                    </select>
                </div>
                <p className='text-xs text-gray-500 mt-2'>
                    Maximum size (in bytes) for a single file user can upload.
                </p>
            </div>
            <div className="mt-5">
                <label htmlFor="space">Available space</label>
                <div className="flex">
                    <input  {...register("uploads->available_space")} type="number" id="space" defaultValue={100} className="h-9 mt-2 outline-none w-[200px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                    <select defaultValue={"GB"} name="" id="" className="h-9 mt-2 outline-none w-[100px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300">
                        <option value="bytes">Bytes</option>
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                    </select>
                </div>
                <p className='text-xs text-gray-500 mt-2'>
                    Disk space (in bytes) each user uploads are allowed to take up. This can be overridden per user.
                </p>
            </div>
            <div className="mt-5">
                <label htmlFor="Allowed">Allowed extensions</label><br />
                <input {...register("uploads->allowed_extensions")} type="text" id="Allowed" placeholder="Add extension..." className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                <p className='text-xs text-gray-500 mt-2'>
                    List of allowed file types (jpg, mp3, pdf etc.). Leave empty to allow all file types.
                </p>
            </div>
            <div className="mt-5">
                <Controller
                    name="uploads->blocked_extensions"
                    control={control}
                    render={({ field }) => (
                    <>
                        <label htmlFor="Blocked">Blocked extensions</label><br />
                        <Select
                        mode="tags"
                        size="middle"
                        {...field}
                        placeholder="Add extension..."
                        id="Blocked"
                        className="flex-1 mt-2 h-auto w-auto rounded border focus:border-blue-400 focus:shadow focus:shadow-blue-300"
                        ></Select>
                    </>
                    )}
                />
                {/* <label htmlFor="Blocked">Blocked extensions</label><br />
                <input {...register("uploads->blocked_extensions")} type="text" id="Blocked" placeholder="Add extension..." className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/> */}
                <p className='text-xs text-gray-500 mt-2'>
                    Prevent uploading of these file types, even if they are allowed above.
                </p>
            </div>
        </div>
    );
}

export default AtherCom;
