import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';


// Loading component
const LoadingFallback = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
};

// Error boundary for FBX loading
class FBXErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('FBX Loading Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <LoadingFallback />;
    }
    return this.props.children;
  }
}

// FBX Character component that loads actual FBX files
const FBXCharacter = ({ fbxPath, isPlaying, sharedAnimationTime, onAnimationTimeChange, isMainSource, onKeyframesChange, characterName, playbackSpeed = 1.0 }) => {
  const fbxRef = useRef();
  const [error, setError] = useState(false);
  const [fbx, setFbx] = useState(null);
  const [mixer, setMixer] = useState(null);
  const [action, setAction] = useState(null);
  
  useEffect(() => {
    const loadFBX = async () => {
      try {
        setError(false);
        setFbx(null);
        
        const loader = new FBXLoader();
        
        // Load the FBX file
        const loadedFBX = await new Promise((resolve, reject) => {
          loader.load(
            fbxPath,
            (object) => {
              console.log('FBX loaded successfully:', object);
              resolve(object);
            },
            (progress) => {
              console.log('Loading progress:', progress);
            },
            (error) => {
              console.error('FBX loading error:', error);
              reject(error);
            }
          );
        });
        
        setFbx(loadedFBX);
        
        // Setup animation mixer and actions
        if (loadedFBX.animations && loadedFBX.animations.length > 0) {
          const animationMixer = new THREE.AnimationMixer(loadedFBX);
          setMixer(animationMixer);
          
          // Play the first animation
          const animationAction = animationMixer.clipAction(loadedFBX.animations[0]);
          animationAction.play();
          setAction(animationAction);
          
          // Find maximum keyframes from Source animation only
          if (isMainSource) {
            try {
              const firstAnimation = loadedFBX.animations[0];
              const animationDuration = firstAnimation.duration;
              let calculatedKeyframes = 0;
              
              console.log(`Animation duration: ${animationDuration} seconds`);
              
              // Get the maximum keyframe count from all tracks
              firstAnimation.tracks.forEach((track, trackIndex) => {
                const keyframeCount = track.times.length;
                console.log(`  Track ${trackIndex} (${track.name}):`, keyframeCount, 'keyframes');
                calculatedKeyframes = Math.max(calculatedKeyframes, keyframeCount);
              });
              
              // If we got a very low keyframe count, use duration-based calculation
              if (calculatedKeyframes < 10) {
                console.log('Low keyframe count detected, using duration-based calculation');
                calculatedKeyframes = Math.round(animationDuration * 30); // 30 FPS
              }
              
              console.log(`Final calculated keyframes: ${calculatedKeyframes}`);
              
              // Report keyframes and duration to parent
              if (onKeyframesChange && typeof onKeyframesChange === 'function') {
                onKeyframesChange(calculatedKeyframes, characterName, animationDuration);
              }
            } catch (error) {
              console.warn('Error analyzing keyframes:', error);
              // Fallback to duration-based calculation
              const duration = loadedFBX.animations[0].duration;
              const fallbackKeyframes = Math.round(duration * 30);
              if (onKeyframesChange && typeof onKeyframesChange === 'function') {
                onKeyframesChange(fallbackKeyframes, characterName, duration);
              }
            }
          }
          
          console.log('Animation setup complete:', loadedFBX.animations.length, 'animations found');
        } else {
          console.log('No animations found in FBX file');
        }
        
      } catch (error) {
        console.error('FBX loading failed:', error);
        setError(true);
      }
    };
    
    if (fbxPath) {
      loadFBX();
    }
  }, [fbxPath]);
  
  useEffect(() => {
    if (fbx && !error) {
      try {
        console.log('Processing FBX model:', fbx);
        
        // Replace all materials with default material
        fbx.traverse((child) => {
          if (child.isMesh) {
            console.log('Processing mesh:', child.name, 'replacing material');
            
            // Use consistent default material
            child.material = new THREE.MeshLambertMaterial({
              color: new THREE.Color(0xaaaaaa),
              side: THREE.DoubleSide
            });
            
            // Ensure normals are correct
            if (child.geometry) {
              child.geometry.computeVertexNormals();
            }
            
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Find the armature/skeleton
        let armature = null;
        fbx.traverse((child) => {
          if (child.type === 'Bone' && (child.name.toLowerCase().includes('pelvis') || child.name.toLowerCase().includes('hips') || child.name.toLowerCase().includes('root'))) {
            console.log('Found pelvis/root bone:', child.name, 'at position:', child.position);
            armature = child;
          }
        });
        
        // Center the model properly
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // If we found pelvis bone, center based on its position
        if (armature) {
          console.log('Centering based on pelvis bone position');
          fbx.position.x = -armature.position.x;
          fbx.position.z = -armature.position.z;
          // Don't change Y position as requested originally
        } else {
          console.log('No pelvis bone found, using bounding box center');
          // Fallback to bounding box center
          fbx.position.x = -center.x;
          fbx.position.z = -center.z;
          fbx.position.y = -box.min.y; // Keep Y positioning for ground placement
        }
        
        // Scale to fit  
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        fbx.scale.setScalar(scale);
        
        console.log('FBX processed - final position:', fbx.position, 'scale:', scale);
      } catch (err) {
        console.warn('Error processing FBX model:', err);
        setError(true);
      }
    }
  }, [fbx, error]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (action) {
      if (isPlaying) {
        action.paused = false;
      } else {
        action.paused = true;
      }
    }
  }, [isPlaying, action]);

  // Synchronize animation time across all scenes
  useEffect(() => {
    if (mixer && action && sharedAnimationTime !== undefined) {
      // For non-main source views, always sync to the shared time
      // For main source, only sync when not playing (during scrubbing)
      const shouldSync = !isMainSource || !isPlaying;
      
      if (shouldSync) {
        const duration = action.getClip().duration;
        const normalizedTime = sharedAnimationTime % duration;
        action.time = normalizedTime;
        mixer.update(0); // Update without advancing time
      }
    }
  }, [sharedAnimationTime, mixer, action, isPlaying, isMainSource]);

  useFrame((state, delta) => {
    // Update animation mixer
    if (mixer && isPlaying) {
      // Apply playback speed to delta
      const adjustedDelta = delta * playbackSpeed;
      mixer.update(adjustedDelta);
      
      // If this is the main source, broadcast the time to others
      if (isMainSource && action && onAnimationTimeChange) {
        onAnimationTimeChange(action.time);
      }
    }
  });

  const GridSystem = () => {
    const gridShader = {
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform vec3 uGridColor1;
        uniform vec3 uGridColor2;
        uniform float uGridSize1;
        uniform float uGridSize2;
        uniform float uLineWidth;
        
        float getGrid(float size) {
          vec2 coord = vWorldPosition.xz / size;
          vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
          float line = min(grid.x, grid.y);
          return 1.0 - min(line, 1.0);
        }
        
        void main() {
          float grid1 = getGrid(uGridSize1);
          float grid2 = getGrid(uGridSize2);
          
          vec3 color = mix(vec3(0.94, 0.94, 0.94), uGridColor2, grid2);
          color = mix(color, uGridColor1, grid1);
          
          float alpha = max(grid1, grid2) * 0.5;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        uGridColor1: { value: new THREE.Color(0x666666) },
        uGridColor2: { value: new THREE.Color(0x999999) },
        uGridSize1: { value: 0.5 },
        uGridSize2: { value: 0.1 },
        uLineWidth: { value: 0.02 }
      }
    };

    return (
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shaderMaterial 
          {...gridShader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  };

  if (error || !fbx) {
    return <GridSystem />;
  }

  return (
    <>
      <group ref={fbxRef}>
        <primitive object={fbx} />
      </group>
      <GridSystem />
    </>
  );
};

// GLTF Character component that loads .glb files
const GLTFCharacter = ({ glbPath, isPlaying, sharedAnimationTime, onAnimationTimeChange, isMainSource, onKeyframesChange, characterName, playbackSpeed = 1.0 }) => {
  const glbRef = useRef();
  const [error, setError] = useState(false);
  const [gltf, setGltf] = useState(null);
  const [mixer, setMixer] = useState(null);
  const [action, setAction] = useState(null);
  
  useEffect(() => {
    const loadGLTF = async () => {
      try {
        setError(false);
        setGltf(null);
        
        const loader = new GLTFLoader();
        
        // Load the GLTF file
        const loadedGLTF = await new Promise((resolve, reject) => {
          loader.load(
            glbPath,
            (gltf) => {
              console.log('GLTF loaded successfully:', gltf);
              resolve(gltf);
            },
            (progress) => {
              console.log('Loading progress:', progress);
            },
            (error) => {
              console.error('GLTF loading error:', error);
              reject(error);
            }
          );
        });
        
        setGltf(loadedGLTF);
        
        // Setup animation mixer and actions
        if (loadedGLTF.animations && loadedGLTF.animations.length > 0) {
          const animationMixer = new THREE.AnimationMixer(loadedGLTF.scene);
          setMixer(animationMixer);
          
          // Play the first animation
          const animationAction = animationMixer.clipAction(loadedGLTF.animations[0]);
          animationAction.play();
          setAction(animationAction);
          
          // Find maximum keyframes from Source animation only
          if (isMainSource) {
            try {
              const firstAnimation = loadedGLTF.animations[0];
              const animationDuration = firstAnimation.duration;
              let calculatedKeyframes = 0;
              
              console.log(`Animation duration: ${animationDuration} seconds`);
              
              // Get the maximum keyframe count from all tracks
              firstAnimation.tracks.forEach((track, trackIndex) => {
                const keyframeCount = track.times.length;
                console.log(`  Track ${trackIndex} (${track.name}):`, keyframeCount, 'keyframes');
                calculatedKeyframes = Math.max(calculatedKeyframes, keyframeCount);
              });
              
              // If we got a very low keyframe count, use duration-based calculation
              if (calculatedKeyframes < 10) {
                console.log('Low keyframe count detected, using duration-based calculation');
                calculatedKeyframes = Math.round(animationDuration * 30); // 30 FPS
              }
              
              console.log(`Final calculated keyframes: ${calculatedKeyframes}`);
              
              // Report keyframes and duration to parent
              if (onKeyframesChange && typeof onKeyframesChange === 'function') {
                onKeyframesChange(calculatedKeyframes, characterName, animationDuration);
              }
            } catch (error) {
              console.warn('Error analyzing keyframes:', error);
              // Fallback to duration-based calculation
              const duration = loadedGLTF.animations[0].duration;
              const fallbackKeyframes = Math.round(duration * 30);
              if (onKeyframesChange && typeof onKeyframesChange === 'function') {
                onKeyframesChange(fallbackKeyframes, characterName, duration);
              }
            }
          }
          
          console.log('Animation setup complete:', loadedGLTF.animations.length, 'animations found');
        } else {
          console.log('No animations found in GLTF file');
        }
        
      } catch (error) {
        console.error('GLTF loading failed:', error);
        setError(true);
      }
    };
    
    if (glbPath) {
      loadGLTF();
    }
  }, [glbPath]);
  
  useEffect(() => {
    if (gltf && !error) {
      try {
        console.log('Processing GLTF model:', gltf);
        
        const scene = gltf.scene;
        
        // Replace all materials with default material
        scene.traverse((child) => {
          if (child.isMesh) {
            console.log('Processing mesh:', child.name, 'replacing material');
            
            // Use the same default material as FBX files
            child.material = new THREE.MeshLambertMaterial({
              color: new THREE.Color(0xaaaaaa),
              side: THREE.DoubleSide
            });
            
            // Ensure normals are correct
            if (child.geometry) {
              child.geometry.computeVertexNormals();
            }
            
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Center the model properly using bounding box (more reliable for GLB files)
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        console.log('GLB Bounding box - Center:', center, 'Size:', size);
        
        // Use bounding box center for GLB files (more reliable than bone positions)
        scene.position.x = -center.x;
        scene.position.z = -center.z;
        scene.position.y = -box.min.y; // Keep Y positioning for ground placement
        
        console.log('GLB Centering - Final position:', scene.position);
        
        // Scale to fit  
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        scene.scale.setScalar(scale);
        
        console.log('GLTF processed - final position:', scene.position, 'scale:', scale);
      } catch (err) {
        console.warn('Error processing GLTF model:', err);
        setError(true);
      }
    }
  }, [gltf, error]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (action) {
      if (isPlaying) {
        action.paused = false;
      } else {
        action.paused = true;
      }
    }
  }, [isPlaying, action]);

  // Synchronize animation time across all scenes
  useEffect(() => {
    if (mixer && action && sharedAnimationTime !== undefined) {
      // For non-main source views, always sync to the shared time
      // For main source, only sync when not playing (during scrubbing)
      const shouldSync = !isMainSource || !isPlaying;
      
      if (shouldSync) {
        const duration = action.getClip().duration;
        const normalizedTime = sharedAnimationTime % duration;
        action.time = normalizedTime;
        mixer.update(0); // Update without advancing time
      }
    }
  }, [sharedAnimationTime, mixer, action, isPlaying, isMainSource]);

  useFrame((state, delta) => {
    // Update animation mixer
    if (mixer && isPlaying) {
      // Apply playback speed to delta
      const adjustedDelta = delta * playbackSpeed;
      mixer.update(adjustedDelta);
      
      // If this is the main source, broadcast the time to others
      if (isMainSource && action && onAnimationTimeChange) {
        onAnimationTimeChange(action.time);
      }
    }
  });

  const GridSystem = () => {
    const gridShader = {
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform vec3 uGridColor1;
        uniform vec3 uGridColor2;
        uniform float uGridSize1;
        uniform float uGridSize2;
        uniform float uLineWidth;
        
        float getGrid(float size) {
          vec2 coord = vWorldPosition.xz / size;
          vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
          float line = min(grid.x, grid.y);
          return 1.0 - min(line, 1.0);
        }
        
        void main() {
          float grid1 = getGrid(uGridSize1);
          float grid2 = getGrid(uGridSize2);
          
          vec3 color = mix(vec3(0.94, 0.94, 0.94), uGridColor2, grid2);
          color = mix(color, uGridColor1, grid1);
          
          float alpha = max(grid1, grid2) * 0.5;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        uGridColor1: { value: new THREE.Color(0x666666) },
        uGridColor2: { value: new THREE.Color(0x999999) },
        uGridSize1: { value: 0.5 },
        uGridSize2: { value: 0.1 },
        uLineWidth: { value: 0.02 }
      }
    };

    return (
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shaderMaterial 
          {...gridShader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  };

  if (error || !gltf) {
    return <GridSystem />;
  }

  return (
    <>
      <group ref={glbRef}>
        <primitive object={gltf.scene} />
      </group>
      <GridSystem />
    </>
  );
};

const FBXViewer = ({ 
  characterName = 'default', 
  animationName = 'idle',
  motionUuid,
  onCameraChange,
  onAnimationTimeChange,
  onKeyframesChange = null,
  cameraPosition,
  isPlaying = true,
  sharedAnimationTime,
  sharedViewState,
  isMainSource = false,
  playbackSpeed = 1.0,
  className = '',
  fbxBasePath = '/MIRRORED-Anims/fbx',
  useGLB = false,
  glbBasePath = '/MIRRORED-Anims/fbx'
}) => {
  const controlsRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate file path based on format (FBX or GLB)
  const filePath = motionUuid ? 
    (useGLB ? `${glbBasePath}/${motionUuid}/${characterName}.fbx.glb` : `${fbxBasePath}/${motionUuid}/${characterName}.fbx`) 
    : null;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (controlsRef.current && cameraPosition) {
      // Sync camera for all views
      controlsRef.current.object.position.copy(cameraPosition.position);
      controlsRef.current.target.copy(cameraPosition.target);
      controlsRef.current.update();
    }
  }, [cameraPosition]);

  // Handle shared view state changes from the source gizmo
  useEffect(() => {
    if (sharedViewState && !isMainSource && controlsRef.current) {
      console.log('Applying shared view state:', sharedViewState);
      handleViewChange(sharedViewState.view, sharedViewState.isOrthographic);
    }
  }, [sharedViewState, isMainSource]);

  const handleCameraChange = () => {
    if (controlsRef.current && onCameraChange) {
      const camera = controlsRef.current.object;
      const target = controlsRef.current.target;
      onCameraChange({
        position: camera.position.clone(),
        target: target.clone()
      });
    }
  };

  const handleViewChange = (view, isOrthographic) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const controls = controlsRef.current;
      
      // Set camera type
      if (isOrthographic && camera.isPerspectiveCamera) {
        // Switch to orthographic would need camera recreation
        // For now, just adjust the view
      }
      
      // Set view positions
      const distance = 5;
      switch (view) {
        case 'front':
          camera.position.set(0, 1, distance);
          controls.target.set(0, 1, 0);
          break;
        case 'side':
          camera.position.set(distance, 1, 0);
          controls.target.set(0, 1, 0);
          break;
        case 'top':
          camera.position.set(0, distance, 0);
          controls.target.set(0, 0, 0);
          break;
      }
      
      controls.update();
      handleCameraChange();
    }
  };

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          <p className="font-mono text-xs text-gray-600">Loading {characterName}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [2, 1, 2], fov: 50 }}
        style={{ background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)' }}
        shadows
      >
        <ambientLight intensity={0.8} color="#ffffff" />
        <hemisphereLight 
          skyColor="#ffffff" 
          groundColor="#888888" 
          intensity={0.6} 
        />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.0} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#ffffff" />
        
        {filePath && (
          <FBXErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              {useGLB ? (
                <GLTFCharacter 
                  glbPath={filePath} 
                  isPlaying={isPlaying} 
                  sharedAnimationTime={sharedAnimationTime}
                  onAnimationTimeChange={onAnimationTimeChange}
                  isMainSource={isMainSource}
                  onKeyframesChange={onKeyframesChange}
                  characterName={characterName}
                  playbackSpeed={playbackSpeed}
                />
              ) : (
                <FBXCharacter 
                  fbxPath={filePath} 
                  isPlaying={isPlaying} 
                  sharedAnimationTime={sharedAnimationTime}
                  onAnimationTimeChange={onAnimationTimeChange}
                  isMainSource={isMainSource}
                  onKeyframesChange={onKeyframesChange}
                  characterName={characterName}
                  playbackSpeed={playbackSpeed}
                />
              )}
            </Suspense>
          </FBXErrorBoundary>
        )}
        
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          onChange={handleCameraChange}
          minDistance={1}
          maxDistance={10}
          target={[0, 1, 0]}
        />
      </Canvas>
      
    </div>
  );
};

export default FBXViewer;