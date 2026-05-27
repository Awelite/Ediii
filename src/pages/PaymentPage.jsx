import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import FloatingStars from '../components/FloatingStars';

export default function PaymentPage({ onPaid, showConfirmModal, onConfirmYes, onConfirmNo }) {
  const [name, setName]     = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError]   = useState('');

  const upiId  = 'hassibulkausir2020@oksbi';
  const myName = 'Hassibul Kausir';
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(myName)}&cu=INR`;

  const handleConfirm = () => {
    if (!name.trim())   { setError('Please enter your name so I can thank you!'); return; }
    if (!amount.trim()) { setError('Please enter the amount you sent!'); return; }
    setError('');
    onConfirmYes({ name: name.trim(), amount: amount.trim() });
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-5 py-10">
      <FloatingStars />

      <motion.div
        className="relative w-full max-w-[340px] mx-auto"
        style={{ zIndex:1 }}
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
      >
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <p className="label-overline" style={{ marginBottom:10 }}>Payment</p>
          <h2 style={{
            fontFamily:'Playfair Display, serif', fontWeight:400,
            fontSize:'clamp(1.6rem, 7vw, 2.1rem)',
            lineHeight:1.15, color:'#fff',
            letterSpacing:'-0.01em', marginBottom:10,
          }}>
            Your Eidi Will Be<br />
            <em style={{ color:'rgba(255,255,255,0.65)' }}>Deeply Appreciated</em>
          </h2>
          <p style={{
            fontSize:'0.82rem', fontWeight:300,
            color:'rgba(248,250,252,0.5)', lineHeight:1.5,
          }}>
            Scan the code below to complete your blessing
          </p>
        </div>

        {/* Panel */}
        <div style={{
          background:'rgba(255,255,255,0.03)',
          backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
          border:'1px solid rgba(255,255,255,0.07)',
          borderRadius:22,
          padding:'24px 20px 20px',
          display:'flex', flexDirection:'column', alignItems:'center', gap:20,
        }}>
          {/* QR tap-to-pay block */}
          <a
            href={upiUri}
            style={{
              width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:16,
              background:'rgba(0,0,0,0.2)', borderRadius:16,
              border:'1px solid rgba(255,255,255,0.06)',
              padding:'20px 16px 16px', textDecoration:'none',
            }}
          >
            {/* QR code in white box */}
            <div style={{
              background:'#fff', borderRadius:14,
              padding:12, boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
              display:'inline-flex',
            }}>
              <QRCodeSVG
                value={upiUri}
                size={180}
                level="M"
                includeMargin={false}
                style={{ display:'block', borderRadius:6 }}
              />
            </div>

            {/* Name */}
            <p style={{
              color:'rgba(255,255,255,0.9)', fontWeight:600,
              fontSize:15, textAlign:'center',
            }}>{myName}</p>

            {/* UPI ID pill */}
            <div style={{
              background:'rgba(0,0,0,0.25)',
              border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:10, padding:'7px 14px',
            }}>
              <span style={{
                fontFamily:'monospace', fontSize:11,
                color:'rgba(52,211,153,0.85)',
                letterSpacing:'0.03em', wordBreak:'break-all',
              }}>{upiId}</span>
            </div>

            <p className="label-overline" style={{ opacity:0.4 }}>
              Tap to open UPI app
            </p>
          </a>

          {/* CTA */}
          <button
            onClick={onPaid}
            className="btn-primary w-full"
            style={{ justifyContent:'center' }}
          >
            I've Sent Eidi
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </button>
        </div>
      </motion.div>

      {/* ── Confirmation modal ── */}
      <AnimatePresence>
        {showConfirmModal && (
          <div style={{
            position:'fixed', inset:0, zIndex:50,
            display:'flex', alignItems:'flex-end',
            justifyContent:'center', padding:'0 16px 16px',
          }}>
            {/* Backdrop */}
            <motion.div
              style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)' }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={onConfirmNo}
            />

            {/* Sheet */}
            <motion.div
              style={{
                position:'relative', zIndex:1, width:'100%', maxWidth:380,
                background:'rgba(14,20,45,0.96)',
                backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
                border:'1px solid rgba(255,255,255,0.09)',
                borderRadius:24, padding:'32px 24px 28px',
              }}
              initial={{ opacity:0, y:60 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:40 }}
              transition={{ type:'spring', stiffness:300, damping:30 }}
            >
              {/* Icon */}
              <div style={{
                width:52, height:52, borderRadius:'50%',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 20px',
              }}>
                <span style={{ fontSize:22 }}>👀</span>
              </div>

              {/* Copy */}
              <div style={{ textAlign:'center', marginBottom:24 }}>
                <h3 style={{
                  fontFamily:'Playfair Display, serif', fontWeight:400,
                  fontSize:'clamp(1.3rem,6vw,1.6rem)',
                  color:'#fff', marginBottom:8, lineHeight:1.2,
                }}>
                  Did you complete it?
                </h3>
                <p style={{ fontSize:'0.82rem', fontWeight:300, color:'rgba(248,250,252,0.45)', lineHeight:1.5 }}>
                  Enter details to get your personalised Dua card.
                </p>
              </div>

              {/* Inputs */}
              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:20 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  <label className="label-overline" style={{ marginLeft:2 }}>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Hasib"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  <label className="label-overline" style={{ marginLeft:2 }}>Amount Sent</label>
                  <div style={{ position:'relative' }}>
                    <span style={{
                      position:'absolute', left:18, top:'50%', transform:'translateY(-50%)',
                      color:'rgba(255,255,255,0.25)', fontSize:15, pointerEvents:'none',
                    }}>₹</span>
                    <input
                      type="number"
                      placeholder="100"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="input-field"
                      style={{ paddingLeft:32 }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      style={{
                        fontSize:12, textAlign:'center', fontWeight:500,
                        color:'#f87171', background:'rgba(248,113,113,0.08)',
                        border:'1px solid rgba(248,113,113,0.2)',
                        borderRadius:10, padding:'8px 12px',
                      }}
                    >{error}</motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <button onClick={handleConfirm} className="btn-primary w-full" style={{ justifyContent:'center' }}>
                  Yes, Generate My Card
                </button>
                <button onClick={onConfirmNo} className="btn-secondary w-full" style={{ justifyContent:'center' }}>
                  Not yet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
