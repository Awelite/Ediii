import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import MessagePage from './pages/MessagePage'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import SadPage from './pages/SadPage'
import LoadingScreen from './components/LoadingScreen'
import AudioToggle from './components/AudioToggle'

const pageTransition = {
  initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

export default function App() {
  const [page, setPage] = useState('loading')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [donorData, setDonorData] = useState({ name: '', amount: '' })

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Audio toggle */}
      {page !== 'loading' && <AudioToggle />}

      {/* Page content */}
      <AnimatePresence mode="wait">
        {page === 'loading' && (
          <motion.div key="loading" {...pageTransition}>
            <LoadingScreen onComplete={() => setPage('landing')} />
          </motion.div>
        )}

        {page === 'landing' && (
          <motion.div key="landing" {...pageTransition}>
            <LandingPage onContinue={() => setPage('message')} />
          </motion.div>
        )}

        {page === 'message' && (
          <motion.div key="message" {...pageTransition}>
            <MessagePage onContinue={() => setPage('payment')} />
          </motion.div>
        )}

        {page === 'payment' && (
          <motion.div key="payment" {...pageTransition}>
            <PaymentPage
              onPaid={() => setShowConfirmModal(true)}
              showConfirmModal={showConfirmModal}
              onConfirmYes={(data) => {
                setDonorData(data)
                setShowConfirmModal(false)
                setPage('success')
              }}
              onConfirmNo={() => {
                setShowConfirmModal(false)
                setPage('sad')
              }}
            />
          </motion.div>
        )}

        {page === 'success' && (
          <motion.div key="success" {...pageTransition} className="w-full h-full absolute inset-0">
            <SuccessPage donorData={donorData} />
          </motion.div>
        )}

        {page === 'sad' && (
          <motion.div key="sad" {...pageTransition} className="w-full h-full absolute inset-0">
            <SadPage onGoBack={() => setPage('payment')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
