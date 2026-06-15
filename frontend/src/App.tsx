import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Zones from "./pages/Zones";
import Treasures from "./pages/Treasures";
import Quests from "./pages/Quests";

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/zones"
                element={<Zones />}
            />

            <Route
                path="/treasures"
                element={<Treasures />}
            />

            <Route
                path="/quests"
                element={<Quests />}
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;