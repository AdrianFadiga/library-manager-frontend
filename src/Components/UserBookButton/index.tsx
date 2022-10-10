import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { IContext, MyContext } from '../../context/MyContext';
import { requestAPI } from '../../Services';

interface Props {
    isBooked: boolean
    bookId: string
}

// Este componente será reaproveitado
// Tempo curto e mta coisa p fazer
// Depois reaproveitar no AdminBookButton
const UserBookButton: React.FC<Props> = ({isBooked, bookId}) => {
  const {loggedId} = useContext(MyContext) as IContext;
  const bookThisBook = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    await requestAPI('POST', {
      userId: loggedId,
      bookId
    }, 'bookings', {Authorization: `Bearer ${token}`});
    window.location.reload();

    
  };
  return (
    <Button
      disabled={isBooked}
      variant="success"
      onClick={() => bookThisBook()}
    >
      {isBooked ? 'Booked' : 'Book'}
    </Button>
  );
};

export default UserBookButton;