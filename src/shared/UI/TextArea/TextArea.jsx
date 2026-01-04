import './TextArea.css';

const TextArea = ({ value, onChange, placeholder, disabled }) => {
  return (
    <textarea
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={6}
    />
  );
};

export default TextArea;

