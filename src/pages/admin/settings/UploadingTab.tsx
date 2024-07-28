import SettingHeader from "../../../components/SettingHeader";
import { useState } from "react";
import Ftp from "./Uploading/FTP";
import Digital from "./Uploading/Digital";
import Backblaze from './Uploading/Backblaze';
import AmazonS3 from "./Uploading/AmazonS3";
import Dropbox from "./Uploading/Dropbox";
import File from "./Uploading/File";
import Chunk from "./Uploading/Chunk";
import AtherCom from "./Uploading/AtherCom";

const UploadingTab = () => {
    const [method,setMethod] = useState("")
    return (
        <div>
            <SettingHeader
                title="Uploading"
                info="Configure size and type of files that users are able to upload. This will affect all uploads across the site."
            />
            <div>
                <form action="">
                    <div className="">
                        <div>
                            <label htmlFor="user">User Uploads Storage Method</label><br />
                            <select onChange={(e)=>setMethod(e.target.value)} id="user" className="h-9 px-2 rounded mt-2 outline-none w-[300px] border">
                                <option value="local">Local Disk (Default)</option>
                                <option value="ftp">FTP</option>
                                <option value="digital">DigitalOcean Spaces</option>
                                <option value="backblaze">Backblaze</option>
                                <option value="s3">Amazon S3 (Or compatible service)</option>
                                <option value="dropbox">Dropbox</option>
                                <option value="rackspace">Rackspace</option>
                            </select>
                            <p className="text-xs mt-1 text-gray-500">Where should user private file uploads be stored.</p>
                        </div>
                        <div className="mt-6 border-b pb-4">
                            <label htmlFor="public">Public Uploads Storage Method</label><br />
                            <select onChange={(e)=>setMethod(e.target.value)} id="public" className="h-9 px-2 rounded mt-2 outline-none w-[300px] border">
                                <option value="local">Local Disk (Default)</option>
                                <option value="s3">Amazon S3</option>
                                <option value="ftp">FTP</option>
                                <option value="digital">DigitalOcean Spaces</option>
                                <option value="backblaze">Backblaze</option>
                            </select>
                            <p className="text-xs mt-1 text-gray-500">Where should user public uploads (like avatars) be stored.</p>
                        </div>
                        <Ftp method={method} />
                        <Digital method={method} />
                        <Backblaze method={method} />
                        <AmazonS3 method={method} />
                        <Dropbox method={method} />
                        <File/>
                        <Chunk/>
                        <AtherCom/>
                        <button className='bg-blue-500 hover:bg-blue-600 p-3 rounded text-white'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadingTab;
