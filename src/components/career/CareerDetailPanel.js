import { motion } from 'framer-motion';

const CareerDetailPanel = ({ item, onClose }) => (
  <motion.div
    className="career-detail-panel"
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 40, opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {onClose && (
      <div className="drawer-close-row">
        <button className="drawer-close-btn" onClick={onClose} aria-label="Close">×</button>
      </div>
    )}

    <h2 className="detail-role">{item.role}</h2>
    <p className="detail-meta">{item.company} · {item.period} · {item.location}</p>
    <p className="detail-desc">{item.description}</p>

    {(item.tech ?? []).length > 0 && (
      <>
        <div className="detail-section-label">Tech Stack</div>
        <div className="tech-chips">
          {(item.tech ?? []).map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
      </>
    )}

    {(item.achievements ?? []).length > 0 && (
      <>
        <div className="detail-section-label">Achievements</div>
        <ul className="achievements-list">
          {(item.achievements ?? []).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </>
    )}

    {(item.links ?? []).length > 0 && (
      <div className="detail-links">
        {(item.links ?? []).map(link => (
          <a
            key={link.label}
            href={link.url}
            className="detail-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    )}
  </motion.div>
);

export default CareerDetailPanel;
