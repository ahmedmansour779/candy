import { Typography } from "antd";

const { Text } = Typography;

interface Props {
  children?: React.ReactNode;
  text: string;
  icon: string | JSX.Element;
  dataSize: string | number;
}

export default function Card1({ text, icon, dataSize }: Props) {
  
  return (
    <div className="p-6 flex items-center justify-between max-lg:flex-col max-lg:items-start  card w-full  gap-4">
      <div className="flex-center gap-2 h-fit">
        <img src={icon as string} alt={text} />
        <Text className="capitalize text-primary-500 font-medium">{text}</Text>
      </div>
      <div className="text-gray-500 font-semibold text-xs">{dataSize} MB</div>
    </div>
  );
}
