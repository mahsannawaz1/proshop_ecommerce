import {Container} from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
  return (
    <Router>
      <div >

        <Header />

        <main className="py-3"> <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/products/:id" element={<ProductDetailScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen/>} />
          </Routes>
          
        </Container>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
