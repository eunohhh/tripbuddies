import { emailRegex, passwordRegex } from '../common/regexs';
import { showAlert } from '../ui/openCustomAlert';
export const validateWhiteSpace = (inputs: (string | undefined)[]) =>
  inputs?.some((input) => input !== undefined && /\s/.test(input));

export const authValidation = (
  email?: string,
  password?: string,
  passwordConfirm?: string,
  name?: string,
) => {
  if (email !== undefined) {
    if (!email) {
      showAlert('caution', '이메일을 입력해주세요');
      return false;
    }
    if (!emailRegex.test(email)) {
      showAlert('caution', '유효한 이메일 주소를 입력하세요!');
      return false;
    }
  }

  if (name !== undefined) {
    if (!name) {
      showAlert('caution', '이름을 입력해주세요');
      return false;
    }
  }

  if (password !== undefined) {
    if (!password) {
      showAlert('caution', '비밀번호를 입력해주세요');
      return false;
    }
    if (password.length < 8 || password.length > 15) {
      showAlert('caution', '비밀번호는 8~15 글자로 해야합니다!');
      return false;
    }
  }

  if (passwordConfirm !== undefined && password !== undefined) {
    if (!passwordConfirm) {
      showAlert('caution', '비밀번호 확인을 입력해주세요');
      return false;
    }
    if (!passwordRegex.test(passwordConfirm) || !passwordRegex.test(password)) {
      showAlert('caution', '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다!');
      return false;
    }
  }
  if (password !== undefined && passwordConfirm !== undefined && password !== passwordConfirm) {
    showAlert('caution', '비밀번호가 일치하지 않습니다!');
    return false;
  }

  if (validateWhiteSpace([email, name, password, passwordConfirm])) {
    showAlert('caution', '공백을 포함할 수 없습니다!');
    return false;
  }

  return true;
};
