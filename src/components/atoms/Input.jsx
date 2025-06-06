const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => {
        return (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            {...props}
          />
        )
      }

      export default Input