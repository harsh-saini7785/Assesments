import { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes.js'
import Sidebar from './components/SideBar/SideBar.jsx';
import Navbar from './components/NavBar/NavBar.jsx';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Suspense fallback={<h1>loading</h1>}>
          <Routes>
            <Route path='/' element={
              <Sidebar />
            }>
              {routes?.map((route, idx) => {
                return <Route key={idx} path={route.path} element={
                  <route.component />
                } />
              })}
            </Route>
          </Routes>
        </Suspense >
      </Router>
    </div>
  )
}

export default App