const Card = ({ children, className = '', ...props }) => {
        return (
          <div className={`glassmorphism rounded-2xl p-6 ${className}`} {...props}>
            {children}
          </div>
        )
      }

      export default Card