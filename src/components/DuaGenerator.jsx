import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const duas = [
  "May Allah bless your rizq abundantly 🤲",
  "May your heart always stay peaceful and content 🕊️",
  "May your dreams become reality, Ameen 🌟",
  "May happiness always find you and your family 💚",
  "May Allah grant you Jannatul Firdaus 🌸",
  "May your sadness be replaced with eternal joy ✨",
  "May Allah protect you from every harm 🛡️",
  "May your sabr be rewarded beyond measure 🌺",
  "May every step you take lead to khayr 🌙",
  "May Allah bless you with shifa and aafiyah 🤍",
  "May your rizq come from where you least expect 🌿",
  "May Allah fill your home with love and barakah 🏠",
  "May you be a reason for someone's smile today 😊",
  "May your ibadah be accepted and multiplied 📿",
  "May Allah reunite you with your loved ones in Jannah 💫",
]

export default function DuaGenerator() {
  const [currentDua, setCurrentDua] = useState(duas[0])
  const [duaKey, setDuaKey] = useState(0)

  const getRandomDua = useCallback(() => {
    let newDua
    do {
      newDua = duas[Math.floor(Math.random() * duas.length)]
    } while (newDua === currentDua)
    setCurrentDua(newDua)
    setDuaKey(prev => prev + 1)
  }, [currentDua])

  return (
    <div className="text-center mt-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={duaKey}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-emerald-200/90 max-w-md mx-auto leading-relaxed px-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          "{currentDua}"
        </motion.p>
      </AnimatePresence>

      <motion.button
        onClick={getRandomDua}
        className="btn-outline mt-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Receive another dua ✨
      </motion.button>
    </div>
  )
}
