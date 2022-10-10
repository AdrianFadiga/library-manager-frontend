import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { IContext, MyContext } from './context/MyContext';
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Books from './Pages/Books';
import Bookings from './Pages/Bookings';


function App() {
  // const { store } = useContext(MyContext) as IContext;
  
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/home" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>  
  );
}

export default App;
  