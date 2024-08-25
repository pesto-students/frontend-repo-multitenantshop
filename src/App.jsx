import { useState } from "react";
// import Layout from './components/tenant-flow/Layout'
import Layout from "./components/user-flow/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="main-container">
      <Layout />
    </div>
  );
}

export default App;
