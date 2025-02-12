import { Search } from 'lucide-react'
import { Input } from '../ui/input'

interface SearchBarProps {
  searchKeyword: string
  setSearchKeyword: (keyword: string) => void
  placeholder?: string
}

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  placeholder = 'Cari...',
}: SearchBarProps) => {
  return (
    <div className="relative w-full md:w-64">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
        size={18}
      />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
