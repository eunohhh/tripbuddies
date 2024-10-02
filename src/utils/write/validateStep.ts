import { showAlert } from '@/utils/ui/openCustomAlert';

export const validateStep = async (step: number, params: any): Promise<boolean | 'no-image'> => {
  const {
    secondLevelLocation,
    thirdLevelLocation,
    startDateTimestamp,
    endDateTimestamp,
    selectedTripThemes,
    meetPlace,
    wantedSex,
    startAge,
    endAge,
    selectedWantedBuddies,
    tripTitle,
    tripContent,
    tripImageFile,
  } = params;

  if (step === 1) {
    if (!secondLevelLocation || !thirdLevelLocation) {
      showAlert('caution', '여정을 원하는 지역을 선택해 주세요.');
      return false;
    }
    return true;
  }
  if (step === 2) {
    const now = new Date();
    const startDate = new Date(startDateTimestamp);
    const endDate = new Date(endDateTimestamp);

    startDate.setHours(23, 59, 59, 999);
    endDate.setHours(23, 59, 59, 999);

    if (startDate > endDate) {
      showAlert('caution', '시작 날짜가 종료 날짜보다 늦습니다.');
      return false;
    }
    if (startDate < now) {
      showAlert('caution', '시작 날짜가 현재 날짜보다 이전입니다.');
      return false;
    }
    if (endDate < now) {
      showAlert('caution', '종료 날짜가 현재 날짜보다 이전입니다.');
      return false;
    }
    if (!startDateTimestamp || !endDateTimestamp) {
      showAlert('caution', '시작날짜와 종료 날짜를 선택해 주세요.');
      return false;
    }
    return true;
  }
  if (step === 3) {
    if (!selectedTripThemes[0] || !selectedTripThemes[1] || !selectedTripThemes[2]) {
      showAlert('caution', '여정 테마는 3개를 선택하셔야 합니다.');
      return false;
    }
    if (!meetPlace) {
      showAlert('caution', '만날 장소를 선택해 주세요.');
      return false;
    }
    return true;
  }
  if (step === 4) {
    if (!wantedSex) {
      showAlert('caution', '원하는 성별을 선택해 주세요.');
      return false;
    }
    if (!startAge || !endAge) {
      showAlert('caution', '원하는 나이를 선택해 주세요.');
      return false;
    }
    if (startAge > endAge) {
      showAlert('caution', '시작 나이가 종료 나이보다 높습니다.');
      return false;
    }
    if (startAge < 20 || endAge > 150) {
      showAlert('caution', '나이는 20세 이상 150세 이하로 선택해 주세요.');
      return false;
    }
    if (!selectedWantedBuddies[0] || !selectedWantedBuddies[1] || !selectedWantedBuddies[2]) {
      showAlert('caution', '버디 성향은 3개를 선택하셔야 합니다.');
      return false;
    }
    return true;
  }
  if (step === 5) {
    if (!tripTitle) {
      showAlert('caution', '여정 제목을 입력해 주세요.');
      return false;
    }
    if (!tripContent) {
      showAlert('caution', '여정 내용을 입력해 주세요.');
      return false;
    }
    if (!tripImageFile) {
      return 'no-image';
    }
    return true;
  }
  return true;
};
