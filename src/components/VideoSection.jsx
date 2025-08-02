const VideoSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="section-title">VIDEO</h2>
      
      <div className="video-container technical-corners technical-measurements">
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black dark:border-white z-20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black dark:border-white z-20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black dark:border-white z-20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black dark:border-white z-20"></div>
        
        {/* Dimension markers */}
        <div className="width-marker-left"></div>
        <div className="width-marker-right"></div>
        <div className="height-marker-top"></div>
        <div className="height-marker-bottom"></div>
        
        {/* Dimension labels */}
        <div className="dimension-width">100% WIDTH</div>
        <div className="dimension-height">16:9 ASPECT</div>
        
        <video
          src="/MIRRORED-Anims/assets/demo_video.mp4"
          controls
          className="w-full h-full object-cover"
          poster="/MIRRORED-Anims/assets/video_poster.jpg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

export default VideoSection 