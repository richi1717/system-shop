import type { ReactNode } from 'react'
import type { ShopItem } from '../types'
import {
  Sword,
  Axe,
  Shield,
  Hammer,
  FlaskConical,
  ScrollText,
  Backpack,
  Coins,
  UtensilsCrossed,
  Flame,
  BookOpen,
  Gem,
  Pencil,
  Pen,
  Milk,
  Shell,
  Shirt,
  Dices,
  Tent,
  BowArrow,
  Sparkles,
  Footprints,
  Medal,
  ShieldPlus,
  CircleDashed,
  Tablets,
  Compass,
  SoapDispenserDroplet,
  Circle,
  Section,
  Lock,
  Key,
  Egg,
  EarOff,
  Swords,
  MoveUp,
  HelpCircle,
} from 'lucide-react'
import { Stack, Typography } from '@mui/material'

const includesAny = (name: string, needles: string[]) =>
  needles.some((n) => name.includes(n))

export function iconFor(item: ShopItem): ReactNode {
  const name = (item.name || '').toLowerCase()
  const cat = item.category

  if (cat === 'weapon') {
    if (includesAny(name, ['flame tongue']))
      return (
        <Stack direction="row" justifyContent="center">
          <Flame />
          <Sword style={{ marginLeft: -24 }} />
        </Stack>
      )
    if (includesAny(name, ['silent fang']))
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <EarOff style={{ height: 32, width: 32 }} />
          <Sword />
        </Stack>
      )
    if (includesAny(name, ['+1']))
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Sword />
          <Typography sx={{ fontSize: 40 }}>+1</Typography>
        </Stack>
      )
    if (includesAny(name, ['+2']))
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Sword />
          <Typography sx={{ fontSize: 40 }}>+2</Typography>
        </Stack>
      )

    if (includesAny(name, ['daggers'])) return <Swords />
    if (includesAny(name, ['dagger', 'sword', 'rapier', 'sabre']))
      return <Sword />

    if (includesAny(name, ['axe', 'battleaxe', 'handaxe'])) return <Axe />
    if (includesAny(name, ['hammer', 'warhammer', 'maul'])) return <Hammer />
    if (includesAny(name, ['bow', 'crossbow', 'arrow'])) return <BowArrow /> // bow-ish
    if (includesAny(name, ['spear', 'pike', 'lance'])) return <MoveUp /> // spear-ish
    return <Sword />
  }

  if (cat === 'armor') {
    if (includesAny(name, ['shield +1'])) return <ShieldPlus />
    if (includesAny(name, ['+1']))
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Shirt />
          <Typography sx={{ fontSize: 40 }}>+1</Typography>
        </Stack>
      )
    if (includesAny(name, ['shield +2']))
      return (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <ShieldPlus />
          <ShieldPlus />
        </Stack>
      )
    if (includesAny(name, ['shield', 'bracer'])) return <Shield />
    if (
      includesAny(name, [
        'frosthide mail',
        'mantle of burden',
        'armor',
        'chain mail',
        'cloak',
      ])
    )
      return <Shirt />
    if (includesAny(name, ['boot', 'foot'])) return <Footprints />
    return <Shield />
  }

  if (cat === 'consumable') {
    if (includesAny(name, ['oil'])) return <SoapDispenserDroplet />
    if (includesAny(name, ['scroll'])) return <ScrollText />
    return <FlaskConical />
  }

  if (cat === 'basic') {
    if (includesAny(name, ['waterskin'])) return <Milk />
    if (includesAny(name, ['healer'])) return <Sparkles />
    if (includesAny(name, ['tent'])) return <Tent />
    if (includesAny(name, ['rope'])) return <Shell />
    if (includesAny(name, ['pencil', 'pen'])) return <Pencil /> // writing-ish
    if (includesAny(name, ['chalk'])) return <Pen /> // writing-ish
    if (includesAny(name, ['torch', 'light', 'lantern'])) return <Flame />
    if (includesAny(name, ['food', 'ration'])) return <UtensilsCrossed />
    if (includesAny(name, ['backpack', 'pack'])) return <Backpack />
    if (includesAny(name, ['lock & key']))
      return (
        <Stack direction="row" justifyContent="center">
          <Lock />
          <Key />
        </Stack>
      )
    if (includesAny(name, ['key'])) return <Key />
    if (includesAny(name, ['lock'])) return <Lock />
    if (includesAny(name, ['book'])) return <BookOpen />
    return <Coins />
  }

  if (cat === 'misc') {
    if (includesAny(name, ['boot', 'foot'])) return <Footprints />
    if (includesAny(name, ['sigil'])) return <Section />
    if (includesAny(name, ['compass'])) return <Compass />
    if (includesAny(name, ['stone'])) return <Tablets />
    if (includesAny(name, ['belt'])) return <Medal />
    if (includesAny(name, ['torch', 'light', 'lantern'])) return <Flame />
    if (includesAny(name, ['dice'])) return <Dices />
    if (includesAny(name, ['ring of invisibility']))
      return (
        <Stack direction="row" alignItems="flex-start" justifyContent="center">
          <CircleDashed />
          <Gem
            style={{ height: 24, width: 24, marginLeft: -44, marginTop: -16 }}
          />
        </Stack>
      )
    if (includesAny(name, ['ring']))
      return (
        <Stack direction="row" alignItems="flex-start" justifyContent="center">
          <Circle />
          <Gem
            style={{ height: 24, width: 24, marginLeft: -44, marginTop: -16 }}
          />
        </Stack>
      )
    if (includesAny(name, ['amulet', 'gem', 'crystal'])) return <Gem />
    if (includesAny(name, ['bag', 'holding'])) return <Egg />
    if (includesAny(name, ['coin', 'gold'])) return <Coins />
    if (includesAny(name, ['compass'])) return <Gem />

    return <HelpCircle />
  }

  return <HelpCircle />
}
