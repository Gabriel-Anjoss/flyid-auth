import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/Pages/LoginPage";
import HomePage from "../features/home/Pages/HomePage";
import PrivateRoute from "./PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}