/**
 * Gemini API 클라이언트
 */
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Gemini API를 호출하여 운세 답변을 생성합니다.
 * @param {string} prompt - 사용자가 입력한 질문
 * @returns {Promise<string>} AI가 생성한 운세 답변
 */
export const generateFortune = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API 키가 설정되지 않았습니다.');
  }

  const systemPrompt = `당신은 고대의 신비로운 '운명의 오라클'입니다. 사용자의 질문을 받고, 반드시 마크다운 형식을 사용하여 운세 또는 조언을 신비롭고 재미있게 점쳐주세요.

**답변 형식 규칙:**
1. 답변은 반드시 '오직 운명의 수레바퀴만이 이 질문에 대답할 수 있습니다.'라는 문구로 시작해야 합니다.
2. 답변의 제목은 마크다운 헤딩 형식(##)으로 표시하세요.
3. 반드시 3가지 조언을 포함해야 하며, 각 조언은 마크다운 리스트 형식(-)을 사용하여 작성하세요.
4. 답변 끝에는 반드시 행운의 이모지(🔮✨)를 덧붙이세요.
5. 개행을 철저히 지켜서 출력하세요. 각 문단과 리스트 항목 사이에는 빈 줄을 넣어주세요.

**답변 스타일:**
- 신비롭고 운명적인 톤을 유지하되, 재미있고 흥미롭게 작성하세요.
- 고대의 오라클처럼 신비로운 분위기를 내되, 현대적인 감각도 섞어주세요.
- 긍정적이면서도 현실적인 조언을 제공하세요.

**예시 형식:**
오직 운명의 수레바퀴만이 이 질문에 대답할 수 있습니다.

## 운명의 예언

- 첫 번째 조언: [내용]

- 두 번째 조언: [내용]

- 세 번째 조언: [내용]

🔮✨`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${systemPrompt}\n\n사용자의 질문: ${prompt}\n\n운명의 답변:`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.9,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192, // 충분한 토큰 수로 증가 (생각 토큰 포함)
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    // 디버깅: 전체 응답 확인
    console.log('Gemini API 전체 응답:', JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('API 응답 구조:', data);
      throw new Error('API 응답 형식이 올바르지 않습니다.');
    }

    // 여러 parts가 있을 수 있으므로 모든 텍스트를 합침
    const parts = data.candidates[0].content.parts;
    let fullText = '';
    
    if (Array.isArray(parts)) {
      fullText = parts
        .map(part => part.text || '')
        .join('')
        .trim();
    } else if (parts && parts.text) {
      fullText = parts.text.trim();
    } else {
      fullText = data.candidates[0].content.parts[0].text || '';
    }

    console.log('파싱된 텍스트 길이:', fullText.length);
    console.log('파싱된 텍스트:', fullText);

    return fullText;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('운명을 읽는 중 예상치 못한 오류가 발생했습니다.');
  }
};

