import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { IContext, MyContext } from '../../context/MyContext';

interface Props {
    setShowCreateModal: (value: boolean) => void
    setShowFilterModal: (value: boolean) => void
}

const BooksButtonsContainer: React.FC<Props> = ({setShowCreateModal, setShowFilterModal}) => {
  const { showRemoveFilterButton, role } = useContext(MyContext) as IContext;

  return (
    <Container>
      {
        role === 'admin' &&
        <Button 
          size="lg"
          onClick={() => setShowCreateModal(true)}>
          +
        </Button>
      }
      <Button size="lg" onClick={() => setShowFilterModal(true)}>
          ?
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