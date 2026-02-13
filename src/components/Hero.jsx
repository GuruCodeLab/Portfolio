export default function Hero({ data }) {
  const { hero } = data;
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-label">
            {hero.yearsOfExperience}+ Years of Excellence
          </span>
          <h1 className="hero-title">{hero.name}</h1>
          <h2 className="hero-subtitle">{hero.title}</h2>
          <p className="hero-description">{hero.subtitle}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
