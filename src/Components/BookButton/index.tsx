import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { IBook } from '../../Interfaces/IBook';
import CreateBookingModal from '../CreateBookingModal';
import ReturnBookModal from '../ReturnBookModal';


interface Props {
    bookId: string
    role: string
    isBooked: boolean
    book: IBook
}

const BookButton: React.FC<Props> = ({bookId, role, isBooked, book}) => {
  const [showReturnModal, setShowReturnModal] = useState<boolean>(false);
  const [showCreateBookingModal, setShowCreateBookingModal] = useState<boolean>(false);

  const bookingId = book.bookings[0]?.id;

  const content = () => {
    if (role === 'admin' && isBooked) return 'Return Book';
    if (isBooked) return 'Booked';
    return 'Book';    
  };

  const isDisabled = () => {
    if (role === 'user' && isBooked) return true;
    return false;
  };

  const variant = () => {
    if (role === 'admin' && isBooked) return 'warning';
    return 'success';
  };

  const action = () => {
    if (role === 'admin' && isBooked) return setShowReturnModal(true);
    if (role === 'admin' && !isBooked) return setShowCreateBookingModal(true);
    return openUserModal(); 
  };

  const openAdminModal = () => {};
  const openUserModal = () => {};

  return (
    <>
      <Button
        variant={variant()}
        disabled={isDisabled()}
        onClick={() => action()}
      >
        {content()}
      </Button>
      <ReturnBookModal 
        showModal={showReturnModal}
        setShowModal={setShowReturnModal}
        bookingId={bookingId}
      />
      <CreateBookingModal 
        showModal={showCreateBookingModal}
        setShowModal={setShowCreateBookingModal}
        bookId={bookId}      
      />
    </> 
  );

};

export default BookButton;