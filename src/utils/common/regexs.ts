export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 숫자, 특수문자, 영문자 조합을 강제하는 정규식
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
