import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 min-h-screen w-auto p-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
