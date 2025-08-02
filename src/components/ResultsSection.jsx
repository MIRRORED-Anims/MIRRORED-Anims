import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ResultsSection = () => {
  const resultVideos = [
    { id: 1, title: "COMPARISON_01.mp4", description: "This example demonstrates better hand-hand interactions than other methods" },
    { id: 2, title: "COMPARISON_02.mp4", description: "This example also demonstrates better hand-hand interactions, although collision with the head are not prevented" },
    { id: 3, title: "COMPARISON_03.mp4", description: "This example again shows better hand-hand interactions than other methods" },
    { id: 4, title: "COMPARISON_04.mp4", description: "This example demonstrates the same level of quality on floor contacts than Mixamo" },
    { id: 5, title: "COMPARISON_05.mp4", description: "This example demonstrates better hand interactions with the same level of quality as Mixamo on floor contacts" },
    { id: 6, title: "COMPARISON_06.mp4", description: "This example demonstrates the finger rig in action (SAME and R2ET do not retarget fingers, so they were simply copied from the source for fair comparison)" },
  ]

  const [carouselIndex, setCarouselIndex] = useState(0)
  const videosPerPage = 2
  const totalPages = Math.ceil(resultVideos.length / videosPerPage)

  const getCurrentVideos = () => {
    const start = carouselIndex * videosPerPage
    const end = start + videosPerPage
    return resultVideos.slice(start, end)
  }

  const handlePrevious = () => {
    setCarouselIndex(prev => (prev - 1 + totalPages) % totalPages)
  }

  const handleNext = () => {
    setCarouselIndex(prev => (prev + 1) % totalPages)
  }

  return (
    <section className="space-y-6">
      <h2 className="section-title">COMPARISON_VIDEOS</h2>
      
      {/* Description Text Box */}
      <div className="section-border bg-white dark:bg-gray-900 p-4 relative">
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black dark:border-white z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black dark:border-white z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black dark:border-white z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black dark:border-white z-10"></div>
        
        <div className="flex items-start space-x-3">
          <div className="text-black dark:text-white mt-0.5">
            <div className="w-4 h-4 border-2 border-black dark:border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
          <div className="text-sm text-black dark:text-white">
            <p className="font-mono">
              <span className="font-bold">COMPARISON_VIDEOS:</span> These videos are the same as the ones given in our User Study.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
            Showing videos {carouselIndex * videosPerPage + 1}-{Math.min((carouselIndex + 1) * videosPerPage, resultVideos.length)} of {resultVideos.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="technical-button"
            disabled={totalPages <= 1}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-sm text-gray-600">
            {carouselIndex + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            className="technical-button"
            disabled={totalPages <= 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Videos Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getCurrentVideos().map((video, index) => (
          <div key={video.id} className="space-y-2">
            <div className={`video-container relative technical-measurements ${index % 2 === 1 ? 'technical-measurements-right' : ''}`}>
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
              <div className="dimension-width">50% WIDTH</div>
              <div className="dimension-height">16:9 ASPECT</div>
              
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <video
                  src={`/MIRRORED-Anims/assets/${video.title}`}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">🎥</div>
                    <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {video.title}
                    </p>
                    <p className="font-mono text-xs text-gray-500">
                      Your browser does not support the video tag.
                    </p>
                  </div>
                </video>
              </div>
            </div>
            <p className="font-mono text-xs text-gray-500 text-center">
              {video.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResultsSection 