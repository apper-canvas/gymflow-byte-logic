import Icon from '@/components/atoms/Icon'
      import Input from '@/components/atoms/Input'

      const SearchInput = ({ value, onChange, placeholder = 'Search...' }) => {
        return (
          <div className="relative flex-1 max-w-md">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <Input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="pl-10 pr-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )
      }

      export default SearchInput