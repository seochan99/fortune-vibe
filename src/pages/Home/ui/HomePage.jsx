import { useState } from 'react';
import UserInput from '../../../features/User_Input';
import FortuneResult from '../../../features/Fortune_Result';
import { Loading } from '../../../shared/UI';
import MysticBackground from '../../../shared/UI/MysticBackground/MysticBackground';
import { useFortuneAI } from '../../../shared/Lib/Hooks/useFortuneAI';
import './HomePage.css';

const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const { askFortune, result, is_loading, error } = useFortuneAI();

  const handleSubmit = async () => {
    if (!prompt.trim() || is_loading) return;
    await askFortune(prompt);
  };

  return (
    <div className="home-page">
      <MysticBackground />
      <div className="home-page-container">
        <header className="home-page-header">
          <h1 className="home-page-title">🔮 포춘 바이브 🔮</h1>
          <p className="home-page-subtitle">AI 오라클이 당신의 운명을 읽어드립니다</p>
        </header>

        <main className="home-page-main">
          <UserInput
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={handleSubmit}
            is_loading={is_loading}
          />

          {is_loading && <Loading />}

          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
            </div>
          )}

          {!is_loading && !error && result && (
            <FortuneResult result={result} />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
