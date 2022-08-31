import './App.css';

import { AddTask, Header, Footer } from './components';

function App() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
        <Header/>

      </div>
      <div className='mb-auto'>
        <AddTask/>
      </div>
      <div>
        <Footer/>

      </div>
    </div>
  );
}

export default App;
