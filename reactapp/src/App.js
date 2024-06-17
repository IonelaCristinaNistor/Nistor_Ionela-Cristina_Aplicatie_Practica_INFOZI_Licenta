import "./index.css"

import HomeScreen from './screens/HomeScreen';
import ArtworksScreen from './screens/ArtworksScreen'
import ArtworkListScreen from './screens/ArtworkListScreen'
import ArtworkAdminList from './screens/ArtworkAdminList'
import ArtworkEdit from './screens/ArtworkEdit'
import Cart from "./screens/Cart";
import LoginScreen from "./screens/LoginScreen";
import Registration from './screens/Registration'
import Profile from './screens/Profile'
import Delivery from './screens/Delivery'
import Payment from './screens/Payment'
import PlaceOrder from './screens/PlaceOrder'
import Favorites from './screens/Favorites'
import Header from './components/Header'
import Footer from './components/Footer';
import Order from './screens/Order'
import UsersListScreen from './screens/UsersListScreen'
import OrderList from './screens/OrderList'
import UserEdit from './screens/UserEdit'

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
          <Route path='/artworklistscreen' element={<ArtworkListScreen />} />

          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/admin/userlist' element={<UsersListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEdit />} />
          <Route path='/admin/artworklist' element={<ArtworkAdminList />} />
          <Route path='/admin/artwork/:id/edit' element={<ArtworkEdit />} />
          <Route path='/admin/orderlist/' element={<OrderList />} />

          <Route path='/cart/:id?' element={<Cart />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/order/:id' element={<Order />} />
          
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
