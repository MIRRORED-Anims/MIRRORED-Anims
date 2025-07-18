const AbstractSection = () => {
  return (
    <section className="space-y-4">
      <h2 className="section-title">ABSTRACT</h2>
      
      <div className="abstract-box relative technical-measurements">
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
        
        <p className="text-base leading-relaxed font-mono">
          We propose MIRRORED-Anims, a novel retargeting procedure for transferring motion between skinned humanoid characters of different morphologies. It is designed so as to mimic the strengths of the closed-source Mixamo's retargeting method, currently used as a standard to create motion databases and train all state-of-the-art learning-based retargeting methods, despite severe shortcomings (namely, a lack of character diversity and notable penetration artifacts). Taking inspiration from the toolsets of 3D animators, our retargeting algorithm relies on the control rigs used to manipulate characters, by identifying and transferring controller values on predefined bone mechanisms. While it produces motions which are closer to the Mixamo most successful results than any state-of-the-art learning-based technique, MIRRORED-Anims creates fewer penetration artifacts than the Mixamo dataset, improving the perceived quality of the output motions. Moreover, it can retarget motion in real-time to and from the SMPL body model, making it possible to leverage the large available motion databases in SMPL format for the retargeting task. Because it relies solely on transparent, explainable rig operations, MIRRORED-Anims can reliably be used to generate ground-truth motions for any humanoid character, providing a reliable baseline for the future training of learning-based methods.
        </p>
      </div>
    </section>
  )
}

export default AbstractSection 