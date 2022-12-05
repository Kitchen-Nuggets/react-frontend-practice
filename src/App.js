import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ContactList from './components/ContactList';
import ViewContact from './components/View';
import PageError from './components/PageNotFound';
import Main from './components/Main';

function App() 
{
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/view/:id' element={<ViewContact />} />
          <Route path='*' element={<PageError />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
