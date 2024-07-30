import { Radio, Space } from "antd";

const File = () => {
    return (
        <div className="border-b py-5">
            <div>
                <p>File delivery optimization</p>
                <div className="my-3">
                    <Radio.Group>
                        <Space className="" direction="vertical">
                            <Radio value={"none"}>None</Radio>
                            <Radio value={"X-Sendfile"}>X-Sendfile (Apache)</Radio>
                            <Radio value={"X-Accel"}>X-Accel (Nginx)</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <p className='text-xs text-gray-500 mt-4'>
                    Both X-Sendfile and X-Accel need to be enabled on the server first. 
                    When enabled, it will reduce server memory and CPU usage when previewing or 
                    downloading files, especially for large files.
                </p>
            </div>
        </div>
    );
}

export default File;
