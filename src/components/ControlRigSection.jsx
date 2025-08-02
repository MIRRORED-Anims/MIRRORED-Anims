const ControlRigSection = () => {
  const handleDownloadRig = () => {
    const link = document.createElement('a');
    link.href = '/MIRRORED-Anims/assets/demo_rig.blend';
    link.download = 'demo_rig.blend';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadSmplRig = () => {
    const link = document.createElement('a');
    link.href = '/MIRRORED-Anims/assets/smpl_rig.blend';
    link.download = 'smpl_rig.blend';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="space-y-6">
      <h2 className="section-title">CONTROL_RIG</h2>
      
      <div className="space-y-6">
        {/* Download Boxes Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Download Section */}
          <div className="space-y-4">
            <h3 className="subsection-title">DOWNLOAD</h3>
            <div className="section-border p-6 bg-white dark:bg-gray-900 relative technical-measurements">
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
              <div className="dimension-width">50% WIDTH</div>
              <div className="dimension-height">AUTO HEIGHT</div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl mb-4">📦</div>
                  <p className="font-mono text-sm text-gray-600 mb-4">
                    control_rig.blend
                  </p>
                </div>
                <button 
                  onClick={handleDownloadRig}
                  className="w-full technical-button"
                >
                  DOWNLOAD_RIG_FILE
                </button>
                <p className="font-mono text-xs text-gray-500 text-center">
                  A sample .blend file containing our control rig for a humanoid character. Feel free to play around with it!
                </p>
              </div>
            </div>
          </div>

          {/* SMPL Rig Section */}
          <div className="space-y-4">
            <h3 className="subsection-title">SMPL_RIG</h3>
            <div className="section-border p-6 bg-white dark:bg-gray-900 relative technical-measurements technical-measurements-right">
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
              <div className="dimension-width">50% WIDTH</div>
              <div className="dimension-height">AUTO HEIGHT</div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl mb-4">📦</div>
                  <p className="font-mono text-sm text-gray-600 mb-4">
                    smpl_rig.blend
                  </p>
                </div>
                <button 
                  onClick={handleDownloadSmplRig}
                  className="w-full technical-button"
                >
                  DOWNLOAD_SMPL_RIG_FILE
                </button>
                <p className="font-mono text-xs text-gray-500 text-center">
                  Due to SMPL's irregular skeleton structure and hierarchy, a special rig has been designed to keep the original joint positions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section - Full Width */}
        <div className="space-y-4">
          <h3 className="subsection-title">INTERACTIVE_DEMO</h3>
          <div className="section-border aspect-[32/9] bg-gray-50 dark:bg-gray-800 flex items-center justify-center relative technical-measurements">
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
            <div className="dimension-height">32:9 ASPECT</div>
            <div className="text-center space-y-4">
              <div className="text-5xl">🎮</div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                THREEJS_DEMO
              </p>
              <p className="font-mono text-xs text-gray-500 max-w-sm">
                Coming soon : manipulate the control rig in your browser !
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ControlRigSection 