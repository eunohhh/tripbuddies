import { BuddyTheme, TripTheme } from '@/types/Themes.types';

const handleChipClick = (
  target: EventTarget & HTMLSpanElement,
  data: (TripTheme | BuddyTheme)[],
  prevSelected: (TripTheme | BuddyTheme)[],
  setSelected: (value: (TripTheme | BuddyTheme)[]) => void,
) => {
  const text = target.innerText as TripTheme | BuddyTheme;
  if (prevSelected.includes(text)) {
    // 선택 해제
    const newSelected = prevSelected.filter((selected) => selected !== text);
    setSelected(newSelected);
  } else if (prevSelected.length < 3) {
    // 새로운 선택 추가
    setSelected([...prevSelected, text]);
  } else {
    // 선택된 Chip이 3개일 때, 가장 가까운 인덱스의 Chip을 해제하고 새로운 선택 추가
    const newSelected = [...prevSelected];
    const targetIndex = data.findIndex((item) => item === target.innerText);
    const indexToReplace = prevSelected
      .map((selected) => data.findIndex((item) => item === selected))
      .reduce(
        (prev, curr, idx) =>
          Math.abs(curr - targetIndex) < Math.abs(prev - targetIndex) ? idx : prev,
        0,
      );
    newSelected[indexToReplace] = text;
    setSelected(newSelected);
  }
};

export default handleChipClick;
