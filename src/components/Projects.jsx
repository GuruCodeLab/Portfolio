export default function Projects({ data }) {
  const { projects } = data;

  const getImpactMetrics = (project) => {
    const impact = project.impact;
    if (!impact) return [];
    if (Array.isArray(impact)) return impact;
    if (impact.metrics && Array.isArray(impact.metrics)) {
      return impact.metrics.map((m) => ({
        label: m.label,
        value: m.value,
        context: m.context,
      }));
    }
    return [];
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of impactful projects demonstrating technical excellence
            and business value
          </p>
        </div>

        <div className="grid grid-2">
          {projects.map((project, index) => {
            const metrics = getImpactMetrics(project);
            const keyFeatures = project.keyFeatures || [];
            return (
              <div
                key={project.id}
                className="card project-card reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="project-header">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>

                <p className="project-description">{project.overview}</p>

                {keyFeatures.length > 0 && (
                  <div style={{ marginTop: 'var(--spacing-sm)' }}>
                    <h4
                      style={{
                        fontSize: '1rem',
                        marginBottom: '0.75rem',
                        color: 'var(--color-accent)',
                      }}
                    >
                      Key Features
                    </h4>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      {keyFeatures.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          style={{
                            marginBottom: '0.5rem',
                            paddingLeft: '1.5rem',
                            position: 'relative',
                            fontSize: '0.95rem',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--color-accent)',
                            }}
                          >
                            ✓
                          </span>
                          <strong>{feature.feature}:</strong>{' '}
                          {feature.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {metrics.length > 0 && (
                  <div
                    style={{
                      marginTop: 'var(--spacing-sm)',
                      padding: 'var(--spacing-sm)',
                      background: 'rgba(224, 164, 88, 0.1)',
                      borderRadius: '8px',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem',
                        color: 'var(--color-accent)',
                      }}
                    >
                      Impact
                    </h4>
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--spacing-sm)',
                        flexWrap: 'wrap',
                      }}
                    >
                      {metrics.map((stat, idx) => (
                        <div key={idx} style={{ fontSize: '0.85rem' }}>
                          <strong
                            style={{ color: 'var(--color-accent)' }}
                          >
                            {stat.value}
                          </strong>
                          <span
                            style={{
                              color: 'var(--color-muted)',
                              marginLeft: '0.25rem',
                            }}
                          >
                            {stat.label}
                            {stat.context ? ` (${stat.context})` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="tech-stack">
                  {(project.technologies || [])
                    .slice(0, 6)
                    .map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
