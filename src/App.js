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
import { JobProvider } from './contexts/JobContext';
import { JobDashboard } from './components/JobDashboard/JobDashboard';
import { JobDetails } from './components/JobDetails/JobDetails';
import { CreateJob } from './components/CreateJob/CreateJob';
import { EditJob } from './components/EditJob/EditJob';


function App() {
  return (
    <AuthProvider>
    <ArtworkProvider>
    <JobProvider>
      <div className="App">
      
        <Header />
      
      <main>
      <Routes>
          <Route path='/login' element ={<Login />} />
          <Route path='/register' element ={<Register />} />
          <Route path='/dashboard' element ={<Dashboard />} />
          <Route path='/jobdashboard' element ={<JobDashboard />} />
          <Route path='/collection' element ={<Collection />} />
          <Route path='/catalog/:artworkId' element ={<Details />} />
          <Route path='/edit/:artworkId' element ={<Edit />} />
          <Route path='/jobcatalog/:jobId' element ={<JobDetails />} />
          <Route path='/editjob/:jobId' element ={<EditJob />} />
          <Route path='/logout' element ={<Logout />} />
          <Route path='/create' element ={<Create />} />
          <Route path='/createjob' element ={<CreateJob />} />
          <Route path='/search' element ={<Search />} />
        </Routes>
      </main>
    
      <Footer />
      </div>
      </JobProvider>
    </ArtworkProvider>
  </AuthProvider>
  );
}

export default App;
