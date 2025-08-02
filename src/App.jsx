import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import Header from './components/Header'
import VideoSection from './components/VideoSection'
import AbstractSection from './components/AbstractSection'
import OverviewSection from './components/OverviewSection'
import ResultsSection from './components/ResultsSection'
import ControlRigSection from './components/ControlRigSection'
import DatasetSection from './components/DatasetSection'
import CitationSection from './components/CitationSection'
import FBXTest from './components/FBXTest'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Check if we should show the FBX test page
  const showFBXTest = window.location.search.includes('fbxtest') || window.location.hash.includes('fbxtest')

  useEffect(() => {
    // Default to light mode for technical drawing aesthetic
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      // Ensure we remove dark class on initial load
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // If FBX test mode, show only the test page
  if (showFBXTest) {
    return <FBXTest />;
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Technical grid background */}
      <div className={`fixed inset-0 technical-grid opacity-50 ${darkMode ? 'dark' : ''}`} />
      
      {/* Technical drawing crosshatch pattern */}
      <div className="fixed inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="8" height="8">
              <path d="M0,8 L8,0" stroke={darkMode ? "#fff" : "#000"} strokeWidth="0.5"/>
              <path d="M0,0 L8,8" stroke={darkMode ? "#fff" : "#000"} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crosshatch)" />
        </svg>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 technical-button"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-16" style={{counterReset: 'section-counter'}}>
        <Header />
        <VideoSection />
        <AbstractSection />
        <OverviewSection />
        <ResultsSection />
        <ControlRigSection />
        <DatasetSection />
        <CitationSection />
      </div>
    </div>
  )
}

export default App 