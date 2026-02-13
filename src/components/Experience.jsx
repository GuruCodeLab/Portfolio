export default function Experience({ data }) {
  const { experience } = data;
  return (
    <section
      id="experience"
      className="section"
      style={{ background: 'rgba(45, 48, 71, 0.2)' }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-label">Career Journey</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className="experience-item reveal"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="experience-header">
              <h3 className="experience-position">{exp.position}</h3>
              <div className="experience-company">{exp.company}</div>
              <div className="experience-meta">
                <span className="experience-badge">{exp.period.duration}</span>
                <span className="experience-badge">{exp.location}</span>
              </div>
            </div>

            <p
              style={{
                marginBottom: 'var(--spacing-sm)',
                color: 'rgba(248, 249, 250, 0.85)',
              }}
            >
              {exp.summary}
            </p>

            <ul className="achievement-list">
              {exp.keyAchievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>

            <div className="tech-stack">
              {exp.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
