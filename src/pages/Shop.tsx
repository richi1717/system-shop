import * as React from 'react'
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Switch,
  Slider,
} from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { ITEMS } from '../data/items'
import type { ShopItem } from '../types'
import SystemItemCard from '../components/SystemItemCard'

type Category = 'all' | 'basic' | 'consumable' | 'weapon' | 'armor' | 'misc'

export default function Shop() {
  const [q, setQ] = React.useState('')
  const [cat, setCat] = React.useState<Category>('all')
  const [budgetMode, setBudgetMode] = React.useState<'lte' | 'gte'>('lte')
  const [budget, setBudget] = React.useState<number>(100000)
  const [showLocked, setShowLocked] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const [active, setActive] = React.useState<ShopItem | null>(null)

  const filtered = React.useMemo(() => {
    let rows = ITEMS.slice()
    rows.sort((a, b) => {
      const av = a.locked
        ? Number.POSITIVE_INFINITY
        : (a.price ?? Number.POSITIVE_INFINITY)
      const bv = b.locked
        ? Number.POSITIVE_INFINITY
        : (b.price ?? Number.POSITIVE_INFINITY)
      return av - bv
    })
    if (cat !== 'all') rows = rows.filter((r) => r.category === cat)
    if (!showLocked) rows = rows.filter((r) => !r.locked)
    if (q.trim()) {
      const t = q.toLowerCase()
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(t) ||
          (r.subcategory || '').toLowerCase().includes(t),
      )
    }
    rows = rows.filter((r) => {
      if (r.locked) return true
      if (r.price == null) return true
      return budgetMode === 'lte' ? r.price <= budget : r.price >= budget
    })
    return rows
  }, [q, cat, budget, budgetMode, showLocked])

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Item',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Typography sx={{ color: '#00bfff' }}>{params.value}</Typography>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      sortable: false,
      renderCell: (p) => (
        <Typography sx={{ color: '#7ad9ff' }}>{p.value}</Typography>
      ),
    },
    {
      field: 'priceString',
      headerName: 'Price',
      width: 140,
      sortable: false,
      renderCell: (p) => (
        <Typography sx={{ color: '#00e0ff', fontWeight: 700 }}>
          {p.value}
        </Typography>
      ),
    },
  ]

  const rows = filtered.map((r) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    priceString: r.locked ? '???G' : `${r.price?.toLocaleString()}G`,
    _raw: r,
  }))

  return (
    <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={2}>
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography
            variant="h5"
            sx={{ color: '#00e0ff', fontWeight: 800, letterSpacing: 1 }}
          >
            [ SYSTEM SHOP ]
          </Typography>
          <Typography sx={{ color: '#7ad9ff', opacity: 0.8 }}>
            Unauthorized duplication prohibited. All purchases final.
          </Typography>
        </Box>

        {/* Controls */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search"
            size="small"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Category"
            size="small"
            select
            value={cat}
            onChange={(e) => setCat(e.target.value as Category)}
            sx={{ width: 180 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="consumable">Consumable</MenuItem>
            <MenuItem value="weapon">Weapon</MenuItem>
            <MenuItem value="armor">Armor</MenuItem>
            <MenuItem value="misc">Misc</MenuItem>
          </TextField>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={budgetMode}
            onChange={(_, v) => v && setBudgetMode(v)}
          >
            <ToggleButton value="lte">≤ Budget</ToggleButton>
            <ToggleButton value="gte">≥ Target</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ minWidth: 220 }}>
            <Typography sx={{ color: '#7ad9ff', mb: 0.5 }}>
              {budgetMode === 'lte' ? 'Max Budget' : 'Show Items Above'}
            </Typography>
            <Slider
              value={budget}
              onChange={(_, v) => setBudget(v as number)}
              min={0}
              max={100000}
              step={500}
            />
            <Typography sx={{ color: '#00e0ff', fontWeight: 700 }}>
              {budget.toLocaleString()}G
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={showLocked}
                onChange={(e) => setShowLocked(e.target.checked)}
              />
            }
            label="Show Locked (???G)"
            sx={{ color: '#7ad9ff' }}
          />
        </Stack>

        {/* Table */}
        <Box
          sx={{
            // iPad-friendly height: fill remaining space, not hardcoded pixels
            flex: 1,
            minHeight: 0,
            border: '1px solid #00bfff33',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            onRowClick={(p) => {
              setActive(p.row._raw)
              setOpen(true)
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 100, page: 0 } },
            }}
            pageSizeOptions={[25, 50, 100]}
            sx={{
              height: '100%',
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: '#00111A',
                WebkitOverflowScrolling: 'touch', // smooth iOS scroll
              },
              '& .MuiDataGrid-row': { borderBottom: '1px solid #00bfff33' },
              '& .MuiDataGrid-cell': {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                lineHeight: 1.2,
                py: 1.2,
              },
            }}
          />
        </Box>
      </Stack>
      <SystemItemCard
        open={open}
        item={active}
        onClose={() => setOpen(false)}
      />
    </Box>
  )
}
