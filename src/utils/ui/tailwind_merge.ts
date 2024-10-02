import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function tailwindMerge(...inputs: ClassValue[]) {
  // clsx를 사용하여 입력된 모든 클래스네임을 결합하고,
  // 이를 twMerge에 전달하여 최종 병합된 클래스네임을 반환합니다.
  return twMerge(clsx(...inputs));
}
