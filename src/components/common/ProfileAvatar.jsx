import { useState } from 'react'

const avatarTones = [
  'bg-primary-100 text-primary-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-800',
]

function getInitials(name = 'Anonymous') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'A'
}

function getAvatarTone(name = '') {
  const code = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return avatarTones[code % avatarTones.length]
}

function getProfileImageUrl(name, src) {
  if (src) return src
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(name || 'anonymous')}`
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-11 w-11 text-sm',
}

export default function ProfileAvatar({
  name = 'Anonymous',
  src,
  size = 'md',
  className = '',
  rounded = 'full',
}) {
  const [failed, setFailed] = useState(false)
  const initials = getInitials(name)
  const tone = getAvatarTone(name)
  const sizeClass = sizeClasses[size] || sizeClasses.md
  const radius = rounded === 'xl' ? 'rounded-xl' : 'rounded-full'
  const imageSrc = getProfileImageUrl(name, src)

  if (!failed) {
    return (
      <img
        src={imageSrc}
        alt=""
        className={`${sizeClass} ${radius} shrink-0 object-cover ring-1 ring-black/5 ${className}`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div
      className={`flex ${sizeClass} ${radius} shrink-0 items-center justify-center font-semibold ${tone} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}
