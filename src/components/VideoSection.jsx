const VideoSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="section-title">VIDEO</h2>
      
      <div className="video-container">
        <video
          src="/assets/demo_video.mp4"
          controls
          className="w-full h-full object-cover"
          poster="/assets/video_poster.jpg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}

export default VideoSection 