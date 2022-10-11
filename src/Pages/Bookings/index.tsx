import Header from '../../Components/Header';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { IContext, MyContext } from '../../context/MyContext';
import { IBooking } from '../../Interfaces/IBooking';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../Services';
import { IUser } from '../../Interfaces/IUser';
import UserBookingsTable from '../../Components/UserBookingsTable';
import AdminBookingTable from '../../Components/AdminBookingsTable';
import BookingButtonsContainer from '../../Components/BookingButtonsContainer';
import BookingFilterModal from '../../Components/BookingFilterModal';
import { IBook } from '../../Interfaces/IBook';

function Bookings() {
  const { setRole, role, setLoggedId } = useContext(MyContext) as IContext;
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('status=active');

  const navigate = useNavigate();

  const isAdmin = role === 'admin';

  const verifyUser = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    if (!token) navigate('/');
    const response = await requestAPI<IUser>('GET', {}, 'auth/me', {Authorization: `Bearer ${token}`});
    setRole(response.data.role);
    setLoggedId(response.data.id);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const getBookings = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const endPoint = isAdmin ? `bookings/filter?${query}` : `bookings/me/filter?${query}`;
    const response = await requestAPI<IBooking[]>('GET', {}, endPoint, {Authorization: `Bearer ${token}`});

    setBookings(response.data);
  };

  const getUsers = async () => {
    if (role === 'admin') {
      const token = JSON.parse(localStorage.getItem('authLibrary') as string);
      const endPoint = 'users/filter?role=user';
      const response = await requestAPI<IUser[]>('GET', {}, endPoint, {Authorization: `Bearer ${token}`});
      setUsers(response.data);
    }
  };

  const getBooks = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const response = await requestAPI<IBook[]>('GET', {}, 'books', {Authorization: `Bearer ${token}`});
    setBooks(response.data);
  };

  const getBookingsByQuery = async (query: string) => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const endPoint = role === 'admin' ? `bookings/filter?${query}` : `bookings/me/filter?${query}`;
    const response = await requestAPI<IBooking[]>('GET', {}, endPoint, {Authorization: `Bearer ${token}`});

    setBookings(response.data);
  };

  useEffect(() => {
    getBookings();
    getBooks();
    getUsers();
  }, [role]);

  return (
    <Container fluid="true">
      <Header />
      <BookingButtonsContainer 
        setShowFilterModal={setShowFilterModal}
      />
      <BookingFilterModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        action={getBookingsByQuery}
        setQuery={setQuery}
        books={books}
        users={users}
        role={role}    
      />
      <Container>
        { !isAdmin &&
        <UserBookingsTable 
          bookings={bookings}
        />    }
        { isAdmin &&
          <AdminBookingTable 
            bookings={bookings}
          />
        }
      </Container>
    </Container>
  );
}

export default Bookings;