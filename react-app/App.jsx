import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './pages/Registration';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {/* Render the Home component directly */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Registration />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/createpost" element={<CreatePost/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;