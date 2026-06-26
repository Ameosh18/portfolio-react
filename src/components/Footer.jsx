export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-row">

        {/* Left: legal */}
        <div className="footer-legal">
          <p>&copy; {new Date().getFullYear()} Ameya Kulkarni<br />All rights reserved.</p>
        </div>

        {/* Center: positioning statement */}
        <div className="footer-center">
          <span className="footer-exploring-label">Currently exploring</span>
          <p className="footer-statement">
            AI-native product experiences &amp; zero-to-one design leadership
          </p>
        </div>

        {/* Right: contact */}
        <div className="footer-contact">
          <a
            href="https://linkedin.com/in/ameosh18"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            LinkedIn ↗︎
          </a>
          <a href="mailto:ameosh18@gmail.com" className="footer-email">
            ameosh18@gmail.com
          </a>
        </div>

      </div>
    </footer>
  )
}
