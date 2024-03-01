import { useEffect, useState } from "react";
import {
  Form,
  Avatar,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Cascader,
  Button,
  Dropdown,
  Upload,
  message,
} from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import {
  UserOutlined,
  EditOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { MenuProps } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import CommonCard from "../../components/CommonCard";
import { CityList } from "../../constant/cityList";
import { UserInfo } from "../../interface/user";
import authApi from "../../services/auth";

const { updateUserInfo } = authApi;

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const commonStyle =
  "rounded-md py-2 px-3 border-[#f5f5f5] bg-[#f5f5f5] hover:bg-[#f0f0f0] hover:border-[#f0f0f0]";
const DateFormat = "YYYY-MM-DD";

interface DetailProfileProps {
  userId?: string;
  userInfo?: UserInfo;
}

const DetailProfile: React.FC<DetailProfileProps> = ({ userId, userInfo }) => {
  const [form] = Form.useForm();
  const [curAge, setCurAge] = useState<number>();
  const [today, setToday] = useState<any>();
  const [uploadData, setUploadData] = useState<{
    name: string;
    url: string;
  }>();

  useEffect(() => {
    setToday(dayjs());
  }, []);

  useEffect(() => {
    if (curAge) {
      form.setFieldsValue({
        age: curAge,
      });
    }
  }, [curAge]);

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        const { birthday, ...updatedValues } = values;
        const params = {
          user_id: userId,
          birthday: birthday.format(DateFormat),
          ...updatedValues,
        };
        await updateUserInfo(params)
          .then((res) => {
            if (res.data) {
              message.success("保存成功");
            } else {
              message.warning("信息未发生改变，无需保存");
            }
          })
          .catch((err) => message.error(`保存信息失败：${err}`));
      } catch (err) {
        message.error(`保存失败：${err}`);
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <ImgCrop
          cropShape="round"
          modalTitle="上传头像"
          modalOk="保存"
          modalCancel="取消"
        >
          <Upload
            name="avatar"
            maxCount={1}
            accept=".jpg, .jpeg, .png"
            showUploadList={false}
            action="/workbench/user/uploadAvatar"
            onChange={({ file }) => {
              if (file.status === "done") {
                const response = file.response;
                if (response?.data) {
                  setUploadData(response.data);
                  form.setFieldsValue({ avatar_url: response.data.url });
                  message.success("头像上传成功");
                }
              }
              if (file.status === "error") {
                message.error("上传头像失败");
              }
            }}
          >
            上传头像
          </Upload>
        </ImgCrop>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            console.log("@删除头像");
          }}
        >
          删除头像
        </div>
      ),
    },
  ];

  return (
    <CommonCard>
      <Form form={form} layout="vertical" initialValues={userInfo}>
        <FormItem
          className="flex justify-center items-center"
          name="avatar_url"
        >
          <div className="relative">
            {userInfo?.avatar_url || form.getFieldValue("avatar_url") ? (
              <Avatar
                size={100}
                src={userInfo?.avatar_url || form.getFieldValue("avatar_url")}
              />
            ) : (
              <Avatar size={100} icon={<UserOutlined />} />
            )}
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Avatar
                className="absolute bottom-0 right-0 border-2 border-white cursor-pointer bg-[#e0f4e7]"
                size={32}
                icon={<EditOutlined className="text-[#2db55d]" />}
              />
            </Dropdown>
          </div>
        </FormItem>
        <div className="flex justify-between gap-6">
          <FormItem
            className="w-full"
            label="昵称"
            name="user_name"
            rules={[
              {
                required: true,
                message: "昵称为必填项",
              },
            ]}
          >
            <Input
              className={`focus:border-[#9ad14b] ${commonStyle}`}
              placeholder="昵称（必填项）"
            />
          </FormItem>
          <FormItem
            className="w-full radio-button"
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: "性别为必选项",
              },
            ]}
          >
            <RadioGroup className="flex justify-between" buttonStyle="solid">
              <RadioButton
                className={`mr-3 flex-1 h-[40px] leading-normal hover:text-[#1e1e1e] ${commonStyle}`}
                style={{ borderInlineStart: 0 }}
                value="0"
              >
                <div className="flex items-center">
                  <WomanOutlined className="mr-2" />
                  <span>女性</span>
                </div>
              </RadioButton>
              <RadioButton
                className={`flex-1 h-[40px] leading-normal hover:text-[#1e1e1e] ${commonStyle}`}
                value="1"
              >
                <div className="flex items-center">
                  <ManOutlined className="mr-2" />
                  <span>男性</span>
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
            rules={[
              {
                required: true,
                message: "生日为必填项",
              },
            ]}
          >
            <DatePicker
              className={`w-full focus-within:border-[#9ad14b] ${commonStyle}`}
              onChange={(value) => {
                setCurAge(today.diff(dayjs(value), "year"));
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
          <FormItem
            className="w-full"
            label="身高"
            name="height"
            rules={[
              {
                required: true,
                message: "身高为必填项",
              },
            ]}
          >
            <InputNumber
              rootClassName="w-full number-input"
              addonAfter="cm"
              placeholder="身高（必填项）"
            />
          </FormItem>
          <FormItem
            className="w-full"
            label="体重"
            name="weight"
            rules={[
              {
                required: true,
                message: "体重为必填项",
              },
            ]}
          >
            <InputNumber
              rootClassName="w-full number-input"
              addonAfter="kg"
              placeholder="体重（必填项）"
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
        <Button type="primary" onClick={onSubmit}>
          保存
        </Button>
      </div>
    </CommonCard>
  );
};

export default DetailProfile;
