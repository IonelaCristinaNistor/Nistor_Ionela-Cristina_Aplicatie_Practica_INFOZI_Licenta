import "./index.css"

import HomeScreen from './screens/HomeScreen';
import ArtworksScreen from './screens/ArtworksScreen'
import Cart from "./screens/Cart";
import LoginScreen from "./screens/LoginScreen";
import Registration from './screens/Registration'
import Profile from './screens/Profile'
import Delivery from './screens/Delivery'
import Payment from './screens/Payment'
import PlaceOrder from './screens/PlaceOrder'

import Header from './components/Header'
import Footer from './components/Footer';

import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>

      <main className='py-3'>      
      <Header />
        <Container>
          <Routes>
            {" "}
          <Route path='/' element={<HomeScreen />} />
          <Route path='/artwork/:id' element={<ArtworksScreen />} />
          <Route path='/cart/:id?' element={<Cart />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
