import { useState } from "react";
import {
  Form,
  Avatar,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Button,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import {
  UserOutlined,
  EditOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import CommonCard from "../../components/CommonCard";
import { CityList } from "../../constant/cityList";
import { UserInfo } from "../../interface/user";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const commonStyle =
  "rounded-md py-2 px-3 border-[#f5f5f5] bg-[#f5f5f5] hover:bg-[#f0f0f0] hover:border-[#f0f0f0]";
const DateFormat = "YYYY-MM-DD";

interface DetailProfileProps {
  userInfo?: UserInfo;
}

const DetailProfile: React.FC<DetailProfileProps> = ({ userInfo }) => {
  const [form] = Form.useForm();
  const [birthDate, setBirthDate] = useState<string>("");

  return (
    <CommonCard>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ ...userInfo, birthday: dayjs(userInfo?.birthday) }}
      >
        <FormItem
          className="flex justify-center items-center"
          name="avatar_url"
        >
          <div className="relative">
            {userInfo?.avatar_url ? (
              <Avatar size={100} src={userInfo?.avatar_url} />
            ) : (
              <Avatar size={100} icon={<UserOutlined />} />
            )}
            <Avatar
              className="absolute bottom-0 right-0 border-2 border-white cursor-pointer bg-[#e0f4e7]"
              size={32}
              icon={<EditOutlined className="text-[#2db55d]" />}
            />
          </div>
        </FormItem>
        <div className="flex justify-between gap-6">
          <FormItem className="w-full" label="昵称" name="user_name">
            <Input
              className={`focus:border-[#9ad14b] ${commonStyle}`}
              placeholder="昵称（必填项）"
            />
          </FormItem>
          <FormItem className="w-full radio-button" label="性别" name="sex">
            <RadioGroup className="flex justify-between" buttonStyle="solid">
              <RadioButton
                className={`mr-3 flex-1 h-[40px] leading-normal hover:text-[#1e1e1e] ${commonStyle}`}
                style={{ borderInlineStart: 0 }}
                value="male"
              >
                <div className="flex items-center">
                  <ManOutlined className="mr-2" />
                  <span>男性</span>
                </div>
              </RadioButton>
              <RadioButton
                className={`flex-1 h-[40px] leading-normal hover:text-[#1e1e1e] ${commonStyle}`}
                value="female"
              >
                <div className="flex items-center">
                  <WomanOutlined className="mr-2" />
                  <span>女性</span>
                </div>
              </RadioButton>
            </RadioGroup>
          </FormItem>
        </div>
        <div className="flex justify-between gap-6">
          <FormItem
            className="w-full birthday-picker"
            label="生日"
            name="birthday"
          >
            <DatePicker
              className={`w-full focus-within:border-[#9ad14b] ${commonStyle}`}
              value={dayjs(birthDate)}
              onChange={(value) => {
                if (value) {
                  setBirthDate(value.format(DateFormat));
                }
              }}
              placeholder="请选择"
              format={DateFormat}
              popupClassName="birthday-picker-popup"
              locale={locale}
            />
          </FormItem>
          <FormItem className="w-full age-input" label="年龄" name="age">
            <Input className={`${commonStyle}`} disabled />
          </FormItem>
        </div>
        <div className="flex justify-between gap-6">
          <FormItem className="w-full" label="身高" name="height">
            <InputNumber
              rootClassName="w-full number-input"
              addonAfter="cm"
              defaultValue={100}
            />
          </FormItem>
          <FormItem className="w-full" label="体重" name="weight">
            <InputNumber
              rootClassName="w-full number-input"
              addonAfter="kg"
              defaultValue={100}
            />
          </FormItem>
        </div>
        <div className="flex justify-between gap-6">
          <FormItem className="w-full" label="职业" name="job">
            <Input
              className={`focus:border-[#9ad14b] ${commonStyle}`}
              placeholder="你的职业"
            />
          </FormItem>
          <FormItem
            className="w-full city-cascader"
            label="现居地"
            name="address"
          >
            <Cascader
              rootClassName="focus:border-[#9ad14b]"
              popupClassName="dropdown-cascader"
              options={CityList}
              expandTrigger="hover"
              placeholder="输入或选择现居地"
              showSearch
            />
          </FormItem>
        </div>
        {/* <FormItem name="fat"></FormItem>
          <FormItem name="bmi"></FormItem> */}
      </Form>
      <div className="w-full flex justify-end">
        <Button type="primary">保存</Button>
      </div>
    </CommonCard>
  );
};

export default DetailProfile;
