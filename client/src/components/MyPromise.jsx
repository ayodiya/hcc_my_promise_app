import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Zoom from '@mui/material/Zoom'
import CircularProgress from '@mui/material/CircularProgress'
import LogoutIcon from '@mui/icons-material/Logout'
import moment from 'moment'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import Notification from './Notification'
import ButtonComponent from './ButtonComponent'
import { removeToken, getToken, tokenName } from '../utils/localStorage'
import apiCall from '../utils/apiCall'

const MyPromise = () => {
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [thePromise, setThePromise] = useState({})
  const [canGetNewPromise, setCanGetNewPromise] = useState(false)
  const token = getToken(tokenName)

  const getUserMemoryVerses = useCallback(async () => {
    try {
      const { data } = await apiCall(
        'get',
        '/api/usermemoryverses/getmemoryverses',
        '',
        {
          Bearer: token
        }
      )

      setThePromise(data[0]?.memoryVerses[0])
    } catch (error) {
      setErrorMsg(error.response.data.msg)
      setOpenSnackbar(true)
    }
  }, [token])

  const checkIfTheWeek = useCallback(() => {
    if (thePromise?.createdAt !== undefined) {
      return setCanGetNewPromise(
        moment(thePromise?.createdAt).week() === moment().week()
      )
    }
  }, [thePromise?.createdAt])

  useEffect(() => {
    if (getToken(tokenName) === null) {
      navigate('/login')
    }
    getUserMemoryVerses()
    checkIfTheWeek()
  }, [navigate, thePromise, checkIfTheWeek, getUserMemoryVerses])

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleLogout = () => {
    removeToken(tokenName)
    navigate('/login')
  }

  const handleGetMyPromise = async () => {
    setThePromise({ memoryVerse: 'loading' })

    try {
      const { data } = await apiCall('get', '/api/mypromise', '', {
        Bearer: token
      })

      setThePromise(data)
    } catch (error) {
      setErrorMsg(error.response?.data.msg)
      setOpenSnackbar(true)
    }
  }

  return (
    <>
      <Zoom direction='left' in>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignSelf: 'center',
              '& > :not(style)': {
                m: 1,
                minWidth: 300,
                minHeight: { xs: 600, md: 500 }
              }
            }}
          >
            <Paper
              elevation={6}
              sx={{
                padding: '20px',
                backgroundColor: 'primary.main',
                borderRadius: '10px',
                paddingTop: '90px'
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#113a9f',
                  width: 300,
                  minHeight: 200,
                  color: 'white',
                  fontSize: '18px'
                }}
              >
                {thePromise?.memoryVerse === 'loading'
                  ? (
                    <Box
                      sx={{
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                    )
                  : (
                    <>
                      <Box
                        sx={{
                          padding: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          textAlign: 'center'
                        }}
                      >
                        {thePromise?.memoryVerseText}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          paddingBottom: '20px'
                        }}
                      >
                        {thePromise?.memoryVerse}
                      </Box>
                    </>
                    )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '30px'
                }}
              >
                <ButtonComponent
                  buttonText='My Promise'
                  onClick={handleGetMyPromise}
                  disabled={canGetNewPromise}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '20px'
                }}
              >
                <ButtonComponent
                  buttonColor='buttonWarning.main'
                  buttonText='Logout'
                  endIcon={<LogoutIcon />}
                  onClick={handleLogout}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Zoom>
      <Notification
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        errorMsg={errorMsg}
        severity='error'
      />
    </>
  )
}

export default MyPromise
