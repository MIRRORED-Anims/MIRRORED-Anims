const ControlRigSection = () => {
  const handleDownloadRig = () => {
    // Placeholder for rig download functionality
    alert('Rig download will be implemented here')
  }

  return (
    <section className="space-y-6">
      <h2 className="section-title">CONTROL RIG</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Download Section */}
        <div className="space-y-4">
          <h3 className="subsection-title">DOWNLOAD</h3>
          <div className="section-border p-6 bg-white dark:bg-gray-900">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-5xl mb-4">📦</div>
                <p className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-4">
                  control_rig.blend
                </p>
              </div>
              <button 
                onClick={handleDownloadRig}
                className="w-full technical-button"
              >
                DOWNLOAD_RIG.blend
              </button>
              <p className="font-mono text-xs text-gray-500 dark:text-gray-500 text-center">
                [Blender rig file for character retargeting]
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="space-y-4">
          <h3 className="subsection-title">INTERACTIVE DEMO</h3>
          <div className="section-border aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-5xl">🎮</div>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                THREEJS_DEMO
              </p>
              <p className="font-mono text-xs text-gray-500 dark:text-gray-500 max-w-sm">
                [Interactive 3D rig demo will be built here using Three.js]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ControlRigSection 