import './App.css';
import Homepage from './Pages/Homepage';
import Votepage from './Pages/VotePage'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} exact/>
        <Route path='/Votepage' element={<Votepage />} />
     </Routes>
    </div>
  );
}

export default App;
