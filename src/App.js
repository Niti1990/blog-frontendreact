import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SingleView from './pages/SingleView'
import Category from './pages/Category'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import About from './pages/About'
import Login from './pages/Login'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <Router>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/article/:slug" element={<SingleView />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/about/" element={<About />} />
        <Route path="/login/" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <SiteFooter />
    </Router>
  )
}

export default App
