import { Form, Input, Modal, message } from "antd";
import { useUserId } from "../../common/utils/useUserId";
import { useEffect, useState } from "react";
import authApi from "../../services/auth";
import { RequiredValidator } from "../../common/utils/validator";
import { DailyWeight } from "../../interface/user";

const { postDailyWeight, queryDailyWeight } = authApi;
const FormItem = Form.Item;

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [showWeightModal, setShowWeightModal] = useState<boolean>(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!userId) return;
    queryWeight(userId);
  }, [userId]);

  const queryWeight = (user_id: string) => {
    queryDailyWeight({ user_id })
      .then(({ data }) => {
        data ? setShowWeightModal(false) : setShowWeightModal(true);
      })
      .catch((err) => message.error(`查询今日体重失败：${err}`));
  };

  const onSubmit = () => {
    if (!userId) return;
    form.validateFields().then(({ weight }) => {
      const params: DailyWeight = {
        user_id: userId,
        weight: Number(weight),
      };
      postDailyWeight(params)
        .then(({ data }) => {
          if (data) {
            message.success("今日体重上传成功");
            setShowWeightModal(false);
          }
          queryWeight(userId);
        })
        .catch((err) => message.error(`上传今日体重失败：${err}`));
    });
  };

  return (
    <div>
      {showWeightModal && (
        <Modal
          title="今日体重"
          centered
          open={true}
          closeIcon={false}
          maskClosable={false}
          okText="保存"
          onOk={onSubmit}
          footer={(_, { OkBtn }) => <OkBtn />}
        >
          <Form form={form}>
            <FormItem
              label="体重"
              colon={false}
              name="weight"
              required
              rules={RequiredValidator}
            >
              <Input />
            </FormItem>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Home;
