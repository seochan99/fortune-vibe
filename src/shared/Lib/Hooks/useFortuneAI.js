import { useState, useCallback } from 'react';
import { generateFortune } from '../../API/gemini';

/**
 * 운세 AI를 위한 커스텀 훅
 * Gemini API 호출, 로딩 상태, 에러 상태, 결과 상태를 관리합니다.
 * 
 * @returns {Object} { askFortune, result, is_loading, error }
 */
export const useFortuneAI = () => {
  const [result, setResult] = useState('');
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 운세를 묻는 함수
   * @param {string} prompt - 사용자가 입력한 질문
   */
  const askFortune = useCallback(async (prompt) => {
    if (!prompt || !prompt.trim()) {
      setError('질문을 입력해주세요.');
      return;
    }

    // 상태 초기화
    setIsLoading(true);
    setResult('');
    setError(null);

    try {
      const fortune = await generateFortune(prompt.trim());
      setResult(fortune);
    } catch (err) {
      const errorMessage = err.message || '운명을 읽는 중 오류가 발생했습니다.';
      setError(errorMessage);
      setResult('');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    askFortune,
    result,
    is_loading,
    error,
  };
};

