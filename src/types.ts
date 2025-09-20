export type ShopItem = {
  id: string
  name: string
  category: 'basic' | 'consumable' | 'weapon' | 'armor' | 'misc'
  subcategory?: string
  price?: number // undefined if locked
  locked: boolean
  source: 'phb' | 'homebrew'
  gamble?: boolean
  desc?: string
  image?: string // e.g. '/icons/items/dagger.png'
  difficulty?: 'None' | 'Low' | 'Medium' | 'High' | '???'
}
