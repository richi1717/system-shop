import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from 'react-router-dom'
import { AppBar, Toolbar, Tabs, Tab, Box } from '@mui/material'
import Shop from './pages/Shop'
import Items from './pages/Items'
import Settings from './pages/Settings'

function Nav() {
  const location = useLocation()
  const value = location.pathname.startsWith('/items')
    ? '/items'
    : location.pathname.startsWith('/settings')
      ? '/settings'
      : '/'

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: '#00111A', borderBottom: '1px solid #00bfff33' }}
    >
      <Toolbar sx={{ minHeight: 56 }}>
        <Tabs
          value={value}
          textColor="primary"
          indicatorColor="primary"
          aria-label="System Shop navigation"
          sx={{ ml: -1 }}
        >
          <Tab
            label="[ SYSTEM SHOP ]"
            value="/"
            component={Link}
            to="/"
            sx={{ fontWeight: 800, letterSpacing: 1 }}
          />
          <Tab label="Items" value="/items" component={Link} to="/items" />
          <Tab
            label="Settings"
            value="/settings"
            component={Link}
            to="/settings"
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: '100dvh', // iOS-safe viewport
          bgcolor: '#000',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Nav />
        {/* page content */}
        <Box
          component="main"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/items" element={<Items />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}
