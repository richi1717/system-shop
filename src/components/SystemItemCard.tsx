// src/components/SystemItemCard.tsx
import * as React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Modal,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ShopItem } from '../types'
import { iconFor } from '../lib/icons'

const COLOR = {
  bg: '#00111A',
  pane: '#021823',
  glow: '#00e7ff',
  text: '#daf6ff',
  sub: '#89e8ff',
}

type Props = { open: boolean; item: ShopItem | null; onClose: () => void }

export default function SystemItemCard({ open, item, onClose }: Props) {
  if (!item) return null
  const locked = item.locked
  const priceText = locked ? '???G' : `${(item.price ?? 0).toLocaleString()}G`
  const difficulty = item.difficulty ?? (locked ? '???' : 'None')

  // trigger a single “burst” when the modal opens for locked items
  const [burstKey, setBurstKey] = React.useState(0)
  React.useEffect(() => {
    if (open) setBurstKey((k) => k + 1)
  }, [open])

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'grid', placeItems: 'center' }}
    >
      <Box
        sx={{
          width: { xs: '92vw', sm: 640 },
          maxWidth: '96vw',
          bgcolor: COLOR.bg,
          position: 'relative',
          borderRadius: 2,
          p: 0,
          overflow: 'visible',
          boxShadow: `0 0 0 1px ${COLOR.glow}66, 0 0 24px ${COLOR.glow}55, inset 0 0 32px ${COLOR.glow}11`,
          animation: 'glowPulse 4s ease-in-out infinite',
          '@keyframes glowPulse': {
            '0%,100%': {
              boxShadow: `0 0 0 1px ${COLOR.glow}66, 0 0 22px ${COLOR.glow}44, inset 0 0 26px ${COLOR.glow}10`,
            },
            '50%': {
              boxShadow: `0 0 0 1px ${COLOR.glow}77, 0 0 30px ${COLOR.glow}66, inset 0 0 36px ${COLOR.glow}18`,
            },
          },
        }}
      >
        {/* scanline overlay (super faint, never blocks content) */}
        <Box
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 2,
            borderRadius: 14,
            zIndex: 1,
            background: `repeating-linear-gradient(180deg, transparent 0 8px, ${COLOR.glow}0A 8px 9px)`,
            mixBlendMode: 'screen',
            opacity: 0.12,
          }}
        />

        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: COLOR.glow,
            zIndex: 30,
            background: 'rgba(0,0,0,0.12)',
            '&:hover': {
              background: 'rgba(0,0,0,0.18)',
              filter: 'drop-shadow(0 0 6px #00e7ff)',
            },
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        {/* Inner frame */}
        <Box
          sx={{
            m: 1.25,
            borderRadius: 1.25,
            position: 'relative',
            background: COLOR.pane,
            border: `1px solid ${COLOR.glow}33`,
            boxShadow: `inset 0 0 24px ${COLOR.glow}11`,
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2.25 },
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 1 }}>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: 1.2,
                color: COLOR.sub,
                textTransform: 'uppercase',
              }}
            >
              ITEM:
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
                background: `linear-gradient(180deg, ${COLOR.glow}, #b7f5ff)`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: `0 0 8px ${COLOR.glow}55`,
              }}
            >
              {item.name}
            </Typography>
          </Box>

          {/* Body */}
          <Stack direction="row" spacing={2} alignItems="flex-start">
            {/* Icon */}
            <Box
              sx={{
                width: 120,
                height: 120,
                flex: '0 0 120px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: 1,
                // border: `1px solid #00e7ff55`,
                // backgroundColor: '#011018',
                zIndex: 15,
                color: '#00e7ff',
                '& svg': {
                  width: 64,
                  height: 64,
                  filter: 'drop-shadow(0 0 8px #00e7ffcc)',
                },
              }}
            >
              {iconFor(item)}
            </Box>

            {/* Fields */}
            <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
              <Row label="ACQUISITION DIFFICULTY" value={difficulty} />
              <Row label="CATEGORY" value={titleCase(item.category)} />
              <Divider sx={{ borderColor: `${COLOR.glow}22`, my: 0.5 }} />
              <Typography sx={{ fontSize: 14, color: COLOR.sub, mt: 0.5 }}>
                Gold:
              </Typography>

              {/* Price — glitch when locked */}
              <Typography
                key={locked ? burstKey : 'no-glitch'}
                sx={{
                  fontSize: 28,
                  fontWeight: 900,
                  background: `linear-gradient(180deg, ${COLOR.glow}, #b7f5ff)`,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: `0 0 12px ${COLOR.glow}66`,
                  ...(locked
                    ? {
                        // one short burst on open, then idle pulse
                        animation:
                          'priceBurst 650ms steps(8, end) 1, priceIdle 3.2s ease-in-out infinite 900ms',
                        '@keyframes priceBurst': {
                          '0%': { filter: 'none', transform: 'translate(0,0)' },
                          '10%': {
                            filter: 'hue-rotate(10deg) saturate(1.2)',
                            transform: 'translate(0.5px,-0.5px)',
                          },
                          '20%': {
                            filter: 'hue-rotate(-10deg) saturate(1.2)',
                            transform: 'translate(-0.5px,0.5px)',
                          },
                          '40%': {
                            textShadow: `0 0 14px ${COLOR.glow}aa, 2px 0 #b7f5ff55, -2px 0 #00e7ff55`,
                          },
                          '60%': {
                            transform: 'translate(0.6px,0)',
                            opacity: 0.95,
                          },
                          '80%': { transform: 'translate(-0.4px,0.2px)' },
                          '100%': {
                            filter: 'none',
                            transform: 'translate(0,0)',
                          },
                        },
                        '@keyframes priceIdle': {
                          '0%,100%': { textShadow: `0 0 10px ${COLOR.glow}66` },
                          '50%': { textShadow: `0 0 14px ${COLOR.glow}99` },
                        },
                        '@media (prefers-reduced-motion: reduce)': {
                          animation: 'none',
                        },
                      }
                    : {
                        animation: 'priceIdle 3.2s ease-in-out infinite',
                        '@keyframes priceIdle': {
                          '0%,100%': { textShadow: `0 0 10px ${COLOR.glow}55` },
                          '50%': { textShadow: `0 0 14px ${COLOR.glow}88` },
                        },
                        '@media (prefers-reduced-motion: reduce)': {
                          animation: 'none',
                        },
                      }),
                }}
              >
                {priceText}
              </Typography>
            </Stack>
          </Stack>

          {(item.desc ?? '').length > 0 && (
            <Box sx={{ mt: 2, borderTop: `1px solid ${COLOR.glow}12`, pt: 1 }}>
              <Typography sx={{ color: COLOR.text, opacity: 0.95 }}>
                {item.desc}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography sx={{ fontSize: 12, color: '#7ad9ff', letterSpacing: 1.2 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#c6f6ff' }}>{value}</Typography>
    </Stack>
  )
}
function titleCase(s: string) {
  return s[0]?.toUpperCase() + s.slice(1)
}
