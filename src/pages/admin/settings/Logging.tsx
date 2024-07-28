import SettingHeader from "../../../components/SettingHeader";

const Logging = () => {
    return (
        <div>
            <SettingHeader
                title="Error logging"
                info="Configure site error logging and related 3rd party integrations."
            />
            <div>
                <form action="">
                    <div>
                        <label htmlFor="Sentry">Sentry DSN</label><br />
                        <input type="text" id="Sentry" defaultValue={"11vbaBErg86qCvWB4r8lcg8iFI4vrO"} className="h-9 mt-2 outline-none w-[300px] rounded px-2 border focus:border-blue-400 focus:shadow focus:shadow-blue-300"/>
                    </div>
                    <div className="my-5">
                        <p  className="p-2 max-w-[500px] leading-6 rounded bg-blue-100 w-fit">
                            <a href="" className="text-blue-500 hover:underline">Sentry</a> integration provides real-time error tracking and helps identify 
                            and fix issues when site is in production.
                        </p>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-600 p-3 rounded text-white'>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Logging;