import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import '@fontsource/oswald'

import Background from './components/Background'
import Login from './components/Login'
import Register from './components/Register'
import MyPromise from './components/MyPromise'
import NotFound from './components/NotFound'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import { theme } from './utils/theme'

function App () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Background>
            <Routes>
              <Route path='/' element={<MyPromise />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Background>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
