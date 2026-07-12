export default function MobileMenuButton({ open, onClick, dark = false }) {
  const lineColor = dark ? 'bg-white' : 'bg-slate-700'
  const buttonStyles = dark
    ? 'border-white/15 bg-white/5'
    : 'border-border bg-white'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xl border md:hidden ${buttonStyles}`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
    >
      <span className={`absolute left-1/2 top-[13px] h-0.5 w-4 -translate-x-1/2 ${lineColor} transition ${open ? 'top-1/2 rotate-45' : ''}`} />
      <span className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 ${lineColor} transition ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute bottom-[13px] left-1/2 h-0.5 w-4 -translate-x-1/2 ${lineColor} transition ${open ? 'bottom-1/2 -rotate-45' : ''}`} />
    </button>
  )
}
