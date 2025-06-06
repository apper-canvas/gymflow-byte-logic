import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const NavigationItem = ({ id, label, icon, isActive, onClick }) => {
        const activeClass = isActive
          ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg'
          : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'

        return (
          <Button
            key={id}
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeClass}`}
          >
            <Icon name={icon} size={20} className={isActive ? 'text-white' : ''} />
            <Text as="span" className="font-medium">{label}</Text>
          </Button>
        )
      }

      export default NavigationItem