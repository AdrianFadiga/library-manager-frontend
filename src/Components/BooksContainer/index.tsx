import { IBook } from '../../Interfaces/IBook';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import BookCard from '../BookCard';


interface Props {
    books: IBook[]
}

const BooksContainer: React.FC<Props> = ({books}) => {
  return (
    <Container fluid="md">
      <Row xs="1" sm="2" md="3" lg="4" xl="5" xxl="7">
        {books.map((book) => (  
          <BookCard
            key={book.id}
            book={book}
          />
        ))}          
      </Row>
    </Container>
  );
};
export default BooksContainer;