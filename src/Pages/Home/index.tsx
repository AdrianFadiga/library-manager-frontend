import Header from '../../Components/Header';
import style from './Home.module.css';

function Home() {

  return (
    <section className={style.homePage}>
      <Header />
      <h1>Home</h1>

    </section>
  );
}

export default Home;