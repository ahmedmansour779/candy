import React, { useEffect, useState } from "react";
import { Typography, Progress } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCatchFile } from "../../store/slices/GlobalSlice";

const { Text } = Typography;

interface Props {
  children?: React.ReactNode;
  text: string;
  icon: string | JSX.Element;
  dataSize: string | number;
  filesType: string[];
}

export default function CardUpload({ text, icon, dataSize, filesType }: Props) {
  const { catchFile } = useSelector((state: RootState) => state.GlobalReducer);
  const dispatch: AppDispatch = useDispatch();
<<<<<<< HEAD
  
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
=======

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

>>>>>>> 4433471fa573c0c9309f507703f871259ecacb88
  useEffect(() => {
    if (catchFile) {
      setLoading(true);
      setProgress(0);
<<<<<<< HEAD
      
=======

>>>>>>> 4433471fa573c0c9309f507703f871259ecacb88
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            setLoading(false);
            dispatch(setCatchFile(null));
            return 0;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 150);
    }
  }, [catchFile, dispatch]);

  const isFileTypeMatched = filesType.some((item) => text.toString().toLowerCase().includes(item));

<<<<<<< HEAD
=======


>>>>>>> 4433471fa573c0c9309f507703f871259ecacb88
  return (
    <div className="px-6 py-4 flex items-center justify-between card">
      <div className="flex-center gap-4 h-fit">
        {typeof icon === "string" ? (
          <img src={icon as string} alt={text} />
        ) : (
          icon
        )}
        <div className="flex flex-col items-start gap-1">
          <Text className="capitalize text-primary-500 font-medium">
            {text}
          </Text>
          <Text className="text-gray-500 text-xs">{dataSize} MB</Text>
        </div>
      </div>
<<<<<<< HEAD
      {loading && isFileTypeMatched ? (
        <Progress percent={progress} status="active" style={{ width: 120 }} />
      ) : (
        <CheckCircleFilled className="text-xl text-[#27C72B]" />
      )}
=======
      {loading && isFileTypeMatched && text.toLowerCase() !== "documents"  ? (
        <Progress percent={progress} status="active" style={{ width: 120 }} />
      ) :
        loading &&  text.toLowerCase() == "documents"  ?
          (
            <Progress percent={progress} status="active" style={{ width: 120 }} />
          ) :
          (
            <CheckCircleFilled className="text-xl text-[#27C72B]" />
          )}
>>>>>>> 4433471fa573c0c9309f507703f871259ecacb88
    </div>
  );
}
