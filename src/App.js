import './App.css';
import BlogNav from './component/BlogNav';
import Home from './view/Home'
import Footer from './component/Footer';
function App() {
  return (
    <div className="d-flex flex-column min-vh-100"> 
      <div className="main-container" style={{backgroundColor: "aliceblue"}}>
          <BlogNav/>
          <Home/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
