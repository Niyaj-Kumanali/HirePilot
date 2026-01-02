import { Search } from 'lucide-react'
import './searchbar.scss'

interface JobsSearchProps {
  placeHolder: string
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ placeHolder, value, onChange }: JobsSearchProps) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-icon-box">
          <Search size={20} className="search-icon" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

      </div>
    </div>
  )
}

export default SearchBar