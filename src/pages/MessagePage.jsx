import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};
const rise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

export default function MessagePage({ onContinue }) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5 py-12">

      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(251,191,36,0.06) 0%, transparent 70%)',
      }}/>

      <motion.div
        className="relative w-full max-w-[340px] mx-auto flex flex-col items-center text-center"
        style={{ zIndex:1 }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        <motion.div variants={rise} className="glass-pill mb-7 px-5 py-2 flex items-center gap-2.5">
          <span style={{ width:4,height:4,borderRadius:'50%',background:'rgba(251,191,36,0.7)',display:'inline-block' }}/>
          <span className="label-overline" style={{ color:'rgba(251,191,36,0.7)' }}>Message for Elders</span>
          <span style={{ width:4,height:4,borderRadius:'50%',background:'rgba(251,191,36,0.7)',display:'inline-block' }}/>
        </motion.div>

        {/* Emoji */}
        <motion.div variants={rise} style={{ marginBottom:20 }}>
          <motion.span
            animate={{ rotate:[-4,4,-4], y:[0,-5,0] }}
            transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
            style={{ fontSize:52, display:'block', lineHeight:1 }}
          >😈</motion.span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={rise}
          style={{
            fontFamily:'Playfair Display, serif', fontWeight:400,
            fontSize:'clamp(1.6rem, 7vw, 2.1rem)',
            lineHeight:1.15, color:'#fff',
            marginBottom:20, letterSpacing:'-0.01em',
          }}
        >
          Ek Zaroori <em style={{ color:'rgba(255,255,255,0.65)' }}>Paigham</em>
        </motion.h2>

        {/* Message card */}
        <motion.div
          variants={rise}
          style={{
            width:'100%', marginBottom:20,
            background:'rgba(255,255,255,0.03)',
            backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
            border:'1px solid rgba(251,191,36,0.15)',
            borderRadius:20,
            padding:'24px 22px',
          }}
        >
          {/* Top gold line */}
          <div style={{ height:1.5, width:'100%', marginBottom:18,
            background:'linear-gradient(90deg,transparent,rgba(251,191,36,0.5),transparent)' }}/>

          <p style={{
            fontFamily:'Playfair Display, serif', fontStyle:'italic',
            fontSize:'clamp(0.92rem, 4vw, 1.05rem)',
            lineHeight:1.9, color:'rgba(248,250,252,0.82)',
            fontWeight:400,
          }}>
            "Shaitan aapko Eidi dene se{' '}
            <span style={{ color:'#fbbf24', fontWeight:700, fontStyle:'normal' }}>Rokega</span>,
            {' '}Lekin Aap Shaitan ke behkave mein na aayen aur{' '}
            <span style={{ color:'#34d399', fontWeight:700, fontStyle:'normal' }}>Dil khol ke</span>
            {' '}Hasb-e-taufeeq Eidi dein!!"
          </p>

          {/* Bottom gold line */}
          <div style={{ height:1.5, width:'100%', marginTop:18,
            background:'linear-gradient(90deg,transparent,rgba(251,191,36,0.5),transparent)' }}/>
        </motion.div>

        {/* Sub-note */}
        <motion.p
          variants={rise}
          style={{
            fontSize:'clamp(0.78rem, 3.5vw, 0.88rem)',
            fontWeight:300, lineHeight:1.6,
            color:'rgba(248,250,252,0.45)',
            marginBottom:32,
          }}
        >
          Yaad rakhein — Eidi dena Sunnah-e-Mubaraka bhi hai 😇
        </motion.p>

        {/* CTA */}
        <motion.div variants={rise} style={{ width:'100%' }}>
          <button onClick={onContinue} className="btn-primary group w-full" style={{ justifyContent:'center' }}>
            Theek Hai, Chalte Hain
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
