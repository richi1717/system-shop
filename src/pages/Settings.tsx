import { Box, Typography } from '@mui/material'

export default function Settings() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ color: '#00e0ff', fontWeight: 800 }}>
        Settings
      </Typography>
      <Typography sx={{ color: '#7ad9ff' }}>
        Future: theme tweaks, data seeding, offline cache controls.
      </Typography>
    </Box>
  )
}
