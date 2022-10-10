import { IBook } from '../../Interfaces/IBook';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useState } from 'react';
import { IContext, MyContext } from '../../context/MyContext';
import Card from 'react-bootstrap/Card';
import EditBookModal from '../EditBookModal';
import DeleteBookModal from '../DeleteBookModal';
import style from './BookCard.module.css';
import BookButton from '../BookButton';

interface Props {
    book: IBook
}

const BookCard: React.FC<Props> = ({book}) => {
  const { role } = useContext(MyContext) as IContext;
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const isBooked = book.bookings.length > 0;
  return (
    <Card 
      style={{marginBottom: '5px'}}          
    >
      {role === 'admin' && 
      <Card.Header
        className={style.cardHeader}>
        <NavDropdown
          title="..."
        >
          <NavDropdown.Item
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => setShowDeleteModal(true)}>
              Delete
          </NavDropdown.Item>
        </NavDropdown>
      </Card.Header>
      }
      <Card.Img
        className={style.cardImg} 
        variant="top"
        src={book.imageUrl}

        style={{height: '70%', objectFit: 'cover'}}

      />
      <Card.Title
        style={{height: '20%'}}
      >{book.title}</Card.Title>
      <Card.Footer
        className={style.cardFooter}
      >
        <BookButton
          book={book} 
          bookId={book.id}
          role={role}
          isBooked={isBooked}
        />
      </Card.Footer>
      <EditBookModal 
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        categoryId={book.categoryId}
        bookId={book.id}
      />
      <DeleteBookModal 
        bookId={book.id}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
      />
    </Card>
  );
};

export default BookCard;