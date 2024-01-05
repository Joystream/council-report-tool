import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "@/pages";
import TokenBurn from "./pages/TokenBurn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/total-burn" element={<TokenBurn />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
