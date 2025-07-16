const VideoSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="section-title">VIDEO</h2>
      
      <div className="video-container">
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎬</div>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
              MAIN_VIDEO.mp4
            </p>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-500 max-w-md">
              [Video will be hosted in repository or on YouTube]
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection 