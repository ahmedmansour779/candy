import { Switch } from 'antd';

const Digital = ({method}:{method:string}) => {
    return (
        <div className={`${method=== "digital" ? "block" : "hidden"} ftp mt-5 flex flex-col gap-5 border-b pb-5`}>
            <div>
                <label htmlFor="key">DigitalOcean key</label><br />
                <input type="text" id="key" defaultValue={"5R296jlSFbUUkkfffCHpG9zq8QVEwT"} className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="secret">DigitalOcean secret</label><br />
                <input type="text" id="secret" defaultValue={"AtAntQLVmwnFxEUjDksjytz1zNc9Y5"} className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="region">DigitalOcean region</label><br />
                <input type="text" id="region" defaultValue={"nyc3"} className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="bucket">DigitalOcean bucket</label><br />
                <input type="text" id="bucket" defaultValue={"bedrive-demo2"} className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <div className="flex gap-3 items-center">
                    <Switch id="passvie" checked/>
                    <label htmlFor="passvie">Direct upload</label>
                </div>
                <p className='text-xs text-gray-500 mt-4'>
                    Upload files directly from the browser to s3 without going through the server. 
                    It will save on server bandwidth and should result in faster upload times. 
                    This should be enabled, unless storage provider does not support multipart uploads.
                </p>
                <p className='text-xs text-gray-500 my-4'>
                    If s3 provider is not configured to allow uploads from browser, 
                    this can be done automatically via CORS button below, when valid credentials are saved.
                </p>
                <button className='bg-blue-500 hover:bg-blue-600 p-2 rounded text-white'>
                    Configure CORS
                </button>
            </div>
        </div>
    );
}

export default Digital;