import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Developed by{' '}
          <a 
            href="https://my-vibe-chan.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Chan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

