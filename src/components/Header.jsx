import FuzzyText from './FuzzyText'

const Header = () => {
  return (
    <header className="text-center space-y-6">
      {/* Title with technical drawing aesthetic */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <FuzzyText 
            fontSize="clamp(2rem, 5vw, 3rem)"
            fontWeight={300}
            color="#000000"
            baseIntensity={0.05}
            hoverIntensity={0.15}
            fontFamily="'Courier New', monospace"
          >
            MIRRORED-ANIMS
          </FuzzyText>
        </h1>
        
        {/* Technical annotation */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs font-mono hidden md:block">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-black dark:bg-white"></div>
            <span className="text-black dark:text-white">00</span>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-white max-w-4xl mx-auto leading-relaxed font-mono">
        Motion Inversion for Rig-space Retargeting to Obtain a Reliable Enlarged Dataset of Character Animations
      </h2>
      
      {/* Authors */}
      <div className="mt-8 space-y-2">
        <p className="text-lg font-mono text-gray-600">
          Anonymous Authors
        </p>
        <p className="text-base font-mono text-gray-500">
          Anonymous Institutions
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button className="technical-button">
          📄 Paper
        </button>
        <button className="technical-button">
          📄 Supp. Mat.
        </button>
        <button className="technical-button opacity-50 cursor-not-allowed" disabled>
          📦 Dataset
        </button>
      </div>
    </header>
  )
}

export default Header 