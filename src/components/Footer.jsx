export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Ameya Kulkarni. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://linkedin.com/in/ameyakulkarni" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://twitter.com/ameyakulkarni" target="_blank" rel="noopener">Twitter</a>
          <a href="mailto:ameya@example.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
