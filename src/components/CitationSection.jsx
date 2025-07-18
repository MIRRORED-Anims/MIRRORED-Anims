import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const CitationSection = () => {
  const [copied, setCopied] = useState(false)
  
  const bibtexCitation = `@article{mirrored_anims,
  title={MIRRORED-Anims: Motion Inversion for Rig-space Retargeting to Obtain a Reliable Enlarged Dataset of Character Animations},
  author={Anonymous Authors},
  journal={Under Review},
  year={2025},
  url={https://MIRRORED-Anims.github.io/MIRRORED-Anims/}
}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtexCitation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy citation:', err)
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="section-title">CITE_THIS_WORK</h2>
      
      <div className="section-border bg-gray-50 dark:bg-gray-800 p-6 relative technical-measurements">
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black dark:border-white z-10"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black dark:border-white z-10"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black dark:border-white z-10"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black dark:border-white z-10"></div>
        
        {/* Dimension markers */}
        <div className="width-marker-left"></div>
        <div className="width-marker-right"></div>
        <div className="height-marker-top"></div>
        <div className="height-marker-bottom"></div>
        
        {/* Dimension labels */}
        <div className="dimension-width">100% WIDTH</div>
        <div className="dimension-height">AUTO HEIGHT</div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="subsection-title">BibTeX</h3>
          <button
            onClick={handleCopy}
            className="technical-button flex items-center gap-2"
            title="Copy citation to clipboard"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
        
        <pre className="font-mono text-sm bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-4 overflow-x-auto text-gray-800 dark:text-gray-200">
          {bibtexCitation}
        </pre>
      </div>
    </section>
  )
}

export default CitationSection 