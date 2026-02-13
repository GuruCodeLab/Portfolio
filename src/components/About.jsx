const EXPERTISE_ICONS = {
  server: '🖥️',
  code: '💻',
  cloud: '☁️',
  database: '🗄️',
  workflow: '⚙️',
  users: '👥',
};

function getExpertiseIcon(iconKey) {
  return EXPERTISE_ICONS[iconKey] ?? '◆';
}

export default function About({ data }) {
  const { about, expertise } = data;
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Introduction</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto var(--spacing-lg)' }}>
          <p
            style={{
              fontSize: '1.25rem',
              lineHeight: '1.8',
              textAlign: 'center',
            }}
          >
            {about.introduction}
          </p>
        </div>

        <div className="grid grid-3">
          {expertise.core.map((item, index) => (
            <div key={index} className="card expertise-card reveal">
              <div className="expertise-icon">
                {getExpertiseIcon(item.icon)}
              </div>
              <h4>{item.area}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="stats-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
          <div className="stat-card">
            <div className="stat-value">8+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">20+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">$10B+</div>
            <div className="stat-label">Assets Managed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
