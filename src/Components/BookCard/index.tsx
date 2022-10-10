import { IBook } from '../../Interfaces/IBook';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useState } from 'react';
import { IContext, MyContext } from '../../context/MyContext';
import Card from 'react-bootstrap/Card';
import EditBookModal from '../EditBookModal';
import DeleteBookModal from '../DeleteBookModal';

interface Props {
    book: IBook
}

const BookCard: React.FC<Props> = ({book}) => {
  const { role } = useContext(MyContext) as IContext;
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  return (
    <Card 
      key={book.id}            
    >
      {role === 'admin' && 
      <Card.Header>
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
        variant="top"
        src={book.imageUrl}
        style={{height: '70%', objectFit: 'cover'}}
      />
      <Card.Title
        style={{height: '20%'}}
      >{book.title}</Card.Title>
      <Card.Footer>
        <Button 
          size="sm"
          disabled={book.bookings.length > 0}
        >
          {book.bookings.length > 0 ? 'Booked' : 'Book?'}
        </Button>
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