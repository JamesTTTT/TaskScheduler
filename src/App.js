import './App.css';

import { AddTask, Header, Footer } from './components';

function App() {
  return (
    <div>
      <div>
        <Header/>

      </div>
      <div>
        <AddTask/>
      </div>
      <div>
        <Footer/>

      </div>
    </div>
  );
}

export default App;
