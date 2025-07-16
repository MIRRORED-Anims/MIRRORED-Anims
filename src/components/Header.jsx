const Header = () => {
  return (
    <header className="text-center space-y-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-black dark:text-white leading-tight">
        MIRRORED-ANIMS
      </h1>
      <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Motion Inversion for Rig-space Retargeting to Obtain a Reliable Enlarged Dataset of Character Animations
      </h2>
      
      {/* Authors */}
      <div className="mt-8 space-y-2">
        <p className="text-lg font-mono text-gray-600 dark:text-gray-400">
          Anonymous Authors
        </p>
        <p className="text-base font-mono text-gray-500 dark:text-gray-500">
          Anonymous Institutions
        </p>
      </div>
    </header>
  )
}

export default Header 