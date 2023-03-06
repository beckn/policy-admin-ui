import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CreatePolicyForm from "./PolicyManagement/CreatePolicy/CreatePolicyForm";
import Geofencing from "./PolicyManagement/Geofencing /Geofencing";
import DashboardTabs from "./PolicyManagement/DashboardTabs/DashboardTabs";
import PolicyDetails from "./PolicyManagement/PolicyDetails/PolicyDetails";
// element={<Navigate to="/" replace />}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "createPolicy",
        element: <CreatePolicyForm />,
      },
      {
        path: "createGeoFence",
        element: <Geofencing />,
      },
      {
        path: "dashBoard",
        element: <DashboardTabs />,
      },
      {
        path: "policyDetails/:id",
        element: <PolicyDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
