export default function Contact({ data }) {
  const { contact, education } = data;
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            I'm always interested in hearing about new opportunities and
            collaborations
          </p>
        </div>

        <div className="contact-grid">
          <div className="card contact-card reveal">
            <div className="contact-icon">📧</div>
            <h4>Email</h4>
            <a
              href={`mailto:${contact.email}`}
              className="contact-link"
            >
              {contact.email}
            </a>
          </div>

          <div
            className="card contact-card reveal"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="contact-icon">📱</div>
            <h4>Phone</h4>
            <a
              href={`tel:${contact.phone}`}
              className="contact-link"
            >
              {contact.phone}
            </a>
          </div>

          <div
            className="card contact-card reveal"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="contact-icon">📍</div>
            <h4>Location</h4>
            <p style={{ margin: 0, color: 'var(--color-muted)' }}>
              {contact.location}
            </p>
          </div>
        </div>

        {education && education.length > 0 && (
          <div
            style={{
              marginTop: 'var(--spacing-lg)',
              textAlign: 'center',
            }}
          >
            <div
              className="card"
              style={{
                display: 'inline-block',
                padding: 'var(--spacing-md) var(--spacing-lg)',
              }}
            >
              <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Education</h4>
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <p
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {edu.degree} in {edu.field}
                  </p>
                  <p
                    style={{
                      color: 'var(--color-secondary)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {edu.period.start} - {edu.period.end}
                    {edu.grade ? ` | ${edu.grade}` : ''}
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
