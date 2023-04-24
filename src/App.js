import logo from './logo.svg';
import './css/App.css';
import Header from './components/header/Header';
import Welcome from './components/welcome/Welcome';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <main>
        <div className="container">
          <Welcome /*user="John"*/ />
        </div>
      </main> 
      <Footer />
    </div> 
  );
}

export default App;
