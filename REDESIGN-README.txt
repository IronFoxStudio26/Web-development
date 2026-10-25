IRON FOX STUDIO — REDESIGN PREVIEW

Files:
- index.html: redesigned homepage; existing project and section pages are retained.
- redesign.css: responsive charcoal/orange visual system.
- redesign.js: Three.js interactive procedural fox-like 3D emblem, orbit rings, particles and pointer parallax.
- All original assets and HTML pages remain in this folder.

Run locally:
1. Open a terminal in this folder.
2. Run: python -m http.server 8000
3. Visit http://localhost:8000

Note:
- Three.js and Google Fonts load from CDNs, so an internet connection is needed.
- The current 3D fox emblem is procedural placeholder geometry, not a production-quality fox-head model. Replace the placeholder group in redesign.js with a properly licensed .glb fox model for the intended final look.
- Existing secondary pages are preserved and have not yet been visually redesigned to match the homepage.
- Firebase.js contains web-app configuration from the supplied project. Review Firebase security rules and rotate credentials if you believe they were exposed; Firebase web API keys are normally public identifiers, but access must be secured by rules.
