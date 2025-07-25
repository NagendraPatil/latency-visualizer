# Latency Visualizer

### 🌐 **Overview**

This project visualizes real-time and historical latency data of exchange servers across cloud providers (AWS, GCP, Azure) on an interactive 3D globe.

---

## ⚙️ **Key Features**

✅ **3D Globe** with exchange server locations and latency arcs
✅ **Real-time updates** via Socket.IO
✅ **Historical latency charts** using Recharts
✅ **Provider and latency filters**
✅ **Search exchanges** and camera focus
✅ **Responsive and user-friendly UI** with Tailwind CSS
✅ **Performance metrics dashboard**

---

## 🏗️ **Tech Stack & Libraries Used**

| **Library/Framework** | **Purpose**                          |
| --------------------- | ------------------------------------ |
| Next.js               | React framework for SSR & routing    |
| React                 | Core library                         |
| Tailwind CSS          | Styling and responsive design        |
| three.js              | 3D rendering engine                  |
| react-three-fiber     | React renderer for three.js          |
| three-globe           | Globe visualizations                 |
| @react-three/drei     | Useful helpers for react-three-fiber |
| Recharts              | Data visualization charts            |
| Socket.IO Client      | Real-time websocket communication    |
| axios                 | HTTP requests                        |

---

## 🗂️ **Project Structure Summary**

- `components/`
  - `GlobeComponent.tsx`: Renders canvas, globe scene, camera controls, toggles.
  - `GlobeScene.tsx`: Initializes three-globe instance, updates layers.
  - `LatencyChart.tsx`: Shows historical latency using Recharts.
  - `Legend.tsx` & `LatencyLegend.tsx`: Visual legends for latency & providers.
  - `MetricsDashboard.tsx`: Displays system metrics.
  - `ExportButton.tsx`: Buttons to export dashboard data to JSON and CSV.
  - `Sidebar.tsx`: Provider & latency filters.

- `app/`
  - `page.tsx` & `layout.tsx`: Home page with main layout, data fetching, sockets.

- `lib/`
  - `websocket.ts`: Socket disconnect helper.

- `types/`
  - `index.ts`: TypeScript types for server data.

- `public/`
  - Textures for earth rendering.

---

## 🖥️ **Local Development Setup**

### ⚡ **Prerequisites**

- **Node.js** (v16 or above recommended)
- **npm** or **yarn**

### 💻 **Steps to Run Locally**

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/latency-visualizer.git
cd latency-visualizer
```

2. **Install dependencies**

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

3. **Set up environment variables**

you can set up the below or use the mock-server folder given in the root directory to run a local server. For the development and demo purposes, I am using the server from mock-server, since I could not find any free servers for the purpose.(please go to to mock-server folder and run commands 'npm i' and 'node index.js' to run server locally in a different terminal)

OR

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_SOCKET_URL=ws://localhost:4000
```

_(Replace with your backend WebSocket URL)_

4. **Start the development server**

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

5. **Visit in browser**

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📝 **Notes**

- Ensure your backend WebSocket server is running on the URL specified in `.env.local`.
- The app uses **dynamic imports** for `three-globe` to ensure server-side rendering compatibility in Next.js.
- Tailwind CSS classes are used extensively for layout and responsiveness. Customize further in `globals.css` or Tailwind config as needed.

---

## 🙏 **Acknowledgements**

- [three-globe](https://github.com/vasturiano/three-globe) for the excellent globe visualization library.
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber) for making three.js easier in React.
- [Recharts](https://recharts.org) for simple and flexible charts.

---

## 👨‍💻 **Author**

> Developed by **Nagendra Patil**.

---

This README serves as a comprehensive documentation for onboarding, development, and understanding of your **Latency Visualizer** application.

---

**Thank You for reading to the end 😁😇**
