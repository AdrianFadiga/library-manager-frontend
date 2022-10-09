import { useState } from 'react';
import { IBook } from '../Interfaces/IBook';
import { MyContext } from './MyContext';

interface Props {
    children: React.ReactNode
}

const MyProvider: React.FC<Props> = ({children}) => {
  const [books, setBooks] = useState<IBook[]>([]);

  const state = {
    books,
    setBooks,
  };
  return (
    <MyContext.Provider value={state}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;