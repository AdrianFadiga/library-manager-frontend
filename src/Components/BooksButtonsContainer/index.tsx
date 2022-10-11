import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { IContext, MyContext } from '../../context/MyContext';
import { CgAddR } from 'react-icons/cg';
import {BiFileFind} from 'react-icons/bi';
// import style from './BooksButtonsContainer.module.css';
interface Props {
    setShowCreateModal: (value: boolean) => void
    setShowFilterModal: (value: boolean) => void
}

const BooksButtonsContainer: React.FC<Props> = ({setShowCreateModal, setShowFilterModal}) => {
  const { showRemoveFilterButton, role, setShowRemoveFilterButton } = useContext(MyContext) as IContext;

  useEffect(() => {
    setShowRemoveFilterButton(false);
  }, []);

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginBottom: '5px',
        marginTop: '5px'
      }}>
      {
        role === 'admin' &&
        <Button 
          size="lg"
          onClick={() => setShowCreateModal(true)}>
          <CgAddR />
        </Button>
      }
      <Button size="lg" onClick={() => setShowFilterModal(true)}>
        <BiFileFind />
      </Button>
      {showRemoveFilterButton && 
        <Button 
          variant="danger"
          onClick={() => window.location.reload()}>Remove Filters</Button>
      }
    </Container>
  );
};

export default BooksButtonsContainer;