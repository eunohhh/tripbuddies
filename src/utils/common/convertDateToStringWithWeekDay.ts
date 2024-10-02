// 사용 방법 : convertDateToStringWithWeekDay(new Date(변환할값))
// 출력 예시 : 8/24(토)

const convertDateToStringWithWeekDay = (date: Date, dateFormat = 'M/d (E)') => {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const dayName = dayNames[date.getDay()];

  const dateObject: { [key: string]: string } = {
    yyyy: year.toString(),
    yy: year.toString().slice(2),
    MM: ('0' + month).slice(-2),
    M: month.toString(),
    dd: ('0' + day).slice(-2),
    d: day.toString(),
    hh: ('0' + hour).slice(-2),
    h: hour.toString(),
    mm: ('0' + minute).slice(-2),
    m: minute.toString(),
    ss: ('0' + second).slice(-2),
    s: second.toString(),
    E: dayName,
  };

  return dateFormat.replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|E/gi, (match) => dateObject[match]);
};

export default convertDateToStringWithWeekDay;
