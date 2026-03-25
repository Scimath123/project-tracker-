# React + Vite Project Tracker

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh 

##  Deployment & Links

- Live Demo:project-tracker-yg5g.vercel.app
  


## 🛠 Setup Instructions

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
```


## 🧠 Technical Breakdown

### State Management: Why Zustand?

I chose Zustand because it’s lightweight and simpler than Redux for this kind of project. It doesn’t require wrapping the entire app in providers, which keeps things clean.

Since a project tracker frequently updates task states, Zustand’s selectors help ensure only the affected components re-render. This keeps the UI fast and responsive.


### Virtual Scrolling Implementation

To handle large numbers of tasks efficiently, I implemented virtual scrolling.

Instead of rendering all items at once, only the visible items (plus a small buffer) are rendered. A fixed-height container and calculated scroll offsets maintain the correct scrollbar behavior, making the optimization invisible to the user.


### Drag-and-Drop Approach

I used a library-based drag-and-drop solution to handle interactions smoothly.

The workflow follows a source → destination model:
- Capture the `onDragEnd` event  
- Update Zustand store optimistically  
- Re-render only necessary components  


##  The "Hardest UI Problem" Explanation

The toughest challenge was combining **Drag-and-Drop with Virtual Scrolling**.

Normally, virtualized lists unmount items that go off-screen. But during a drag, this causes issues if the dragged element disappears.

### Solution:

- Ensured the dragged item **stays mounted** using refs  
- Prevented virtualizer from removing the active element  
- Added a **placeholder ("ghost") div** with the same height to avoid layout shifts  

### Performance Optimization:

- Used `transform: translate()` instead of `top/left`
- Avoided layout reflows
- Ensed smooth, lag-free dragging

---

## 🔄 Future Improvements

With more time, I would implement **Undo/Redo functionality**.

Planned approach:
- Use the **Command Pattern** in Zustand
- Store action history
- Enable shortcuts like `Ctrl + Z` for undo

This would significantly improve usability and make the app feel more polished.

---

## 📊 Performance & Quality

### Lighthouse Report

![WhatsApp Image 2026-03-25 at 12 42 42](https://github.com/user-attachments/assets/bb374865-bd57-431e-9fcb-731bc7b5ce4f)


---

## 📦 Tech Stack

- React  
- Vite  
- TypeScript  
- Zustand  
- Tailwind CSS  

---

## 📌 Author

**Kausthuv Narayan Medhi**
