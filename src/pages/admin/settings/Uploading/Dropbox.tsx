
const Dropbox = ({method}:{method:string}) => {
    return (
        <div className={`${method=== "dropbox" ? "block" : "hidden"} ftp mt-5 flex flex-col gap-5 border-b pb-5`}>
            <div>
                <label htmlFor="key">Dropbox application key</label><br />
                <input type="text" id="key" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="secret">Dropbox application secret</label><br />
                <input type="text" id="secret" className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
            <div>
                <label htmlFor="token">Dropbox refresh token</label><br />
                <input type="text" id="token" defaultValue={"8x_YGNRPx-0AAAAAAAAAAR1zX4yDD8CuxOIlEe5LIqrXJ4Gh_O4TaCuKW7kVOa3o"} className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
            </div>
        </div>
    );
}

export default Dropbox;
