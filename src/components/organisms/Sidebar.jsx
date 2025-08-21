import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      import NavigationItem from '@/components/molecules/NavigationItem'

      const Sidebar = ({ activeSection, setActiveSection, darkMode, setDarkMode }) => {
        const sidebarItems = [
          { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
          { id: 'members', label: 'Members', icon: 'Users' },
          { id: 'equipment', label: 'Equipment', icon: 'Dumbbell' },
          { id: 'classes', label: 'Classes', icon: 'Calendar' },
          { id: 'workouts', label: 'Workouts', icon: 'Activity' },
          { id: 'checkin', label: 'Check-in', icon: 'UserCheck' }
        ]

        return (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-0 top-0 h-full w-64 bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-r border-surface-200 dark:border-surface-700 z-30"
          >
            {/* Logo */}
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Icon name="Dumbbell" size={24} className="text-white" />
</div>
                <div>
                  <Title as="h1" className="text-xl">Gym Flow Ultra Pro</Title>
                  <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">Gym Management</Text>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <NavigationItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  isActive={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                />
              ))}
            </nav>

            {/* Dark Mode Toggle */}
            <div className="absolute bottom-6 left-4 right-4">
              <Button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors px-4 py-3 rounded-xl"
                icon={<Icon name={darkMode ? 'Sun' : 'Moon'} size={20} className="text-surface-700 dark:text-surface-300" />}
              >
                <Text as="span" className="font-medium text-surface-700 dark:text-surface-300">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Text>
              </Button>
            </div>
          </motion.div>
        )
      }

      export default Sidebar