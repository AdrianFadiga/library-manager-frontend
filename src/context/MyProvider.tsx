import { MyContext } from './MyContext';

interface Props {
    children: React.ReactNode
}

const MyProvider: React.FC<Props> = ({children}) => {
  const state = {
    xablau: 'asd'
  };
  return (
    <MyContext.Provider value={state}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;