import validator from "email-validator";

export const validateEmail = (_: any, value: any) => {
  if (!value) {
    return Promise.reject("请输入邮箱");
  } else if (!validator.validate(value)) {
    return Promise.reject("邮箱格式不正确");
  }
  return Promise.resolve();
};

export const validatePassword = (_: any, value: any) => {
  // 密码验证正则
  // (?=.*[a-z])：密码必须至少包含一个小写字母。
  // (?=.*[A-Z])：密码必须至少包含一个大写字母。
  // (?=.*\d)：密码必须至少包含一个数字。
  // [^]{6,}：密码必须至少包含6个字符。
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/;
  if (!value) {
    return Promise.reject("请输入你的密码");
  } else if (!passwordRegex.test(value)) {
    return Promise.reject(
      "密码必须包含至少一个大写字母，一个小写字母和一个数字，且长度至少为6"
    );
  }
  return Promise.resolve();
};
