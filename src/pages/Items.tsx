import { Box, Typography } from '@mui/material'

export default function Items() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ color: '#00e0ff', fontWeight: 800 }}>
        Items
      </Typography>
      <Typography sx={{ color: '#7ad9ff' }}>
        Future: print-friendly item list, exports, JSON sync, etc.
      </Typography>
    </Box>
  )
}
