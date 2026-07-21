/** Sample company images for UI demos (Unsplash). Replace with uploaded assets later. */
export const SAMPLE_BUSINESSES = [
  {
    id: 1,
    slug: 'tech-solutions-inc',
    name: 'Tech Solutions Inc',
    category: 'Technology',
    rating: 4.8,
    reviewCount: 234,
    plan: 'Premium',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    logo:
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    slug: 'green-cafe',
    name: 'Green Cafe',
    category: 'Food & Drink',
    rating: 4.6,
    reviewCount: 189,
    plan: 'Starter',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    logo:
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    slug: 'fitlife-gym',
    name: 'FitLife Gym',
    category: 'Health & Fitness',
    rating: 4.9,
    reviewCount: 412,
    plan: 'Premium',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    logo:
      'https://images.unsplash.com/photo-1571902943202-507c97c3dabc?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    slug: 'autocare-pro',
    name: 'AutoCare Pro',
    category: 'Automotive',
    rating: 4.5,
    reviewCount: 156,
    plan: 'Free',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    logo:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 5,
    slug: 'digital-works',
    name: 'Digital Works',
    category: 'Technology',
    rating: 4.3,
    reviewCount: 89,
    plan: 'Starter',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    logo:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 6,
    slug: 'cloud-services-ltd',
    name: 'Cloud Services Ltd',
    category: 'Technology',
    rating: 4.6,
    reviewCount: 156,
    plan: 'Premium',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    logo:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
  },
]

export function getSampleBusiness(idOrSlug) {
  const key = String(idOrSlug)
  return (
    SAMPLE_BUSINESSES.find((b) => String(b.id) === key || b.slug === key) ||
    SAMPLE_BUSINESSES[0]
  )
}
