import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const CitationSection = () => {
  const [copied, setCopied] = useState(false)
  
  const bibtexCitation = `@article{mirrored_anims_2024,
  title={MIRRORED-Anims: Motion Inversion for Rig-space Retargeting to Obtain a Reliable Enlarged Dataset of Character Animations},
  author={Anonymous Authors},
  journal={Anonymous Conference},
  year={2024},
  url={https://anonymous-authors.github.io/MIRRORED-Anims-webpage/}
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
      <h2 className="section-title">CITE THIS WORK</h2>
      
      <div className="section-border bg-gray-50 dark:bg-gray-800 p-6">
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