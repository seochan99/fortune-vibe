import { TextArea, Button } from '../../../shared/UI';
import './UserInput.css';

const UserInput = ({ prompt, onPromptChange, onSubmit, is_loading }) => {
  return (
    <div className="user-input">
      <label htmlFor="question-input" className="user-input-label">
        운명에 묻고 싶은 질문을 입력하세요
      </label>
      <TextArea
        id="question-input"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="예: 내일의 운세는 어떨까요?"
        disabled={is_loading}
      />
      <div className="user-input-button">
        <Button onClick={onSubmit} disabled={is_loading || !prompt.trim()}>
          운명에 묻기
        </Button>
      </div>
    </div>
  );
};

export default UserInput;
