# Latency Visualizer - Project Overview & Documentation

## **1. Project Summary & Objective**

The **Latency Visualizer** is a real-time monitoring and analytics tool that visualizes latency data across multiple cryptocurrency exchange servers hosted on AWS, GCP, and Azure regions globally. It addresses the problem of **monitoring network health, latency bottlenecks, and performance patterns** across distributed exchange infrastructures in an intuitive and interactive way.

### **Problem Solved**

- Real-time latency tracking across global regions.
- Identifying network performance issues.
- Visual and analytical understanding for devops, SREs, and trading teams.

---

## **2. Use Cases & Applications**

- **Crypto Trading Teams** – Monitor latency to exchanges for arbitrage readiness.
- **Cloud Infrastructure Teams** – Monitor co-location performance across cloud providers.
- **Network Engineers & SREs** – Identify latency spikes and historical trends.
- **Academic / Data Viz Projects** – Demonstrate real-time geo data visualization.

---

## **3. Component-wise Breakdown**

### **a. HomePage.tsx**

- Fetches real-time server data.
- Initializes Socket.io listeners for continuous updates.
- Renders **GlobeComponent**, **LatencyChart**, and **Legend** in a responsive layout.

### **b. GlobeComponent.tsx**

- Uses **three-globe** + **react-three-fiber** to render a 3D interactive globe.
- Displays server points and latency arcs dynamically.
- Contains toggles for real-time / historical data layers.
- Uses **OrbitControls** for intuitive camera control.

### **c. GlobeScene.tsx**

- Initializes the Globe instance with textures.
- Maps servers as colored points based on provider.
- Draws arcs for destination routes with color-coded latency.
- Handles camera fly-to on search.

### **d. LatencyChart.tsx**

- Uses **Recharts LineChart** to plot latency history.
- Dropdown to select data range (1h, 24h, 7d, 30d).
- Fully responsive with dark-themed UI.

### **e. Sidebar.tsx**

- Filters for Cloud Provider and Latency Range.
- Updates GlobeComponent based on selected filters.

### **f. MetricsDashboard.tsx**

- Shows total server count, average latency, and provider distribution.
- Always visible as a floating widget.

### **g. Legend.tsx & LatencyLegend.tsx**

- Explains color coding for providers and latency ranges.

---

## **4. State Management Strategies**

- **React useState & useEffect** for local and lifecycle states.
- **useMemo** for expensive filtered server calculations.
- **useCallback** for event handlers to optimize re-renders.
- **Socket.io client** for real-time event-based updates.

---

## **5. Styling & Best Practices**

- Uses **Tailwind CSS** for utility-first responsive styling.
- Mobile-first layouts with `flex` and `grid` combinations.
- Clear separation of concerns per component.
- Modular imports with **dynamic loading** for heavy 3D components.
- ESLint + Prettier + Husky pre-commit hooks for code quality.

---

## **6. Features Summary**

✅ Real-time latency visualization.
✅ Historical latency trends.
✅ Provider-based color-coded globe points.
✅ Interactive globe with search fly-to.
✅ Camera control UI for user navigation.
✅ Filters sidebar for provider & latency range.
✅ Metrics dashboard.
✅ Dark/Light mode toggle (planned).
✅ Export visualization snapshot functionality (planned).

---

## **7. Future Enhancements**

- Authentication & role-based dashboards.
- TimescaleDB or DynamoDB integration for historical data.
- Integration with Prometheus & Grafana for advanced monitoring.
- 3D globe snapshot export fixes for canvas context.
- Deployment pipeline with CI/CD for automatic builds.
