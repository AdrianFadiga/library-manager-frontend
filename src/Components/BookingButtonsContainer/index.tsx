import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {BiFileFind} from 'react-icons/bi';

interface Props {
    setShowFilterModal: (value: boolean) => void
}

const BookingButtonsContainer: React.FC<Props> = ({setShowFilterModal}) => {

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
        <BiFileFind />
      </Button>
    </Container>
  );
};

export default BookingButtonsContainer;