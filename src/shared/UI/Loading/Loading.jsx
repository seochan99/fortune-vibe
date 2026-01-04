import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/Loading.json';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="lottie-animation">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          autoplay={true}
          style={{ width: 250, height: 250, background: 'transparent' }}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid meet',
            clearCanvas: true,
            context: {
              willReadFrequently: false,
            },
          }}
        />
      </div>
      <p className="loading-text">운명을 읽는 중...</p>
    </div>
  );
};

export default Loading;

