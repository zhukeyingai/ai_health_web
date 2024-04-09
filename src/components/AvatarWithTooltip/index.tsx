import { Avatar, Tooltip } from "antd";
import { User } from "../../interface/user";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  user?: User;
  size?: number;
}

export default function AvatarWithTooltip({ user, size = 24 }: Props) {
  if (!user) return null;

  let inner: any = null;
  if (user?.avatar_url) {
    inner = <img src={user.avatar_url} />;
  } else if (user.user_name) {
    inner =
      user.user_name.length > 3 ? user.user_name.slice(0, 1) : user.user_name;
  } else {
    inner = <UserOutlined />;
  }
  return (
    <Tooltip key={user.user_id} title={user.user_name}>
      <Avatar className="cursor-pointer" size={size} src={inner}/>
    </Tooltip>
  );
}
