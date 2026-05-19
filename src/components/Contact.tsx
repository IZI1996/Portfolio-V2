import { GitHubIcon, LinkedInIcon, EmailIcon } from "./icons"; // We'll create these

export default function Contact() {
  return (
    <footer id="contact">
      <div className="wrapper">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo">&#x3C;KI /&#x3E;</a>
            <p className="footer-desc">
              Living, learning, &amp; leveling up one day at a time. Building digital experiences with purpose and precision.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/IZI1996" className="footer-social" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://www.linkedin.com/in/kaoutar-izi-3249351b8/" className="footer-social" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="mailto:izikaoutar@gmail.com" className="footer-social" aria-label="Email">
                <EmailIcon />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Me</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Location:</span>
              <span className="footer-contact-val">Tanger, Morocco</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Email:</span>
              <span className="footer-contact-val">
                <a href="mailto:hello@kaoutarizi.dev">izikaoutar@gmail.com</a>
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} Kaoutar IZI. All Rights Reserved.</span>
          <span className="footer-made">&lt;/&gt; with <span className="heart">♥</span> by Kaoutar</span>
        </div>
      </div>
    </footer>
  );
}