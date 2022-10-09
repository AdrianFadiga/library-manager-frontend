import Header from '../../Components/Header';
import style from './Books.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../Services';
import { IBook } from '../../Interfaces/IBook';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Books() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState<IBook[]>([]);

  const book = [
    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },    {
      id: '73fca9f3-8f89-4fa9-ad25-3a7d160ccfbc',
      title: 'O Conde de Monte Cristo',
      categoryId: '9837c100-9021-4f97-9ef6-8ec5fa35ba14',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: 'https://m.media-amazon.com/images/I/81ZswN9PVPL.jpg',
    },
  ];

  const getBooks = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    if (!token) navigate('/');
    const response = await requestAPI<IBook[]>('GET', {}, 'books', {Authorization: `Bearer ${token}`});
    setBookList(response.data);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <section className={style.bookPage}>
      <Header />
      <Container>
        <Row lg="4" xl="5" xxl="6">
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