const ResultsSection = () => {
  const resultVideos = [
    { id: 1, title: "RESULT_01.mp4", description: "Character retargeting example" },
    { id: 2, title: "RESULT_02.mp4", description: "Motion inversion demo" },
    { id: 3, title: "RESULT_03.mp4", description: "Dataset generation process" },
    { id: 4, title: "RESULT_04.mp4", description: "Comparison with baselines" },
  ]

  return (
    <section className="space-y-6">
      <h2 className="section-title">RESULTS HIGHLIGHTS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resultVideos.map((video) => (
          <div key={video.id} className="space-y-2">
            <div className="video-container">
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-4xl">🎥</div>
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    {video.title}
                  </p>
                </div>
              </div>
            </div>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-500 text-center">
              {video.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResultsSection 