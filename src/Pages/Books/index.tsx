import Header from '../../Components/Header';
import style from './Books.module.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../Services';
import { IBook } from '../../Interfaces/IBook';

import CreateBookModal from '../../Components/CreateBookModal';
import { ICategory } from '../../Interfaces/ICategory';
import FilterModal from '../../Components/FilterModal';
import { IContext, MyContext } from '../../context/MyContext';
import { IUser } from '../../Interfaces/IUser';
import BooksButtonsContainer from '../../Components/BooksButtonsContainer';
import BooksContainer from '../../Components/BooksContainer';

function Books() {
  const navigate = useNavigate();
  const {books, setBooks, setRole, categories, setCategories, setLoggedId, setUsers} = useContext(MyContext) as IContext;
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  const getAllUsers = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const response = await requestAPI<IUser[]>('GET', {}, 'users/filter?role=user', {Authorization: `Bearer ${token}`});
    setUsers(response.data);
  };
  
  const verifyUser = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    if (!token) navigate('/');
    const response = await requestAPI<IUser>('GET', {}, 'auth/me', {Authorization: `Bearer ${token}`});
    if (response.data.role === 'admin') getAllUsers();
    setRole(response.data.role);
    setLoggedId(response.data.id);
  };

  const getCategories = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const response = await requestAPI<ICategory[]>('GET', {}, 'categories', {Authorization: `Bearer ${token}`});
    setCategories(response.data);
  };

  const getBooks = async () => {
    const token = JSON.parse(localStorage.getItem('authLibrary') as string);
    const response = await requestAPI<IBook[]>('GET', {}, 'books', {Authorization: `Bearer ${token}`});
    setBooks(response.data);
  };

  useEffect(() => {
    verifyUser();
    getBooks();
    getCategories();
  }, []);

  return (
    <section className={style.bookPage}>
      <Header />
      <BooksButtonsContainer 
        setShowCreateModal={setShowCreateModal}
        setShowFilterModal={setShowFilterModal}
      />
      <FilterModal 
        categories={categories} 
        showModal={showFilterModal}
        setShowModal={setShowFilterModal}
      />
      <CreateBookModal
        categories={categories} 
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
      />
      <BooksContainer 
        books={books}
      />
    </section>
  );
}

export default Books;