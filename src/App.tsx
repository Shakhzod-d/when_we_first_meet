import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LinkExpired, NotFound, SuccessPage, User } from "./pages";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ENDORSEMENTS} element={<User />} />
        <Route path={ROUTES.SUCCESS} element={<SuccessPage />} />
        <Route path={ROUTES.LINK_EXPIRED} element={<LinkExpired />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
