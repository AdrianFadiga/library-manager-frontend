import { createContext } from 'react';
import { IBook } from '../Interfaces/IBook';
import { ICategory } from '../Interfaces/ICategory';

export interface IContext {
    books: IBook[],
    setBooks: (books: IBook[]) => void
    showRemoveFilterButton: boolean
    setShowRemoveFilterButton: (value: boolean) => void
    role: string,
    setRole: (role: string) => void
    categories: ICategory[]
    setCategories: (categories: ICategory[]) => void
}

export const MyContext = createContext<IContext | null>(null);