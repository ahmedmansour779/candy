import { Typography } from "antd";
const { Title } = Typography;

interface Props {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className }: Props) {
  return (
    <Title
      level={3}
      className={`${className ?? ""} my-5 text-lg font-medium text-start`}
    >
      {title}
    </Title>
  );
}
