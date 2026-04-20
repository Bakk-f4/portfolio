import { motion } from 'framer-motion';

const TimelineItem = ({ item, isActive, onClick }) => (
  <motion.div
    className={`timeline-item${isActive ? ' active' : ''}`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    <div className="tl-dot" />
    <div>
      <span className="tl-period">{item.period}</span>
      <h3 className="tl-role">{item.role}</h3>
      <span className="tl-company">{item.company}</span>
    </div>
  </motion.div>
);

export default TimelineItem;
