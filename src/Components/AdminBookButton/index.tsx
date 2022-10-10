import { useContext } from 'react';
import { IContext, MyContext } from '../../context/MyContext';
import Button from 'react-bootstrap/Button';
import { requestAPI } from '../../Services';

interface Props {
    isBooked: boolean
    bookId: string
    booking: any
}

// Este componente será reaproveitado
// Tempo curto e mta coisa p fazer
// Depois reaproveitar no UserBookButton
const AdminBookButton: React.FC<Props> = ({isBooked, bookId, booking}) => {
  const bookThisBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {}, 'bookings', {Authorization: `Bearer ${token}`});
    window.location.reload();    
  };

  const returnBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('PATCH', {}, `bookings/${booking[0]?.id}`, {Authorization: `Bearer ${token}`});
    window.location.reload();
  };

  

  return (
    <Button
      variant={isBooked ? 'warning' : 'success'}
      onClick={() => isBooked ? returnBook() : bookThisBook()}
    >
      {isBooked ? 'Return Book' : 'Book'}
    </Button>
  );
};

export default AdminBookButton;