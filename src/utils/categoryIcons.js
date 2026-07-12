import {
  Briefcase,
  Building2,
  Car,
  Clapperboard,
  Cpu,
  Dumbbell,
  GraduationCap,
  Home,
  Plane,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Wallet,
  Wrench,
} from 'lucide-react'

export const categoryIconMap = {
  Technology: Cpu,
  'Food & Drink': UtensilsCrossed,
  'Health & Fitness': Dumbbell,
  Retail: ShoppingBag,
  Automotive: Car,
  Travel: Plane,
  Finance: Wallet,
  Education: GraduationCap,
  'Real Estate': Building2,
  Entertainment: Clapperboard,
  'Beauty & Spa': Sparkles,
  'Home Services': Wrench,
  General: Briefcase,
  default: Briefcase,
}

export function getCategoryIcon(name) {
  return categoryIconMap[name] || categoryIconMap.default
}
