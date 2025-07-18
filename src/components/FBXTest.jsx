import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

const FBXTestModel = ({ fbxPath }) => {
  const fbxRef = useRef();
  const [fbx, setFbx] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('Loading...');
  
  console.log('Attempting to load FBX from:', fbxPath);
  
  useEffect(() => {
    const loadFBX = async () => {
      try {
        setLoadingError(null);
        setLoadingStatus('Loading...');
        setFbx(null);
        
        console.log('Creating FBX loader...');
        const loader = new FBXLoader();
        
        // First check if the file exists
        console.log('Checking if file exists:', fbxPath);
        const response = await fetch(fbxPath, { method: 'HEAD' });
        console.log('File check response:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`File not found: ${response.status} ${response.statusText}`);
        }
        
        console.log('File exists, loading FBX...');
        
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
              if (progress.total > 0) {
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                setLoadingStatus(`Loading: ${percentage}%`);
              }
            },
            (error) => {
              console.error('FBX loading error:', error);
              reject(error);
            }
          );
        });
        
        setFbx(loadedFBX);
        setLoadingStatus('Loaded successfully');
        
      } catch (error) {
        console.error('FBX loading failed:', error);
        setLoadingError(error.message);
        setLoadingStatus('Error loading FBX');
      }
    };
    
    if (fbxPath) {
      loadFBX();
    }
  }, [fbxPath]);
  
  useEffect(() => {
    if (fbx) {
      console.log('FBX loaded successfully:', fbx);
      setLoadingStatus('Loaded successfully');
      
      // Log model info
      console.log('FBX children:', fbx.children);
      console.log('FBX animations:', fbx.animations);
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(fbx);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      console.log('Model size:', size);
      console.log('Model center:', center);
      
      fbx.position.x = -center.x;
      fbx.position.y = -box.min.y;
      fbx.position.z = -center.z;
      
      // Scale to fit in view
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      fbx.scale.setScalar(scale);
      
      console.log('Applied scale:', scale);
    }
  }, [fbx]);
  
  useFrame((state) => {
    if (fbxRef.current) {
      fbxRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (loadingError) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    );
  }

  if (!fbx) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#yellow" wireframe />
      </mesh>
    );
  }

  return (
    <group ref={fbxRef}>
      <primitive object={fbx} />
    </group>
  );
};

const FBXTest = () => {
  const [selectedFile, setSelectedFile] = useState('/MIRRORED-Anims/fbx/009b2b9b-2974-40f2-8825-feb4db36a6b2/Abe.fbx');
  const [customPath, setCustomPath] = useState('');

  const testFiles = [
    '/MIRRORED-Anims/fbx/009b2b9b-2974-40f2-8825-feb4db36a6b2/Abe.fbx',
    '/MIRRORED-Anims/fbx/009b2b9b-2974-40f2-8825-feb4db36a6b2/Aj.fbx',
    '/MIRRORED-Anims/fbx/009b2b9b-2974-40f2-8825-feb4db36a6b2/Amy.fbx',
    '/MIRRORED-Anims/fbx/009b2b9b-2974-40f2-8825-feb4db36a6b2/XBot.fbx',
  ];

  const handleFileSelect = (path) => {
    setSelectedFile(path);
    setCustomPath('');
  };

  const handleCustomPath = () => {
    if (customPath.trim()) {
      setSelectedFile(customPath.trim());
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-4">FBX Loading Test</h1>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Select Test File:</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {testFiles.map((file, index) => (
              <button
                key={index}
                onClick={() => handleFileSelect(file)}
                className={`px-3 py-1 text-sm border rounded ${
                  selectedFile === file 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {file.split('/').pop()}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter custom FBX path..."
              value={customPath}
              onChange={(e) => setCustomPath(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={handleCustomPath}
              className="px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Load
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          Current: <code className="bg-gray-100 px-2 py-1 rounded">{selectedFile}</code>
        </div>
        
        <div className="text-sm">
          <span className="font-semibold">Status:</span> 
          <span className="ml-2 px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
            Loading status will appear here
          </span>
        </div>
      </div>

      <div className="h-full">
        <Canvas
          camera={{ position: [3, 2, 3], fov: 50 }}
          style={{ background: 'linear-gradient(to bottom, #87CEEB, #98FB98)' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          
          <React.Suspense fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#cccccc" wireframe />
            </mesh>
          }>
            <FBXTestModel fbxPath={selectedFile} />
          </React.Suspense>
          
          {/* Ground plane */}
          <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#90EE90" transparent opacity={0.3} />
          </mesh>
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            target={[0, 1, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default FBXTest;