import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import '@fontsource/oswald'

import Login from './components/Login'
import Register from './components/Register'
import { theme } from './utils/theme'

function App () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: ' center',
            fontFamily: 'Oswald'
          }}
        >
          <Router>
            <Routes>
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
            </Routes>
          </Router>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
