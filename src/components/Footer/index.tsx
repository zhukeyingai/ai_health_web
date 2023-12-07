import { DefaultFooter } from "@ant-design/pro-components";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className="absolute bottom-0"
      style={{ background: "none" }}
      copyright={`${currentYear} 朱柯颖 by z_keying1004@163.com`}
    />
  );
};

export default Footer;
