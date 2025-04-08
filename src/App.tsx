import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound, User } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="endorsements/:endorsementId" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
