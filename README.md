# MIRRORED-Anims Research Webpage

A research webpage for "MIRRORED-Anims: Motion Inversion for Rig-space Retargeting to Obtain a Reliable Enlarged Dataset of Character Animations".

## Overview

This project creates a clean, technical research webpage inspired by engineering design principles. The site features:

- **Dark/Light Mode**: Toggle in the top right corner
- **Technical Aesthetic**: Clean borders, monospace fonts, precise layouts
- **Responsive Design**: Works on desktop and mobile devices
- **GitHub Pages Ready**: Configured for easy deployment

## Sections

1. **Title & Authors**: Project title and anonymous author information
2. **Video**: Main demonstration video (repository or YouTube hosted)
3. **Abstract**: Research paper abstract
4. **Overview**: Method pipeline figure
5. **Results Highlights**: Key result videos in grid layout
6. **Control Rig**: Download button for .blend file + ThreeJS demo (planned)
7. **Dataset**: Interactive exploration interface (planned)
8. **Citation**: BibTeX format with copy functionality

## Technology Stack

- **React 19.1.0**: Modern React with hooks
- **Vite 7.0.4**: Fast build tool and dev server
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Lucide React**: Clean, consistent icons
- **Three.js**: For future 3D rig demo

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This copies the built files to the root for GitHub Pages deployment.

## Design Philosophy

The design takes inspiration from technical/engineering aesthetics:

- **Typography**: Inter for body text, JetBrains Mono for technical elements
- **Colors**: Primary blue palette (#0ea5e9 variants) with high contrast
- **Layout**: Clean borders, precise spacing, grid-based organization
- **Interactive Elements**: Technical buttons with hover states
- **Theming**: Smooth dark/light mode transitions

## File Structure

```
├── src/
│   ├── components/          # React components for each section
│   │   ├── Header.jsx
│   │   ├── VideoSection.jsx
│   │   ├── AbstractSection.jsx
│   │   ├── OverviewSection.jsx
│   │   ├── ResultsSection.jsx
│   │   ├── ControlRigSection.jsx
│   │   ├── DatasetSection.jsx
│   │   └── CitationSection.jsx
│   ├── App.jsx             # Main app with dark mode logic
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles and technical elements
├── public/                 # Static assets
├── index.html              # HTML template
└── vite.config.js          # Vite configuration
```

## Future Enhancements

- **ThreeJS Integration**: Interactive 3D rig demonstration
- **Dataset Explorer**: Browse and filter animation dataset
- **Video Integration**: Replace placeholders with actual media
- **Performance Optimization**: Lazy loading and code splitting

## Contributing

This webpage template can be adapted for other research projects by:

1. Updating the content in each component
2. Replacing placeholder media with actual assets
3. Customizing the color scheme in `tailwind.config.js`
4. Adding project-specific functionality

## License

[Specify your license here] 