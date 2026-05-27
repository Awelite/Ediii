import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import Mascot from '../components/Mascot';
import RisingLanterns from '../components/RisingLanterns';

const DUAS = [
  "May your rizq increase in beautiful ways and your heart remain peaceful.",
  "May Allah bless your family with endless joy and every success.",
  "May peace fill your heart and your good deeds be multiplied.",
  "May your kindness be rewarded and your duas answered with love.",
];

export default function SuccessPage({ donorData }) {
  const [duaIndex, setDuaIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef(null);

  const donorName   = donorData?.name   || 'Kind Soul';
  const donorAmount = donorData?.amount || '–';

  useEffect(() => {
    const end = Date.now() + 2500;
    const colors = ['#fbbf24', '#f59e0b', '#ffffff', '#34d399'];
    const burst = () => {
      confetti({ particleCount: 3, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(burst);
    };
    burst();
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, useCORS: true, backgroundColor: '#09122b', logging: false,
      });
      const link = document.createElement('a');
      link.download = `Eidi-${donorName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) { console.error(e); }
    finally { setIsGenerating(false); }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    // Generate the card as a high-res PNG blob first
    let blob;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#09122b',
        logging: false,
      });
      blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    } catch (e) {
      console.error('Card export failed', e);
      return;
    }

    const file = new File([blob], `Eidi-${donorName}.png`, { type: 'image/png' });

    // Use Web Share API with files — WhatsApp picks up the image directly
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Eidi Card 🌙',
          text: `JazakAllah Khair for the Eidi! 🌙`,
        });
      } catch (e) {
        if (e.name !== 'AbortError') console.error('Share failed', e);
      }
    } else if (navigator.share) {
      // Fallback: share without file (older browsers)
      try {
        await navigator.share({
          title: 'Eidi Card 🌙',
          text: `JazakAllah Khair ${donorName} for the Eidi! 🌙`,
          url: window.location.origin,
        });
      } catch {}
    } else {
      // Desktop fallback: just download
      handleDownload();
    }
  };

  const card = {
    outer: {
      width: '100%', aspectRatio: '4/5',
      background: 'linear-gradient(155deg,#09122b 0%,#0d1f3c 50%,#071b12 100%)',
      borderRadius: 24, overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'space-between', padding: '36px 28px 28px',
      marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 32px 64px -16px rgba(0,0,0,0.7)',
    },
    badge: {
      display: 'flex', alignItems: 'center', gap: 7, marginBottom: 20,
    },
    dot: {
      width: 4, height: 4, borderRadius: '50%',
      background: '#fbbf24', opacity: 0.7,
    },
    badgeText: {
      fontFamily: 'Inter,sans-serif', fontSize: 9, fontWeight: 700,
      letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.7)',
    },
    subtitle: {
      fontFamily: 'Playfair Display,serif', fontWeight: 300, fontStyle: 'italic',
      fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 4, letterSpacing: 0.5,
    },
    name: {
      fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 38,
      background: 'linear-gradient(135deg,#fcd34d,#f59e0b)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      lineHeight: 1.1, marginBottom: 20, wordBreak: 'break-word',
    },
    amountPill: {
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12, padding: '9px 20px',
    },
    amountLabel: {
      fontFamily: 'Inter,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 300,
    },
    amountValue: { color: '#fff', fontWeight: 600, fontSize: 16 },
    dua: {
      fontFamily: 'Playfair Display,serif', fontStyle: 'italic', fontWeight: 400,
      fontSize: 13.5, color: 'rgba(226,232,240,0.7)', lineHeight: 1.75, letterSpacing: 0.2,
    },
    sigLine: { width: 36, height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 10 },
    sigBy: {
      fontFamily: 'Inter,sans-serif', fontSize: 8.5, fontWeight: 700,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 3,
    },
    sigName: {
      fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 500,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
    },
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5 py-12">
      <RisingLanterns />

      <motion.div
        className="relative z-10 w-full max-w-[340px] mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Card */}
        <div ref={cardRef} style={card.outer}>
          {/* Cross-hatch bg */}
          <div style={{ position:'absolute',inset:0,opacity:0.035,backgroundImage:`url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0zm32 0h1v32h-1zM0 0v1h32V0zm0 32v1h32v-1z' fill='%23ffffff'/%3E%3C/svg%3E")` }} />
          {/* Emerald top bar */}
          <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,#10b981 50%,transparent)' }} />
          {/* Gold glow */}
          <div style={{ position:'absolute',top:-40,left:'50%',transform:'translateX(-50%)',width:180,height:80,background:'rgba(251,191,36,0.1)',borderRadius:'50%',filter:'blur(32px)',pointerEvents:'none' }} />

          {/* Top block */}
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',width:'100%' }}>
            <div style={card.badge}>
              <div style={card.dot} /><span style={card.badgeText}>Eidi Received</span><div style={card.dot} />
            </div>
            <p style={card.subtitle}>Thank you so much,</p>
            <h1 style={card.name}>{donorName}</h1>
            <div style={card.amountPill}>
              <span style={card.amountLabel}>
                For your generous Eidi of{' '}
                <span style={card.amountValue}>₹{donorAmount}</span>
              </span>
            </div>
          </div>

          {/* Dua */}
          <div style={{ flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px 8px',textAlign:'center' }}>
            <p style={card.dua}>"{DUAS[duaIndex]}"</p>
          </div>

          {/* Signature */}
          <div style={{ display:'flex',flexDirection:'column',alignItems:'center',width:'100%' }}>
            <div style={card.sigLine} />
            <p style={card.sigBy}>Sent with love by</p>
            <p style={card.sigName}>Hassibul Kausir</p>
          </div>

          {/* Mascot */}
          <div style={{ position:'absolute',bottom:14,right:10,transform:'scale(0.42)',transformOrigin:'bottom right',opacity:0.8,pointerEvents:'none' }}>
            <Mascot mood="pray" size="sm" />
          </div>
          {/* Emerald glow bottom */}
          <div style={{ position:'absolute',bottom:-30,right:20,width:100,height:70,background:'rgba(16,185,129,0.1)',borderRadius:'50%',filter:'blur(28px)',pointerEvents:'none' }} />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button onClick={handleDownload} disabled={isGenerating} className="btn-primary flex-1" style={{ fontSize:12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {isGenerating ? 'Saving…' : 'Save Card'}
          </button>
          <button onClick={handleShare} className="btn-secondary flex-1" style={{ fontSize:12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
        </div>

        <button
          onClick={() => setDuaIndex(i => (i + 1) % DUAS.length)}
          className="label-overline mt-5 cursor-pointer hover:opacity-60 transition-opacity"
        >
          New Dua ↺
        </button>
      </motion.div>
    </div>
  );
}
