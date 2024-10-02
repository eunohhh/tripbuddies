export function getTimeSinceUpload(tripCreatedAt: string): string {
  const now = new Date();
  const createdAt = new Date(tripCreatedAt);
  const diffInMs = now.getTime() - createdAt.getTime();

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths =
    now.getMonth() - createdAt.getMonth() + 12 * (now.getFullYear() - createdAt.getFullYear());
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInMinutes < 1) {
    return '방금';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  } else {
    return `${diffInYears}년 전`;
  }
}
