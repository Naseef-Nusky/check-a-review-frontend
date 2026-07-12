import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar({ placeholder = 'Search for a business...', className = '', variant = 'light' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const styles = variant === 'dark'
    ? 'border-white/10 bg-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-white/10'
    : 'border-border bg-white text-ink placeholder:text-ink-muted/70 focus:border-primary-400 focus:ring-primary-500/10'

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search
          className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[1.5] ${variant === 'dark' ? 'text-white/50' : 'text-slate-400'}`}
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`input-field pl-11 ${styles}`}
        />
      </div>
    </form>
  )
}
