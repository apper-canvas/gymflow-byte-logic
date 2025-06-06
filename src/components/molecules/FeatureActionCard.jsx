import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'

      const FeatureActionCard = ({ label, icon, onClick }) => {
        return (
          <Button
            onClick={onClick}
            className="flex flex-col items-center space-y-2 p-4 bg-surface-100 dark:bg-surface-700 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600"
          >
            <Icon name={icon} size={24} className="text-primary" />
            <Text as="span" className="text-sm font-medium text-surface-700 dark:text-surface-300">{label}</Text>
          </Button>
        )
      }

      export default FeatureActionCard