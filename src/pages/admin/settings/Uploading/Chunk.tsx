/* eslint-disable @typescript-eslint/no-explicit-any */

const Chunk = ({register}:{register:any}) => {
    return (
        <div className="border-b py-5">
            <label htmlFor="size">Chunk size</label>
            <div className="flex">
                <input {...register("uploads->chunk_size")} type="number" id="size" defaultValue={"512"} className="h-9 mt-2 outline-none w-[200px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                <select defaultValue={"GB"} name="" id="" className="h-9 mt-2 outline-none w-[100px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300">
                    <option value="bytes">Bytes</option>
                    <option value="KB">KB</option>
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                    <option value="TB">TB</option>
                </select>
            </div>
            <p className='text-xs text-gray-500 my-4'>
                Size (in bytes) for each file chunk. It should only be changed if there is a maximum 
                upload size on your server or proxy (for example cloudflare). 
                If chunk size is larger then limit on the server, uploads will fail.
            </p>
            <p className="p-2 rounded bg-orange-100 w-fit">
                Maximum upload size on your server currently is set to <strong>512M</strong>
            </p>
        </div>
    );
}

export default Chunk;
