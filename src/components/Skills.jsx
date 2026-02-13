export default function Skills({ data }) {
  const { technicalSkills, achievements } = data;
  const categories = technicalSkills
    ? Object.values(technicalSkills)
    : [];

  return (
    <section
      id="skills"
      className="section"
      style={{ background: 'rgba(45, 48, 71, 0.2)' }}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-label">Technologies</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card skill-category reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h4>{category.category}</h4>
              <div className="skill-items">
                {category.items.map((skill, idx) => (
                  <span key={idx} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {achievements && achievements.length > 0 && (
          <div
            style={{
              marginTop: 'var(--spacing-lg)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-accent)',
              }}
            >
              Key Achievements
            </h3>
            <div className="grid grid-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id || index}
                  className="card reveal"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    padding: 'var(--spacing-md)',
                  }}
                >
                  <h4
                    style={{
                      marginBottom: 'var(--spacing-xs)',
                      color: 'var(--color-light)',
                    }}
                  >
                    {achievement.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                  >
                    {achievement.description}
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-secondary)',
                      fontWeight: '600',
                    }}
                  >
                    {achievement.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
