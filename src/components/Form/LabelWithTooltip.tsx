import { QuestionCircleFilled } from "@ant-design/icons";
import { Tooltip as BaseTooltip, Space } from "antd";

type LabelWithTooltip = {
  label: string;
  title: string;
};

const LabelWithTooltip = ({ label, title }: LabelWithTooltip) => (
  <Space>
    {label}
    <BaseTooltip title={title}>
      <QuestionCircleFilled />
    </BaseTooltip>
  </Space>
);

export default LabelWithTooltip;
