import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Snackbar,
  Button,
} from '@mui/material'
import App from './App'
import { registerSW } from 'virtual:pwa-register'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#00111A', paper: '#00111A' },
    primary: { main: '#00e7ff' },
    text: { primary: '#daf6ff', secondary: '#89e8ff' },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#00e7ff33', color: '#daf6ff' },
        head: {
          color: '#b7f5ff',
          fontWeight: 700,
          borderBottom: '1px solid #00e7ff66',
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundColor: '#00111A' } } },
    MuiOutlinedInput: {
      styleOverrides: { notchedOutline: { borderColor: '#00e7ff66' } },
    },
  },
})

function SWUpdater() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)

  useEffect(() => {
    registerSW({
      onNeedRefresh() {
        setNeedRefresh(true)
      },
      onOfflineReady() {
        setOfflineReady(true)
      },
    })
  }, [])

  return (
    <>
      <Snackbar
        open={offlineReady}
        autoHideDuration={3000}
        message="Offline ready – System Shop is cached."
      />
      <Snackbar
        open={needRefresh}
        message="New version available"
        action={
          <Button
            size="small"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Update
          </Button>
        }
      />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <SWUpdater />
    </ThemeProvider>
  </React.StrictMode>,
)
