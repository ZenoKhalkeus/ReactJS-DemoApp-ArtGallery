import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ArtworkProvider } from './contexts/ArtworkContext';
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/Logout/Logout';
import { Details } from './components/Details/Details';
import { Create } from './components/Create/Create';
import { Collection } from './components/Collection/Collection';
import { Search } from './components/Search/Search';
import { Edit } from './components/Edit/Edit';


function App() {
  return (
    <AuthProvider>
    <ArtworkProvider>
      <div className="App">
      
        <Header />
      
      <main>
      <Routes>
          <Route path='/login' element ={<Login />} />
          <Route path='/register' element ={<Register />} />
          <Route path='/dashboard' element ={<Dashboard />} />
          <Route path='/collection' element ={<Collection />} />
          <Route path='/catalog/:artworkId' element ={<Details />} />
          <Route path='/edit/:artworkId' element ={<Edit />} />
          <Route path='/logout' element ={<Logout />} />
          <Route path='/create' element ={<Create />} />
          <Route path='/search' element ={<Search />} />
        </Routes>
      </main>
    
      <Footer />
      </div>
    </ArtworkProvider>
  </AuthProvider>
  );
}

export default App;
