/**
 * ISO 8601 형식의 날짜 문자열(예: "2025-04-30T00:47:32")을
 * "YYYY년 MM월 DD일 HH:mm" 형식의 문자열로 변환
 *
 * @param isoString - ISO 형식의 날짜 문자열
 * @returns "YYYY년 MM월 DD일 HH:mm" 형식의 문자열
 *
 * @example
 * formatKoreanDateTime("2025-04-30T00:47:32")
 * // "2025년 04월 30일 00:47"
 */
export function formatKoreanDateTime(isoString: string): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("유효하지 않은 날짜 문자열입니다.");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}
