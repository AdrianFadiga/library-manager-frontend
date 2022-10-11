import { IBooking } from '../../Interfaces/IBooking';
import Table from 'react-bootstrap/Table';

interface Props {
    bookings: IBooking[]
}

const UserBookingsTable: React.FC<Props> = ({bookings}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Booking Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(({book: {title}, bookingDate, returnDate, status, id}, i) => (
          <tr key={id}>
            <td>{i + 1}</td>
            <td>{title}</td>
            <td>{new Date(bookingDate).toLocaleDateString()}</td>
            <td>{new Date(returnDate).toLocaleDateString()}</td>
            <td>{status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserBookingsTable;