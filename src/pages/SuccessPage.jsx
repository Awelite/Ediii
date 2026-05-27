import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import RisingLanterns from '../components/RisingLanterns';

const DUAS = [
  "May your rizq increase in beautiful ways and your heart remain peaceful.",
  "May Allah bless your family with endless joy and every success.",
  "May peace fill your heart and your good deeds be multiplied.",
  "May your kindness be rewarded and your duas answered with love.",
];

// Card dimensions — explicit px so html2canvas captures them reliably
const CARD_W = 320;
const CARD_H = 420;

export default function SuccessPage({ donorData }) {
  const [duaIndex, setDuaIndex] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | generating | done | error
  const cardRef = useRef(null);

  const donorName   = donorData?.name   || 'Kind Soul';
  const donorAmount = donorData?.amount || '–';

  /* Confetti burst on mount */
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

  /* Render the card to a canvas blob */
  const generateBlob = async () => {
    if (!cardRef.current) throw new Error('Card not mounted');
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#09122b',
      logging: false,
      width: CARD_W,
      height: CARD_H,
    });
    return new Promise((res, rej) =>
      canvas.toBlob(b => b ? res(b) : rej(new Error('toBlob failed')), 'image/png')
    );
  };

  /* Download */
  const handleDownload = async () => {
    if (status === 'generating') return;
    setStatus('generating');
    try {
      const blob = await generateBlob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `Eidi-${donorName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus('done');
    } catch (e) {
      console.error('Download failed:', e);
      setStatus('error');
    }
  };

  /* Share image directly (mobile) */
  const handleShare = async () => {
    if (status === 'generating') return;
    setStatus('generating');
    try {
      const blob = await generateBlob();
      const file = new File([blob], `Eidi-${donorName}.png`, { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Eidi Card 🌙',
          text: `JazakAllah Khair for the Eidi! 🌙`,
        });
      } else if (navigator.share) {
        await navigator.share({
          title: 'Eidi Card 🌙',
          text: `JazakAllah Khair ${donorName} for the Eidi! 🌙`,
          url: window.location.origin,
        });
      } else {
        // Desktop: fallback to download
        const url = URL.createObjectURL(blob);
        const a   = document.createElement('a');
        a.href = url; a.download = `Eidi-${donorName}.png`;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a); URL.revokeObjectURL(url);
      }
      setStatus('done');
    } catch (e) {
      if (e?.name !== 'AbortError') { console.error('Share failed:', e); setStatus('error'); }
      else setStatus('idle');
    }
  };

  const isLoading = status === 'generating';

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5 py-10"
    >
      <RisingLanterns />

      <motion.div
        className="relative z-10 w-full flex flex-col items-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ─── CARD ───
            Use explicit px width + height so html2canvas captures the full card.
            Center it with margin:auto.
        */}
        <div
          ref={cardRef}
          style={{
            width: CARD_W,
            height: CARD_H,
            maxWidth: '100%',
            margin: '0 auto 20px',
            background: 'linear-gradient(155deg,#09122b 0%,#0d1f3c 52%,#071b12 100%)',
            borderRadius: 22,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '30px 24px 24px',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 24px 60px -12px rgba(0,0,0,0.8)',
          }}
        >
          {/* Crosshatch pattern */}
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none', opacity:0.04,
            backgroundImage:`url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v20H0zm20 0h1v20h-1zM0 0v1h20V0zm0 20v1h20v-1z' fill='%23fff'/%3E%3C/svg%3E")`,
          }}/>

          {/* Top emerald bar */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:2.5,
            background:'linear-gradient(90deg,transparent,#10b981 50%,transparent)',
          }}/>

          {/* Gold glow top */}
          <div style={{
            position:'absolute', top:-50, left:'50%', transform:'translateX(-50%)',
            width:200, height:100,
            background:'rgba(251,191,36,0.12)',
            borderRadius:'50%', filter:'blur(36px)', pointerEvents:'none',
          }}/>

          {/* — TOP BLOCK — */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', width:'100%', gap:0 }}>

            {/* Badge */}
            <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:18 }}>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'rgba(251,191,36,0.7)' }}/>
              <span style={{
                fontFamily:'Inter,sans-serif', fontSize:8.5, fontWeight:700,
                letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(251,191,36,0.7)',
              }}>Eidi Received</span>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'rgba(251,191,36,0.7)' }}/>
            </div>

            {/* Thank you */}
            <p style={{
              fontFamily:'Playfair Display,serif', fontStyle:'italic', fontWeight:300,
              fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:6, letterSpacing:0.4,
            }}>
              Thank you so much,
            </p>

            {/* Donor name — use solid gold, NOT webkit gradient (breaks html2canvas) */}
            <h1 style={{
              fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:36,
              color:'#fbbf24',                        /* solid gold — renders in html2canvas */
              lineHeight:1.1, marginBottom:18, wordBreak:'break-word',
            }}>
              {donorName}
            </h1>

            {/* Amount pill */}
            <div style={{
              background:'rgba(255,255,255,0.06)',
              border:'1px solid rgba(255,255,255,0.11)',
              borderRadius:11, padding:'8px 18px',
            }}>
              <span style={{
                fontFamily:'Inter,sans-serif', fontSize:11.5,
                color:'rgba(255,255,255,0.55)', fontWeight:300,
              }}>
                For your generous Eidi of{' '}
                <span style={{ color:'#ffffff', fontWeight:600, fontSize:15 }}>₹{donorAmount}</span>
              </span>
            </div>
          </div>

          {/* — DUA — */}
          <div style={{
            flex:1, display:'flex', alignItems:'center', justifyContent:'center',
            textAlign:'center', padding:'18px 10px',
          }}>
            <p style={{
              fontFamily:'Playfair Display,serif', fontStyle:'italic', fontWeight:400,
              fontSize:13, color:'rgba(226,232,240,0.72)', lineHeight:1.8, letterSpacing:0.2,
            }}>
              "{DUAS[duaIndex]}"
            </p>
          </div>

          {/* — SIGNATURE — */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'100%' }}>
            <div style={{ width:32, height:1, background:'rgba(255,255,255,0.18)', marginBottom:9 }}/>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:8, fontWeight:700,
              letterSpacing:'0.2em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.28)', marginBottom:3,
            }}>Sent with love by</p>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:10.5, fontWeight:500,
              letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)',
            }}>Hassibul Kausir</p>
          </div>

          {/* Emerald glow bottom-right */}
          <div style={{
            position:'absolute', bottom:-28, right:16,
            width:90, height:65,
            background:'rgba(16,185,129,0.1)',
            borderRadius:'50%', filter:'blur(24px)', pointerEvents:'none',
          }}/>
        </div>

        {/* ─── BUTTONS ─── */}
        <div style={{
          display:'flex', gap:12, width:'100%',
          maxWidth: CARD_W, margin:'0 auto',
        }}>
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="btn-primary flex-1"
            style={{ fontSize:12, justifyContent:'center' }}
          >
            {isLoading ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation:'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            )}
            {isLoading ? 'Saving…' : 'Save Card'}
          </button>

          <button
            onClick={handleShare}
            disabled={isLoading}
            className="btn-secondary flex-1"
            style={{ fontSize:12, justifyContent:'center' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
        </div>

        {/* New Dua */}
        <button
          onClick={() => { setDuaIndex(i => (i + 1) % DUAS.length); setStatus('idle'); }}
          style={{
            marginTop:20, background:'none', border:'none', cursor:'pointer',
            fontFamily:'Inter,sans-serif', fontSize:10, fontWeight:600,
            letterSpacing:'0.18em', textTransform:'uppercase',
            color:'rgba(255,255,255,0.3)',
          }}
        >
          New Dua ↺
        </button>
      </motion.div>

      {/* Spin animation for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
