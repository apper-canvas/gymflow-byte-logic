import React from 'react'

      const Button = ({ children, className = '', onClick, type = 'button', icon: IconComponent, iconSize, ...props }) => {
        return (
          <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center space-x-2 transition-all duration-200 ${className}`}
            {...props}
          >
            {IconComponent && typeof IconComponent === 'string' ? (
              // This case should ideally not be hit if Icon.jsx is used for ApperIcon
              // But keeping it for robustness if a string name is passed from higher up
              React.createElement('span', { className: `text-${iconSize || 20}` }, IconComponent)
            ) : (
              IconComponent
            )}
            <span>{children}</span>
          </button>
        )
      }

      export default Button