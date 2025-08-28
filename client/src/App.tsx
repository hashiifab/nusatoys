import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
// Import admin components directly to ensure they're included in the build
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Force reference to admin components to prevent tree-shaking
const forceReference = {
	AdminLogin,
	AdminDashboard
};
console.log("Admin components loaded:", Object.keys(forceReference).join(", "));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/product/:productSlug" element={<ProductDetailPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/admin/login" element={<AdminLogin />} />
				<Route 
					path="/admin/dashboard" 
					element={
						<ProtectedRoute>
							<AdminDashboard />
						</ProtectedRoute>
					} 
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
