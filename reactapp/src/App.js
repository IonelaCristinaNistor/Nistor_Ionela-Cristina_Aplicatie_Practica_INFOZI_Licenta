import "./index.css"

import HomeScreen from './screens/HomeScreen';
import ArtworksScreen from './screens/ArtworksScreen'
import Cart from "./screens/Cart";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from './screens/RegistrationScreen'
import Profile from './screens/Profile'

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
          <Route path='/register' element={<RegistrationScreen />} />
          <Route path='/profile' element={<Profile />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
