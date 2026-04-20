import { render, screen, fireEvent } from '@testing-library/react';
import Timeline from './Timeline';

const mockItems = [
  {
    id: '1',
    role: 'Junior Developer',
    company: 'Corp A',
    period: '2019 – 2021',
    location: 'Milan, IT',
    description: 'Did stuff.',
    tech: ['C#', 'React'],
    achievements: ['Built things'],
    links: []
  },
  {
    id: '2',
    role: 'Senior Developer',
    company: 'Corp B',
    period: '2021 – present',
    location: 'Rome, IT',
    description: 'Did more stuff.',
    tech: ['.NET 8'],
    achievements: ['Built more things'],
    links: [{ label: 'Site', url: 'https://example.com' }]
  }
];

jest.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy({}, {
    get: (_, tag) => {
      const strip = ['initial','animate','exit','transition','variants','whileHover','whileTap','whileFocus','layout','layoutId'];
      return React.forwardRef(({ children, ...props }, ref) => {
        const filtered = Object.fromEntries(Object.entries(props).filter(([k]) => !strip.includes(k)));
        return React.createElement(tag, { ...filtered, ref }, children);
      });
    }
  });
  const AnimatePresence = ({ children }) => React.createElement(React.Fragment, null, children);
  return { motion, AnimatePresence };
});
jest.mock('@mui/material/useMediaQuery', () => () => false);

test('renders all timeline items', () => {
  render(<Timeline items={mockItems} />);
  expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  expect(screen.getByText('Senior Developer')).toBeInTheDocument();
});

test('detail panel hidden before any click', () => {
  render(<Timeline items={mockItems} />);
  expect(screen.queryByText('Did stuff.')).not.toBeInTheDocument();
});

test('detail panel shows on item click', () => {
  render(<Timeline items={mockItems} />);
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.getByText('Did stuff.')).toBeInTheDocument();
});

test('switching items updates panel content', () => {
  render(<Timeline items={mockItems} />);
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.getByText('Did stuff.')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Senior Developer'));
  expect(screen.getByText('Did more stuff.')).toBeInTheDocument();
});

test('clicking active item closes panel', () => {
  render(<Timeline items={mockItems} />);
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.getByText('Did stuff.')).toBeInTheDocument();
  fireEvent.click(screen.getAllByText('Junior Developer')[0]);
  expect(screen.queryByText('Did stuff.')).not.toBeInTheDocument();
});
