import { BuddyTheme, TripTheme } from '@/types/Themes.types';
import { showAlert } from '../ui/openCustomAlert';
import { SecondLevelNames, ThirdLevelNames } from './../../types/Location.types';

type InPutValue =
  | string
  | number
  | undefined
  | [string | null, string | null]
  | []
  | (TripTheme | BuddyTheme)[]
  | SecondLevelNames[]
  | ThirdLevelNames[];

type onBoardingValidationType = (value: InPutValue, step: number) => boolean;

export const onBoardingValidation: onBoardingValidationType = (value, step) => {
  // console.log('value =====>', value);
  if (value !== undefined) {
    if (value === 0 || value) {
      if (typeof value === 'string' && step === 0) {
        if (value.length < 2) {
          showAlert('caution', '2글자 이상 입력해주세요.');
          return false;
        }
      }
      // value가 숫자이고, step이 2인 경우 추가 검사를 합니다.
      if (typeof value === 'number' && step === 2) {
        if (isNaN(value)) {
          showAlert('caution', '숫자만 입력해주세요.');
          return false;
        }
        if (value < 18) {
          showAlert('caution', '18세 이상부터 서비스를 이용할 수 있습니다.');
          return false;
        }
        // 추가적인 밸리데이션이 있다면 여기에 작성합니다.
      }
      if (step === 9) {
        if (typeof value === 'string' && value.length > 30) {
          showAlert('caution', '30자 이하로 입력해주세요.');
          return false;
        }
      }
    } else {
      showAlert('caution', '필수 입력 사항입니다.');
      return false;
    }
    if (Array.isArray(value)) {
      // console.log('value ===>', value);
      if (value.length === 0) {
        showAlert('caution', '값을 확인해주세요!');
        return false;
      }
      if (step === 4 && (!value[0] || !value[1])) {
        showAlert('caution', '지역을 모두 선택해주세요.');
        return false;
      }

      if (step === 7 || step === 8) {
        if (value.length < 3) {
          showAlert('caution', '3가지를 선택하셔야 합니다.');
          return false;
        }
        return true;
      }
    }
    return true;
  }
  return false;
};
