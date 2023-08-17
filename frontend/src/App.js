import {Container} from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

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
            <Route path="/login" element={<LoginScreen/>} />
          </Routes>
          
        </Container>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
