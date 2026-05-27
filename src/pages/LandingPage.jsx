import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
const rise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

export default function LandingPage({ onContinue }) {
  return (
    <div
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* ── Background image ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/eid-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Gradient: keep top light, darken bottom for text ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(
            to bottom,
            rgba(5,8,22,0.25) 0%,
            rgba(5,8,22,0.10) 25%,
            rgba(5,8,22,0.55) 55%,
            rgba(5,8,22,0.88) 80%,
            rgba(5,8,22,0.97) 100%
          )`,
        }}
      />

      {/* ── Content pinned to bottom so image breathes above ── */}
      <div
        className="relative flex flex-col items-center text-center mt-auto px-5 pb-10"
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="w-full max-w-sm mx-auto flex flex-col items-center"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div variants={rise} className="glass-pill mb-6 px-5 py-2 flex items-center gap-2.5">
            <span style={{ width:4, height:4, borderRadius:'50%', background:'rgba(255,255,255,0.45)', display:'inline-block' }} />
            <span className="label-overline">A Special Eid Greeting</span>
            <span style={{ width:4, height:4, borderRadius:'50%', background:'rgba(255,255,255,0.45)', display:'inline-block' }} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={rise}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 12vw, 5rem)',
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              marginBottom: '0.3em',
              textShadow: '0 2px 24px rgba(0,0,0,0.8)',
            }}
          >
            Eid Al-Adha
            <br />
            <em style={{ color:'rgba(255,255,255,0.7)', fontStyle:'italic' }}>Mubarak</em>
          </motion.h1>

          {/* Gold divider */}
          <motion.div
            variants={rise}
            style={{
              width:48, height:1.5, marginBottom:20,
              background:'linear-gradient(90deg,transparent,rgba(251,191,36,0.8),transparent)',
            }}
          />

          {/* Subtitle */}
          <motion.p
            variants={rise}
            style={{
              fontSize:'clamp(0.82rem,3.5vw,0.95rem)',
              fontWeight:300, lineHeight:1.7,
              color:'rgba(248,250,252,0.65)',
              maxWidth:300, marginBottom:36,
            }}
          >
            May this blessed occasion bring your heart peace,
            your family joy, and your home endless barakah.
          </motion.p>

          {/* CTA */}
          <motion.div variants={rise} style={{ width:'100%' }}>
            <button onClick={onContinue} className="btn-primary group w-full" style={{ justifyContent:'center' }}>
              Send Eidi
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </motion.div>

          {/* Sub-caption */}
          <motion.p variants={rise} className="label-overline mt-5">
            A small gift to share the joy
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
