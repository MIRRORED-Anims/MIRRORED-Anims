const OverviewSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="section-title">OVERVIEW</h2>
      
      <div className="section-border bg-gray-50 dark:bg-gray-800 p-8">
        <div className="aspect-[16/10] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl">📊</div>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
              OVERVIEW_FIGURE.png
            </p>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-500 max-w-md">
              [Overview figure showing the method pipeline]
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewSection 