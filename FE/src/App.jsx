import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditorPages from "./pages/editor";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EditorPages />}>
            <Route index element={<EditorPages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
