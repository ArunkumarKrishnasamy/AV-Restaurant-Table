import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Recipes from "./Recipes";
import Ingredients from "./Ingredients";
import Topbar from "./Topbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Topbar />
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/ingredients" element={<Ingredients />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
