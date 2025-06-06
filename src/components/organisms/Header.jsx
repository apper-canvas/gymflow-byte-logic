import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      const Header = ({ activeSection }) => {
        return (
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <Title as="h2" className="text-2xl capitalize">
                  {activeSection}
                </Title>
                <Text as="p" className="text-surface-600 dark:text-surface-400 mt-1">
                  Manage your gym operations efficiently
                </Text>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <Text as="span" className="text-sm font-medium text-accent">Live</Text>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-white" />
                </div>
              </div>
            </div>
          </motion.header>
        )
      }

      export default Header