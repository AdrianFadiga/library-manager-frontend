import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { IContext, MyContext } from '../../context/MyContext';
import { CgAddR } from 'react-icons/cg';

interface Props {
    setShowFilterModal: (value: boolean) => void
}

const BookingButtonsContainer: React.FC<Props> = ({setShowFilterModal}) => {
  const { showRemoveFilterButton } = useContext(MyContext) as IContext;

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginBottom: '5px',
        marginTop: '5px'
      }}>
      <Button size="lg" onClick={() => setShowFilterModal(true)}>
        <CgAddR />
      </Button>
      {showRemoveFilterButton && 
        <Button 
          variant="danger"
          onClick={() => window.location.reload()}>Remove Filters</Button>
      }
    </Container>
  );
};

export default BookingButtonsContainer;