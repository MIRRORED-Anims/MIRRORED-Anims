const DatasetSection = () => {
  return (
    <section className="space-y-6">
      <h2 className="section-title">DATASET</h2>
      
      <div className="section-border p-6 bg-white dark:bg-gray-900 min-h-[400px]">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">🗃️</div>
            <p className="font-mono text-lg text-gray-600 dark:text-gray-400">
              DATASET_EXPLORER
            </p>
            <p className="font-mono text-sm text-gray-500 dark:text-gray-500 max-w-md">
              [Interactive dataset exploration interface will be built here]
            </p>
            <div className="mt-6 space-y-2">
              <p className="font-mono text-xs text-gray-400 dark:text-gray-600">
                Features to include:
              </p>
              <div className="space-y-1 font-mono text-xs text-gray-500 dark:text-gray-500">
                <p>→ Browse animations by category</p>
                <p>→ Filter by character type</p>
                <p>→ Preview motion sequences</p>
                <p>→ Download dataset subsets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DatasetSection 