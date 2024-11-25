import NotPage from "./pages/NotPage.jsx";
import UserPage from "./pages/user/UserPage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Dashboard from "./pages/employee/Dashboard.jsx";
import Inventory from "./pages/employee/Inventory.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import SalesHistory from "./pages/employee/SalesHistory.jsx";
import ActivityHistory from "./pages/admin/ActivityHistory.jsx";
import Orders from "./pages/employee/Orders.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductDetails from "./pages/admin/ProductDetails.jsx";
import ProductDetailsUser from "./pages/user/ProductDetails.jsx";
import { Toaster } from "@/components/ui/sonner";
import OrderDetails from "./pages/admin/OrderDetails.jsx";
import Maintenance from "./pages/admin/Maintenance.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import EmployeePage from "./pages/employee/EmployeePage.jsx";
import Cart from "./pages/user/Cart.jsx";
import ProductCategories from "./pages/user/ProductCategories.jsx";
import Home from "./pages/user/Home.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import AuthProvider from "./stores/AutProvider.jsx";
import ModifyProduct from "./pages/admin/ModifyProduct.jsx";
export default function App() {
  return (
    <>
      <ThemeProvider storageKey="vite-ui-theme">
        <Toaster />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserPage />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />

                <Route
                  path="product-categories/:productCategory"
                  element={<ProductCategories />}
                />
                <Route
                  path="product_fullDetails/:productId"
                  element={<ProductDetailsUser />}
                />

                <Route element={<ProtectedRoutes />}>
                  <Route path="cart/:userId" element={<Cart />} />
                </Route>
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/admin" element={<AdminPage />}>
                  <Route index element={<Navigate to="maintenance" />} />
                  <Route
                    path="activity-history"
                    element={<ActivityHistory />}
                  />
                  <Route
                    path="maintenance/product-details/:productId"
                    element={<ProductDetails />}
                  />
                  <Route
                    path="maintenance/add-product"
                    element={<AddProduct />}
                  />
                  <Route
                    path="maintenance/modify-product/:productId"
                    element={<ModifyProduct />}
                  />
                  <Route path="maintenance" element={<Maintenance />} />
                </Route>
                <Route path="/employee" element={<EmployeePage />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="inventory" element={<Inventory />}></Route>
                  <Route path="sales-history" element={<SalesHistory />} />
                  <Route
                    path="activity-history"
                    element={<ActivityHistory />}
                  />
                  <Route
                    path="inventory/product-details/:productId"
                    element={<ProductDetails />}
                  />
                  <Route
                    path="orders/order-details/:orderId"
                    element={<OrderDetails />}
                  />
                </Route>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
