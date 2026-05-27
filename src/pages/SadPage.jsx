import { motion } from 'framer-motion';
import Mascot from '../components/Mascot';

const rainDrops = Array.from({ length: 35 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 0.9 + Math.random() * 1.2,
  height: 12 + Math.random() * 22,
}));

export default function SadPage({ onGoBack }) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5">

      {/* Rain */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        {rainDrops.map(d => (
          <motion.div
            key={d.id}
            className="absolute top-[-50px] w-px bg-gradient-to-b from-transparent via-slate-400 to-transparent"
            style={{ left: `${d.x}%`, height: `${d.height}px` }}
            animate={{ y: ['0vh', '110vh'] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'linear' }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cat */}
        <div className="mb-8 opacity-70" style={{ filter: 'grayscale(30%)' }}>
          <Mascot mood="sad" size="lg" />
        </div>

        {/* Heading */}
        <motion.h2
          className="heading-display mb-4"
          style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Even the moon looks a little
          <br /><em>disappointed</em>
        </motion.h2>

        <motion.p
          className="body-copy mb-10"
          style={{ fontSize: '0.9rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          My tiny Eid heart is broken.
        </motion.p>

        <motion.button
          onClick={onGoBack}
          className="btn-secondary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          whileTap={{ scale: 0.97 }}
        >
          Fine… I'll wait 😭
        </motion.button>
      </motion.div>
    </div>
  );
}
