import Navigation from '../components/common/Navigation';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Homepage = () => {
  return (
    <div className="homepage">
      <Navigation />
      <Header />
      <div className="content">
        <h1>Welcome to WrapForge</h1>
        <p>Your one-stop solution for motorcycle wraps and accessories.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;