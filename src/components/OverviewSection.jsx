const OverviewSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="section-title">OVERVIEW</h2>
      
      <div className="section-border bg-white dark:bg-gray-900 p-8 relative technical-measurements">
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black dark:border-white z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black dark:border-white z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black dark:border-white z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black dark:border-white z-10"></div>
        
        {/* Dimension markers */}
        <div className="width-marker-left"></div>
        <div className="width-marker-right"></div>
        <div className="height-marker-top"></div>
        <div className="height-marker-bottom"></div>
        
        {/* Dimension labels */}
        <div className="dimension-width">100% WIDTH</div>
        <div className="dimension-height">ASPECT 5:1</div>
        
        <div className="aspect-[14006/2795] flex items-center justify-center bg-white">
          <img 
            src="/MIRRORED-Anims/assets/teaser2.png" 
            alt="Overview figure showing the method pipeline"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default OverviewSection 