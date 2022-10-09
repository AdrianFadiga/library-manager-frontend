import { createContext } from 'react';

export interface IContext {
    xablau: string
}

export const MyContext = createContext<IContext | null>(null);