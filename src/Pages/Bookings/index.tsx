import Header from '../../Components/Header';
import style from './Bookings.module.css';

function Bookings() {

  return (
    <section className={style.bookingsPage}>
      <Header />
      <h1>Bookings</h1>

    </section>
  );
}

export default Bookings;