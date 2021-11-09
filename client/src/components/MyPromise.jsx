import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Zoom from '@mui/material/Zoom'
import LogoutIcon from '@mui/icons-material/Logout'

import ButtonComponent from './ButtonComponent'

const MyPromise = () => {
  return (
    <>
      <Zoom direction='left' in={true}>
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
                  height: 200,
                  color: 'white',
                  fontSize: '18px'
                }}
              >
                <Box
                  sx={{
                    padding: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  The Lord is compassionate and gracious, slow to anger,
                  abounding in love.
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  Psalm 103:8
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '30px'
                }}
              >
                <ButtonComponent buttonText='My Promise' />
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
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Zoom>
    </>
  )
}

export default MyPromise
