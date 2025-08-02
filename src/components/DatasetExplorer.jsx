import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Play, Pause, Download } from 'lucide-react';
import FBXViewer from './FBXViewer';

const DatasetExplorer = () => {
  // Motion UUIDs and character data
  const [dataset] = useState({
    animations: [
      {
        uuid: 'Standing 1H Magic Attack 02',
        name: 'Standing 1H Magic Attack 02',
        source: 'YBot',
        characters: ['Abe', 'Aj', 'Amy', 'claire', 'James', 'Jolleen', 'kaya', 'Ortiz', 'Ty']
      },
      {
        uuid: 'Standing Torch Jump Running',
        name: 'Standing Torch Jump Running', 
        source: 'YBot',
        characters: ['Abe', 'Aj', 'Amy', 'claire', 'James', 'Jolleen', 'kaya', 'Ortiz', 'Ty']
      }
    ]
  });

  const [currentAnimation, setCurrentAnimation] = useState(dataset.animations[0]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [sharedCameraPosition, setSharedCameraPosition] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sharedAnimationTime, setSharedAnimationTime] = useState(0);
  const [sharedViewState, setSharedViewState] = useState(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(100);
  const [animationDuration, setAnimationDuration] = useState(3.33);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [maxKeyframes, setMaxKeyframes] = useState(0);
  const [loadedKeyframes, setLoadedKeyframes] = useState(new Set());
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const targetsPerPage = 3;
  const targetCharacters = currentAnimation.characters;
  const totalPages = Math.ceil(targetCharacters.length / targetsPerPage);

  const getCurrentTargets = () => {
    const start = carouselIndex * targetsPerPage;
    const end = start + targetsPerPage;
    return targetCharacters.slice(start, end);
  };

  const handlePrevious = () => {
    setCarouselIndex(prev => (prev - 1 + totalPages) % totalPages);
    // Don't reset camera - keep existing position
  };

  const handleNext = () => {
    setCarouselIndex(prev => (prev + 1) % totalPages);
    // Don't reset camera - keep existing position
  };

  const handleRandomAnimation = () => {
    const randomIndex = Math.floor(Math.random() * dataset.animations.length);
    setCurrentAnimation(dataset.animations[randomIndex]);
    setCarouselIndex(0);
    // Reset animation state when changing animations
    setAnimationFrame(0);
    setSharedAnimationTime(0);
    setAnimationLoaded(false);
    setMaxKeyframes(0);
    setLoadedKeyframes(new Set());
    setTotalFrames(100);
    setPlaybackSpeed(1.0);
    // Reset camera position when changing animations
    setSharedCameraPosition(null);
  };

  const handleCameraChange = (cameraData) => {
    // Any camera change should update all views
    setSharedCameraPosition(cameraData);
  };

  const handleAnimationTimeChange = (time) => {
    setSharedAnimationTime(time);
    // Update frame slider based on current time and actual duration
    if (totalFrames > 0 && animationDuration > 0) {
      // Calculate frame based on time relative to animation duration
      const progress = (time % animationDuration) / animationDuration;
      const currentFrame = Math.round(progress * (totalFrames - 1));
      setAnimationFrame(Math.max(0, Math.min(currentFrame, totalFrames - 1)));
    }
  };

  const handleViewChange = (view, isOrthographic) => {
    console.log('View change requested:', view, isOrthographic);
    setSharedViewState({ view, isOrthographic, timestamp: Date.now() });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFrameChange = (frame) => {
    setAnimationFrame(frame);
    // Convert frame to time based on actual animation duration
    if (animationDuration > 0 && totalFrames > 0) {
      const progress = frame / (totalFrames - 1);
      const timeInSeconds = progress * animationDuration;
      setSharedAnimationTime(timeInSeconds);
    }
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleKeyframesChange = (keyframes, characterName, duration) => {
    console.log('Keyframes received:', keyframes, 'for character:', characterName, 'duration:', duration);
    
    // Update animation duration if provided
    if (duration && duration > 0) {
      setAnimationDuration(duration);
    }
    
    setLoadedKeyframes(prev => {
      const newSet = new Set(prev);
      newSet.add(keyframes);
      
      // Update max keyframes if this is higher
      const currentMax = Math.max(...newSet);
      setMaxKeyframes(currentMax);
      setTotalFrames(currentMax);
      setAnimationLoaded(true);
      
      console.log('Updated max keyframes:', currentMax, 'duration:', duration);
      
      return newSet;
    });
  };

  const handleDownloadFBX = (characterName) => {
    const link = document.createElement('a');
    // Use mixamo_fbx path for source (YBot), regular fbx path for others
    const isSource = characterName === currentAnimation.source;
    const basePath = isSource ? '/MIRRORED-Anims/mixamo_fbx' : '/MIRRORED-Anims/fbx';
    link.href = `${basePath}/${currentAnimation.uuid}/${characterName}.fbx`;
    link.download = `${characterName}_${currentAnimation.name}.fbx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Dataset Sample Notice */}
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
              <span className="font-bold">DATASET_SAMPLE:</span> Due to anonymity requirements during the review process, 
              there are currently no ways of storing data in an anonymous manner until the paper is accepted. 
              As such, this explorer only shows a small sample of the dataset (motions picked at random), as this is the limit that we could fit inside a GitHub repository.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRandomAnimation}
              className="technical-button flex items-center space-x-2"
            >
              <Shuffle size={16} />
              <span>RANDOM_MOTION</span>
            </button>
            <div className="font-mono text-sm text-gray-600">
              Animation: <span className="font-bold">{currentAnimation.name.toUpperCase()}</span>
            </div>
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

        {/* Frame Control Slider */}
        <div className="section-border bg-white dark:bg-gray-900 p-4 relative">
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black dark:border-white z-10"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black dark:border-white z-10"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black dark:border-white z-10"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black dark:border-white z-10"></div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="technical-button flex items-center space-x-2 min-w-[80px]"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span className="w-[40px] text-left">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            
            {/* Playback Speed Controls */}
            <div className="flex items-center space-x-1">
              <span className="font-mono text-xs text-gray-600 dark:text-gray-400">SPEED:</span>
              <div className="flex border border-black dark:border-white">
                <button
                  onClick={() => handlePlaybackSpeedChange(0.25)}
                  className={`px-2 py-1 text-xs font-mono border-r border-black dark:border-white ${
                    playbackSpeed === 0.25 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  0.25x
                </button>
                <button
                  onClick={() => handlePlaybackSpeedChange(0.5)}
                  className={`px-2 py-1 text-xs font-mono border-r border-black dark:border-white ${
                    playbackSpeed === 0.5 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => handlePlaybackSpeedChange(1.0)}
                  className={`px-2 py-1 text-xs font-mono ${
                    playbackSpeed === 1.0 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'bg-white dark:bg-gray-900 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  1.0x
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex items-center space-x-3">
              <span className="font-mono text-xs text-gray-600 dark:text-gray-400">FRAME:</span>
              
              {/* Technical Drawing Style Slider */}
              <div className="flex-1 relative py-3">
                {/* Slider track with technical markers */}
                <div className="relative h-0.5 bg-black dark:bg-white">
                  {/* Start marker */}
                  <div className="absolute left-0 top-1/2 w-0.5 h-4 bg-black dark:bg-white transform -translate-y-1/2"></div>
                  {/* End marker */}
                  <div className="absolute right-0 top-1/2 w-0.5 h-4 bg-black dark:bg-white transform -translate-y-1/2"></div>
                  
                  {/* Progress indicator */}
                  <div 
                    className="absolute top-0 left-0 h-0.5 bg-black dark:bg-white"
                    style={{
                      width: `${(animationFrame / (animationLoaded ? Math.max(totalFrames - 1, 1) : 99)) * 100}%`
                    }}
                  ></div>
                  
                  {/* Scrubber circle */}
                  <div 
                    className="absolute top-1/2 w-4 h-4 border-2 border-black dark:border-white bg-white dark:bg-gray-900 rounded-full transform -translate-y-1/2 -translate-x-2 cursor-pointer"
                    style={{
                      left: `${(animationFrame / (animationLoaded ? Math.max(totalFrames - 1, 1) : 99)) * 100}%`
                    }}
                  ></div>
                </div>
                
                {/* Invisible input for interaction */}
                <input
                  type="range"
                  min="0"
                  max={animationLoaded ? totalFrames - 1 : 99}
                  value={animationFrame}
                  onChange={(e) => handleFrameChange(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              
              <span className="font-mono text-xs text-gray-600 dark:text-gray-400 min-w-[80px]">
                {animationFrame} / {animationLoaded ? totalFrames - 1 : '...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Source Character */}
        <div className="space-y-2">
          <h3 className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200">SOURCE</h3>
          <div className="flex items-center justify-between mb-1">
            <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
              {currentAnimation.source}
            </p>
            <button
              onClick={() => handleDownloadFBX(currentAnimation.source)}
              className="technical-button flex items-center space-x-1 px-1 py-0.5 text-xs"
            >
              <Download size={10} />
              <span>FBX</span>
            </button>
          </div>
          <div className="section-border relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black dark:border-white z-20"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black dark:border-white z-20"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black dark:border-white z-20"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black dark:border-white z-20"></div>
            
            <FBXViewer
              characterName={currentAnimation.source}
              animationName={currentAnimation.name}
              motionUuid={currentAnimation.uuid}
              onCameraChange={handleCameraChange}
              onAnimationTimeChange={handleAnimationTimeChange}
              onKeyframesChange={handleKeyframesChange}
              onViewChange={handleViewChange}
              isPlaying={isPlaying}
              sharedAnimationTime={sharedAnimationTime}
              sharedViewState={sharedViewState}
              cameraPosition={sharedCameraPosition}
              isMainSource={true}
              playbackSpeed={playbackSpeed}
              className="aspect-square"
              useGLB={true}
              glbBasePath="/MIRRORED-Anims/mixamo_fbx"
            />
          </div>
          
          {/* View Control Gizmo */}
          <div className="mt-2">
            <div className="relative bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-2 inline-block">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black dark:border-white"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black dark:border-white"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black dark:border-white"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black dark:border-white"></div>
              
              <div className="flex gap-1 font-mono text-xs">
                <button
                  onClick={() => handleViewChange('front', false)}
                  className="technical-button px-2 py-1 text-xs"
                  title="Front view (Z)"
                >
                  Z
                </button>
                <button
                  onClick={() => handleViewChange('side', false)}
                  className="technical-button px-2 py-1 text-xs"
                  title="Side view (X)"
                >
                  X
                </button>
                <button
                  onClick={() => handleViewChange('top', false)}
                  className="technical-button px-2 py-1 text-xs"
                  title="Top view (Y)"
                >
                  Y
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Target Characters Carousel */}
        <div className="lg:col-span-3 space-y-2">
          <h3 className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200">MIRRORED_ANIMS_RETARGETING</h3>
          <div className="grid grid-cols-3 gap-6">
            {getCurrentTargets().map((character, index) => (
              <div key={`${character}-${carouselIndex}-${index}`} className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                    {character.replace('_', ' ').toUpperCase()}
                  </p>
                  <button
                    onClick={() => handleDownloadFBX(character)}
                    className="technical-button flex items-center space-x-1 px-1 py-0.5 text-xs"
                  >
                    <Download size={10} />
                    <span>FBX</span>
                  </button>
                </div>
                <div className="section-border relative">
                  {/* Technical corner brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black dark:border-white z-20"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black dark:border-white z-20"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black dark:border-white z-20"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black dark:border-white z-20"></div>
                  
                  <FBXViewer
                    characterName={character}
                    animationName={currentAnimation.name}
                    motionUuid={currentAnimation.uuid}
                    cameraPosition={sharedCameraPosition}
                    onCameraChange={handleCameraChange}
                    isPlaying={isPlaying}
                    sharedAnimationTime={sharedAnimationTime}
                    sharedViewState={sharedViewState}
                    playbackSpeed={playbackSpeed}
                    className="aspect-square"
                    useGLB={true}
                    glbBasePath="/MIRRORED-Anims/fbx"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mixamo Retargeting Section */}
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Empty space to align with source above */}
          <div></div>
          
          {/* Mixamo Target Characters */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200">MIXAMO_RETARGETING</h3>
            <div className="grid grid-cols-3 gap-6">
              {getCurrentTargets().map((character, index) => (
                <div key={`mixamo-${character}-${carouselIndex}-${index}`} className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                      {character.replace('_', ' ').toUpperCase()}
                    </p>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `/MIRRORED-Anims/mixamo_fbx/${currentAnimation.uuid}/${character}.fbx`;
                        link.download = `${character}_mixamo_${currentAnimation.name}.fbx`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="technical-button flex items-center space-x-1 px-1 py-0.5 text-xs"
                    >
                      <Download size={10} />
                      <span>FBX</span>
                    </button>
                  </div>
                  <div className="section-border relative">
                    {/* Technical corner brackets */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black dark:border-white z-20"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black dark:border-white z-20"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black dark:border-white z-20"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black dark:border-white z-20"></div>
                    
                    <FBXViewer
                      characterName={character}
                      animationName={currentAnimation.name}
                      motionUuid={currentAnimation.uuid}
                      cameraPosition={sharedCameraPosition}
                      onCameraChange={handleCameraChange}
                      isPlaying={isPlaying}
                      sharedAnimationTime={sharedAnimationTime}
                      sharedViewState={sharedViewState}
                      playbackSpeed={playbackSpeed}
                      className="aspect-square"
                      useGLB={true}
                      glbBasePath="/MIRRORED-Anims/mixamo_fbx"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Info */}
      <div className="section-border p-4 bg-gray-50 relative technical-measurements">
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black z-10"></div>
        
        {/* Dimension markers */}
        <div className="width-marker-left"></div>
        <div className="width-marker-right"></div>
        <div className="height-marker-top"></div>
        <div className="height-marker-bottom"></div>
        
        {/* Dimension labels */}
        <div className="dimension-width">100% WIDTH</div>
        <div className="dimension-height">AUTO HEIGHT</div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono">
          
          <div>
            <span className="text-gray-600">Animation:</span>
            <div className="font-bold">{currentAnimation.name.toUpperCase()}</div>
          </div>
          <div>
            <span className="text-gray-600">Characters:</span>
            <div className="font-bold">{currentAnimation.characters.length + 1}</div>
          </div>
          <div>
            <span className="text-gray-600">Format:</span>
            <div className="font-bold">FBX</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Status:</span>
              <div className={`font-bold ${isPlaying ? 'text-green-600' : 'text-yellow-600'}`}>
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </div>
            </div>
            <button
              onClick={togglePlayPause}
              className="technical-button flex items-center space-x-1 px-2 py-1 text-xs"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetExplorer;