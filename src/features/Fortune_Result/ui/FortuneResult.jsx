import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../../shared/UI';
import './FortuneResult.css';

const FortuneResult = ({ result }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!result) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    // 새로운 결과가 들어오면 타이핑 효과 시작
    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    const typingSpeed = 30; // 밀리초 단위 (작을수록 빠름)

    const typingInterval = setInterval(() => {
      if (currentIndex < result.length) {
        setDisplayedText(result.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    // cleanup 함수
    return () => {
      clearInterval(typingInterval);
    };
  }, [result]);

  const handleCopy = async () => {
    if (!result) return;

    try {
      // 마크다운을 일반 텍스트로 변환하여 복사
      const textToCopy = result.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/-\s/g, '• ');
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      
      // 2초 후 복사 상태 초기화
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('복사 실패:', error);
      // 대체 방법: 텍스트 영역 사용
      const textArea = document.createElement('textarea');
      textArea.value = result.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/-\s/g, '• ');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (!result) {
    return null;
  }

  return (
    <div className="fortune-result">
      <div className="fortune-result-header">
        <h2 className="fortune-result-title">✨ 운명의 답변 ✨</h2>
      </div>
      <div className="fortune-result-content">
        <div className="fortune-result-text">
          <ReactMarkdown>{displayedText}</ReactMarkdown>
          {isTyping && <span className="typing-cursor">|</span>}
        </div>
      </div>
      {!isTyping && (
        <div className="fortune-result-actions">
          <Button onClick={handleCopy} variant="primary">
            {copied ? '✨ 기록이 복사되었습니다 ✨' : '📜 운명의 기록 긁어가기 📜'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FortuneResult;
