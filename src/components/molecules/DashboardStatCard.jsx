import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import Title from '@/components/atoms/Title'
      import Card from '@/components/molecules/Card'

      const DashboardStatCard = ({ title, value, icon, color, change, delay }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay }}
          >
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-surface-600 dark:text-surface-400 text-sm font-medium">{title}</Text>
                  <Title as="p" className="text-2xl mt-1">{value}</Title>
                  <Text className="text-accent text-sm font-medium mt-1">{change} from yesterday</Text>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
                  <Icon name={icon} size={24} className="text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        )
      }

      export default DashboardStatCard