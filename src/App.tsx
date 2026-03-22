import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Layout, Server, ChevronDown } from 'lucide-react';
import { RESUME_DATA } from './data';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "var(--accent)",
          transformOrigin: "0%",
          zIndex: 100
        }}
      />
      
      {/* Navbar Structure */}
      <nav className="nav-glass flex-center" style={{
        position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
        padding: '12px 32px', zIndex: 50, gap: '24px'
      }}>
        {['About', 'Skills', 'Experience', 'Projects'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500,
            transition: 'color 0.3s'
          }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            {item}
          </a>
        ))}
      </nav>

      <main className="container">
        {/* HERO SECTION */}
        <section className="section flex-center" style={{ minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
          <FadeIn>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '1.2rem', letterSpacing: '2px' }}>HELLO, I'M</h2>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
                {RESUME_DATA.name.split(' ')[0]} <br />
                <span className="gradient-text">{RESUME_DATA.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                {RESUME_DATA.title}
              </p>
              
              <div className="flex-center" style={{ gap: '16px', marginBottom: '60px' }}>
                <a href={`mailto:${RESUME_DATA.email}`} className="btn btn-primary">
                  <Mail size={20} /> Contact Me
                </a>
                <a href={`https://${RESUME_DATA.linkedin}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '12px', borderRadius: '50%' }}>
                  <Linkedin size={24} />
                </a>
                <a href={`https://${RESUME_DATA.github}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '12px', borderRadius: '50%' }}>
                  <Github size={24} />
                </a>
              </div>
            </motion.div>
          </FadeIn>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', bottom: '40px' }}
          >
            <a href="#about" style={{ color: 'var(--text-secondary)' }}>
              <ChevronDown size={32} />
            </a>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <FadeIn>
            <h2 className="section-title">About Me</h2>
            <div className="glass-card" style={{ padding: '40px', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              <p>{RESUME_DATA.summary}</p>
            </div>
          </FadeIn>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section">
          <FadeIn>
            <h2 className="section-title">Technical Expertise</h2>
            <div className="grid grid-cols-2">
              {[
                { title: 'Languages', icon: <Code2 size={24} color="var(--accent)" />, items: RESUME_DATA.skills.languages },
                { title: 'Databases', icon: <Database size={24} color="var(--accent)" />, items: RESUME_DATA.skills.databases },
                { title: 'Tools & Platforms', icon: <Layout size={24} color="var(--accent)" />, items: RESUME_DATA.skills.tools },
                { title: 'Concepts', icon: <Server size={24} color="var(--accent)" />, items: RESUME_DATA.skills.concepts }
              ].map((skillCategory, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    {skillCategory.icon}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{skillCategory.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {skillCategory.items.map(skill => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section">
          <FadeIn>
            <h2 className="section-title">Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
                    background: 'var(--accent)', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px'
                  }} />
                  <div className="flex-between" style={{ marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>{exp.role}</h3>
                      <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{exp.company}</h4>
                    </div>
                    <div style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                      <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section">
          <FadeIn>
            <h2 className="section-title">Featured Projects</h2>
            <div className="grid grid-cols-2">
              {RESUME_DATA.projects.map((project, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                  <div className="flex-between" style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{project.name}</h3>
                    <ExternalLink size={20} color="var(--text-secondary)" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', flex: 1 }}>{project.description}</p>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tech.map(t => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>© {new Date().getFullYear()} {RESUME_DATA.name}. All rights reserved.</p>
        <div className="flex-center" style={{ gap: '16px', marginTop: '16px' }}>
          <a href={`https://${RESUME_DATA.linkedin}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}><Linkedin size={20} /></a>
          <a href={`https://${RESUME_DATA.github}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}><Github size={20} /></a>
        </div>
      </footer>
    </>
  );
}

export default App;
