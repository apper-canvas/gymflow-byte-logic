const Title = ({ children, className = '', as = 'h2', ...props }) => {
        const Component = as
        return (
          <Component className={`font-heading font-bold text-surface-900 dark:text-white ${className}`} {...props}>
            {children}
          </Component>
        )
      }

      export default Title