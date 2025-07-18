import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Play, Pause, Download } from 'lucide-react';
import FBXViewer from './FBXViewer';

const DatasetExplorer = () => {
  // Motion UUIDs and character data
  const [dataset] = useState({
    animations: [
      {
        uuid: '009b2b9b-2974-40f2-8825-feb4db36a6b2',
        name: 'motion_001',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '01da8857-474f-404d-aa34-2e09e697f02c',
        name: 'motion_002',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '024f56e2-6fc2-475a-b051-b9bebcf272f2',
        name: 'motion_003',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '02825b33-a9a3-418e-85e8-df665e2e52eb',
        name: 'motion_004',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '02854bce-1b74-4b36-bb3f-df58f4a0a345',
        name: 'motion_005',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '03aca155-0078-40a3-a52b-04d3eaa7287d',
        name: 'motion_006',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '03dffa68-d243-470f-b059-d10f8fcfeabb',
        name: 'motion_007',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '040356e9-129b-454c-ae6b-3a27f83804f8',
        name: 'motion_008',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '052c9f6e-23ca-46bf-b4fb-e9656cf9f880',
        name: 'motion_009',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '055c26a1-0184-4197-8a8e-ea91524c12b3',
        name: 'motion_010',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '0635e50a-9988-4d8e-9d85-1db01c9c342c',
        name: 'motion_011',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '065bb3ef-261e-467f-83fe-f5b1c581c8d6',
        name: 'motion_012',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '06b8cc73-3453-4423-91fd-50e682df7db1',
        name: 'motion_013',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '06f95726-a7d9-4df6-a41d-bd04809305f0',
        name: 'motion_014',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '08b56eb4-f99a-4e1b-a3df-bb543f33dbbf',
        name: 'motion_015',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '08b5a59f-899a-4d7a-a4fa-22cef5c6989b',
        name: 'motion_016',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '08f3514a-0d3b-469d-9f27-57f97d9fcb9b',
        name: 'motion_017',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '0a8b4b48-38bc-4a45-befc-7858ee6ed45d',
        name: 'motion_018',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '0aa23f2b-23b1-498b-b6b2-cd306c02f83c',
        name: 'motion_019',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
      },
      {
        uuid: '0ac7eaa4-5a83-46db-af31-0fb2c55c1c90',
        name: 'motion_020',
        source: 'XBot',
        characters: ['Abe', 'Aj', 'Amy', 'Big Vegas', 'Brute', 'claire', 'Ely By K.Atienza', 'Erika Archer', 'Exo Gray', 'Jackie', 'James', 'Jolleen', 'Kate', 'kaya', 'Knight D Pelegrini', 'Louise', 'Mannequin', 'Maria J J Ong', 'Maria WProp J J Ong', 'Megan', 'Michelle', 'Morak', 'Ninja', 'Ortiz', 'Peasant Girl', 'Remy', 'Romero', 'Skeletonzombie T Avelange', 'Sporty Granny', 'The Boss', 'Timmy', 'Ty', 'Vampire A Lusth', 'Vanguard By T. Choonyung', 'Warrok W Kurniawan']
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
    if (animationDuration > 0) {
      const currentFrame = Math.round((time / animationDuration) * (totalFrames - 1));
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
    // Convert frame to time (assuming 30 fps)
    const timeInSeconds = frame / 30;
    setSharedAnimationTime(timeInSeconds);
  };

  const handleTotalFramesChange = (total) => {
    setTotalFrames(total);
    setAnimationLoaded(true);
  };

  const handleDownloadFBX = (characterName) => {
    const link = document.createElement('a');
    link.href = `/MIRRORED-Anims/fbx/${currentAnimation.uuid}/${characterName}.fbx`;
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
              As such, this explorer only shows a small sample of the dataset (20 motions picked at random).
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
              className="technical-button flex items-center space-x-2"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
            
            <div className="flex-1 flex items-center space-x-3">
              <span className="font-mono text-xs text-gray-600 dark:text-gray-400">FRAME:</span>
              <input
                type="range"
                min="0"
                max={animationLoaded ? totalFrames - 1 : 99}
                value={animationFrame}
                onChange={(e) => handleFrameChange(parseInt(e.target.value))}
                className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${(animationFrame / (animationLoaded ? totalFrames - 1 : 99)) * 100}%, #ccc ${(animationFrame / (animationLoaded ? totalFrames - 1 : 99)) * 100}%, #ccc 100%)`
                }}
              />
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
              onTotalFramesChange={handleTotalFramesChange}
              onViewChange={handleViewChange}
              isPlaying={isPlaying}
              sharedAnimationTime={sharedAnimationTime}
              sharedViewState={sharedViewState}
              cameraPosition={sharedCameraPosition}
              isMainSource={true}
              className="aspect-square"
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
                    className="aspect-square"
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
                      className="aspect-square"
                      fbxBasePath="/MIRRORED-Anims/mixamo_fbx"
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