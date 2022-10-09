import Header from '../../Components/Header';
import style from './Books.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../Services';
import { IBook } from '../../Interfaces/IBook';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CreateBookModal from '../../Components/CreateBookModal';
import { ICategory } from '../../Interfaces/ICategory';
import FilterForm from '../../Components/FilterForm/FilterForm';

function Books() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState<IBook[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([{id: '9837c100-9021-4f97-9ef6-8ec5fa35ba14', category: 'Romance'}]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const getCategories = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const response = await requestAPI<ICategory[]>('GET', {}, 'categories', {Authorization: `Bearer ${token}`});
    setCategories(response.data);
  };

  const getBooks = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    if (!token) navigate('/');
    const response = await requestAPI<IBook[]>('GET', {}, 'books', {Authorization: `Bearer ${token}`});
    setBookList(response.data);
  };

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  return (
    <section className={style.bookPage}>
      <Header />
      <Container>
        <Button 
          size="lg"
          onClick={() => setShowCreateModal(true)}>
          +
        </Button>
        <Button size="lg" onClick={() => setShowFilterModal(true)}>
          ?
        </Button>
      </Container>
      <FilterForm 
        categories={categories} 
        showModal={showFilterModal}
        setShowModal={setShowFilterModal}
      />
      <CreateBookModal
        categories={categories} 
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
      />
      <Container>
        <Row xs="1" sm="2" md="3" lg="4" xl="5" xxl="6">
          {bookList.map((book) => (  
            <Card 
              key={book.id}            
            >
              <Card.Img 
                variant="top"
                src={book.imageUrl}
                style={{height: '80%'}}
              />
              <Card.Title
                style={{height: '20%'}}
              >{book.title}</Card.Title>
            </Card>
          ))}          
        </Row>
      </Container>
    </section>
  );
}

export default Books;