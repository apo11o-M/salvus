import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import LoginWithReddit from "./pages/Login"
import Canvas from "./pages/Canvas"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login/callback" element={<LoginWithReddit />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;