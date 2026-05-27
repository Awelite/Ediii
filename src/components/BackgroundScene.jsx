import { motion } from 'framer-motion';

export default function BackgroundScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-end">
      
      {/* Hanging Lanterns */}
      <div className="absolute top-0 w-full max-w-4xl flex justify-between px-10 sm:px-24">
        {/* Left Lantern */}
        <motion.div 
          className="relative flex flex-col items-center"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'top center' }}
        >
          <div className="w-0.5 h-24 sm:h-32 bg-gradient-to-b from-white/30 to-white/10" />
          <svg width="40" height="70" viewBox="0 0 24 40" fill="none" className="text-white/20">
            <path d="M12 0L14 4H10L12 0Z" fill="currentColor"/>
            <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V10C18 10 22 14 22 20C22 26 18 30 18 30V34C18 35.1046 17.1046 36 16 36H8C6.89543 36 6 35.1046 6 34V30C6 30 2 26 2 20C2 14 6 10 6 10V6Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 12V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 20H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 36H14L12 40L10 36Z" fill="currentColor"/>
          </svg>
        </motion.div>

        {/* Right Lanterns */}
        <div className="flex gap-8 sm:gap-16">
          <motion.div 
            className="relative flex flex-col items-center"
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ transformOrigin: 'top center' }}
          >
            <div className="w-0.5 h-16 sm:h-20 bg-gradient-to-b from-white/30 to-white/10" />
            <svg width="30" height="50" viewBox="0 0 24 40" fill="none" className="text-white/20">
              <path d="M12 0L14 4H10L12 0Z" fill="currentColor"/>
              <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V10C18 10 22 14 22 20C22 26 18 30 18 30V34C18 35.1046 17.1046 36 16 36H8C6.89543 36 6 35.1046 6 34V30C6 30 2 26 2 20C2 14 6 10 6 10V6Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 12V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 36H14L12 40L10 36Z" fill="currentColor"/>
            </svg>
          </motion.div>
          <motion.div 
            className="relative flex flex-col items-center hidden sm:flex"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: 'top center' }}
          >
            <div className="w-0.5 h-28 sm:h-40 bg-gradient-to-b from-white/30 to-white/10" />
            <svg width="35" height="60" viewBox="0 0 24 40" fill="none" className="text-white/20">
              <path d="M12 0L14 4H10L12 0Z" fill="currentColor"/>
              <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V10C18 10 22 14 22 20C22 26 18 30 18 30V34C18 35.1046 17.1046 36 16 36H8C6.89543 36 6 35.1046 6 34V30C6 30 2 26 2 20C2 14 6 10 6 10V6Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 12V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 20H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 36H14L12 40L10 36Z" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Massive Elegant Crescent Moon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] opacity-[0.07]">
        <svg width="600" height="600" viewBox="0 0 24 24" fill="currentColor" className="text-white w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] sm:w-[600px] sm:h-[600px]">
          <path d="M21.5 15.5C19.7 17.5 17.1 18.8 14.1 18.8C8.5 18.8 4 14.3 4 8.7C4 5.7 5.3 3.1 7.3 1.3C3.2 2.8 0.2 6.8 0.2 11.4C0.2 17.6 5.2 22.6 11.4 22.6C16 22.6 20 19.6 21.5 15.5Z" />
        </svg>
      </div>

      {/* Mosque Silhouette at Bottom */}
      <div className="w-full h-[30vh] min-h-[200px] opacity-[0.08] flex items-end justify-center pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="currentColor" className="text-white">
          {/* Main Dome */}
          <path d="M600 150 C550 150, 500 250, 500 400 L700 400 C700 250, 650 150, 600 150 Z" />
          <rect x="595" y="110" width="10" height="40" />
          <circle cx="600" cy="100" r="10" />
          
          {/* Left Dome */}
          <path d="M400 250 C370 250, 330 320, 330 400 L470 400 C470 320, 430 250, 400 250 Z" />
          <rect x="397" y="220" width="6" height="30" />
          <circle cx="400" cy="215" r="5" />

          {/* Right Dome */}
          <path d="M800 250 C770 250, 730 320, 730 400 L870 400 C870 320, 830 250, 800 250 Z" />
          <rect x="797" y="220" width="6" height="30" />
          <circle cx="800" cy="215" r="5" />

          {/* Left Minaret */}
          <rect x="250" y="100" width="30" height="300" />
          <polygon points="250,100 265,50 280,100" />
          <rect x="245" y="180" width="40" height="10" />
          <rect x="245" y="280" width="40" height="10" />

          {/* Right Minaret */}
          <rect x="920" y="100" width="30" height="300" />
          <polygon points="920,100 935,50 950,100" />
          <rect x="915" y="180" width="40" height="10" />
          <rect x="915" y="280" width="40" height="10" />

          {/* Base structure to fill gaps */}
          <rect x="0" y="350" width="1200" height="50" />
          <rect x="280" y="300" width="50" height="100" />
          <rect x="870" y="300" width="50" height="100" />
          <rect x="470" y="300" width="30" height="100" />
          <rect x="700" y="300" width="30" height="100" />
        </svg>
      </div>
      
      {/* Bottom fade out to blend with UI if needed */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a1128] to-transparent" />
    </div>
  );
}
