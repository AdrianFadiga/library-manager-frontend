import { createContext } from 'react';
import { IBook } from '../Interfaces/IBook';

export interface IContext {
    books: IBook[],
    setBooks: (books: IBook[]) => void
}

export const MyContext = createContext<IContext | null>(null);