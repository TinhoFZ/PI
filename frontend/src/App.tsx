import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Zones from "./pages/Zones";

import Treasures from "./pages/Treasures";
import Quests from "./pages/Quests";
import Map from "./pages/Map";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const token = localStorage.getItem("token");


    if (!token) {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}

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
                element={<RequireAuth><Dashboard /></RequireAuth>}
            />

            <Route
                path="/zones"
                element={<RequireAuth><Zones /></RequireAuth>}
            />

            <Route
                path="/treasures"
                element={<RequireAuth><Treasures /></RequireAuth>}
            />

            <Route
                path="/quests"
                element={<RequireAuth><Quests /></RequireAuth>}
            />

            <Route
                path="/map"
                element={<RequireAuth><Map /></RequireAuth>}
            />

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

