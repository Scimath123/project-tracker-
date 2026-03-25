# React + Vite Project Tracker

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh 

##  Deployment & Links

- Live Demo:  [project-tracker-yg5g.vercel.app](https://project-tracker-yg5g.vercel.app)
  


##  Setup Instructions

bash
# Clone the repository
git clone <your-repo-url>

# Navigate into project folder
cd <your-project-name>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build



##  Technical Breakdown

### State Management: Why Zustand?

I chose Zustand because it’s lightweight and simpler than Redux for this kind of project. It doesn’t require wrapping the entire app in providers, which keeps things clean.

Since a project tracker frequently updates task states, Zustand’s selectors help ensure only the affected components re-render. This keeps the UI fast and responsive.


### Virtual Scrolling Implementation

To handle large numbers of tasks efficiently, I implemented virtual scrolling.

Instead of rendering all items at once, only the visible items (plus a small buffer) are rendered. A fixed-height container and calculated scroll offsets maintain the correct scrollbar behavior, making the optimization invisible to the user.

 

### Drag-and-Drop Approach

I implemented drag-and-drop **from scratch without using any external library**.

The interaction is handled using native mouse events:
- `onMouseDown` → Start tracking the drag  
- `onMouseMove` → Update position based on cursor movement  
- `onMouseUp` → Drop the item and update state  

I used React’s `useState` to track:
- Current mouse coordinates  
- Active (dragged) item  
- Offset position for smooth movement  

This gave me full control over the drag behavior and avoided the overhead of third-party libraries.

For visual feedback, I used Tailwind CSS to:
- Highlight the dragged item  
- Show hover states for drop zones  
- Add smooth transitions during movement  

---

##  The "Hardest UI Problem" Explanation

The toughest challenge was combining **custom Drag-and-Drop with Virtual Scrolling**.

Since I built drag-and-drop manually, handling it alongside virtualization was even more complex.

### Problem:

Virtual scrolling removes elements from the DOM when they go off-screen.  
During a drag, this could cause the active item to disappear if it leaves the visible area.

---

### Solution:

- Kept track of the dragged item using state so it remains controlled independently  
- Ensured the active dragged element **stays mounted**, regardless of scroll position  
- Used a **"ghost" placeholder div** with the same height to prevent layout shifts  
- Continuously updated position using mouse coordinates for smooth dragging  

---

### Performance Optimization:

- Used `transform: translate()` for movement instead of `top/left`  
- Avoided layout reflows and unnecessary repaints  
- Minimized re-renders by updating only affected components  

---

### Why this approach?

Building drag-and-drop manually helped me:
- Understand low-level DOM interactions  
- Optimize performance exactly where needed  
- Avoid dependency limitations with virtualization  

---

### One thing I'd refine further:

I would improve edge-case handling like:
- Fast scrolling during drag  
- Dragging across multiple columns more smoothly  
- Better auto-scroll when reaching container edges  

---

##  Future Improvements

With more time, I would implement **Undo/Redo functionality**.

Planned approach:
- Use the **Command Pattern** in Zustand
- Store action history
- Enable shortcuts like `Ctrl + Z` for undo

This would significantly improve usability and make the app feel more polished.

---

## Performance & Quality

### Lighthouse Report
![perform](https://github.com/user-attachments/assets/0c0b2bb8-6fa3-42c1-9e49-89cad4fa97af)




---

##  Tech Stack

- React  
- Vite  
- TypeScript  
- Zustand  
- Tailwind CSS  

---

##  Author

**Kausthuv Narayan Medhi**
