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

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 technical-grid">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 technical-button"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
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