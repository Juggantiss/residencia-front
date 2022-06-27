import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

const InputFormik = () => {
  return (
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
  );
};

export default InputFormik;
