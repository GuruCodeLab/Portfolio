export default function Footer({ data }) {
  const name = data?.hero?.name || 'Portfolio';
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ marginBottom: 'var(--spacing-sm)' }}>
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <p style={{ fontSize: '0.875rem' }}>
          Built with React | Designed for Impact
        </p>
      </div>
    </footer>
  );
}
