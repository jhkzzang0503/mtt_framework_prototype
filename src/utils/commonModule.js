/**
 * 고유한 ID를 생성하는 함수.
 * 현재 시간의 타임스탬프와 랜덤 숫자를 조합하여 생성합니다.
 * @returns {string} 생성된 고유 ID (예: 'id-1678886400000-abcdefg')
 */
export const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random().toString(36).substring(2, 9);
  return `id-${timestamp}-${randomNumber}`;
};
