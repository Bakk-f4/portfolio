import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import TimelineItem from './TimelineItem';
import CareerDetailPanel from './CareerDetailPanel';

const Timeline = ({ items }) => {
  const [selectedId, setSelectedId] = useState(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const selected = items.find(i => i.id === selectedId) ?? null;

  const handleSelect = (id) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  return (
    <div className="timeline-container">
      {isMobile ? (
        <>
          <div className="timeline-list-col">
            {items.map(item => (
              <TimelineItem
                key={item.id}
                item={item}
                isActive={selectedId === item.id}
                onClick={() => handleSelect(item.id)}
              />
            ))}
          </div>
          <Drawer
            anchor="bottom"
            open={!!selected}
            onClose={() => setSelectedId(null)}
            PaperProps={{ style: { borderRadius: '12px 12px 0 0', backgroundColor: '#1a1d21', color: '#f2f2f2' } }}
          >
            <div className="drawer-content">
              <AnimatePresence>
                {selected && (
                  <CareerDetailPanel key={selected.id} item={selected} onClose={() => setSelectedId(null)} />
                )}
              </AnimatePresence>
            </div>
          </Drawer>
        </>
      ) : (
        <div className="timeline-split">
          <motion.div
            className={`timeline-list-col${selected ? ' has-selection' : ''}`}
            animate={{ width: selected ? '38%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {items.map(item => (
              <TimelineItem
                key={item.id}
                item={item}
                isActive={selectedId === item.id}
                onClick={() => handleSelect(item.id)}
              />
            ))}
          </motion.div>
          <AnimatePresence>
            {selected && (
              <CareerDetailPanel item={selected} />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Timeline;
