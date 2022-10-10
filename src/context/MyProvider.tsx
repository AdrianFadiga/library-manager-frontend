import { useState } from 'react';
import { IBook } from '../Interfaces/IBook';
import { ICategory } from '../Interfaces/ICategory';
import { IUser } from '../Interfaces/IUser';
import { MyContext } from './MyContext';

interface Props {
    children: React.ReactNode
}

const MyProvider: React.FC<Props> = ({children}) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [showRemoveFilterButton, setShowRemoveFilterButton] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [loggedId, setLoggedId] = useState<string>('');
  const [categories, setCategories] = useState<ICategory[]>([{id: '9837c100-9021-4f97-9ef6-8ec5fa35ba14', category: 'Romance'}]);
  const [users, setUsers] = useState<IUser[]>([]);


  const state = {
    books,
    setBooks,
    showRemoveFilterButton,
    setShowRemoveFilterButton,
    role,
    setRole,
    categories,
    setCategories,
    loggedId,
    setLoggedId,
    users,
    setUsers
  };
  return (
    <MyContext.Provider value={state}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;