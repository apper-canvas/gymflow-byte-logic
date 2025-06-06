import { motion } from 'framer-motion'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Card from '@/components/molecules/Card'

      const EquipmentList = ({ equipment }) => {
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {equipment.map((item, index) => {
                const statusClass = item?.status === 'Working'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : item?.status === 'Maintenance'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'

                return (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between mb-4">
                        <Title as="h3" className="font-semibold">{item?.name || 'Unknown Equipment'}</Title>
                        <Text as="span" className={`px-2 py-1 text-xs rounded-full ${statusClass}`}>
                          {item?.status || 'Unknown'}
                        </Text>
                      </div>

                      <div className="space-y-2 text-sm">
                        <Text as="p" className="text-surface-600 dark:text-surface-400">Type: {item?.type || 'Unknown'}</Text>
                        <Text as="p" className="text-surface-600 dark:text-surface-400">Location: {item?.location || 'Unknown'}</Text>
                        <Text as="p" className="text-surface-600 dark:text-surface-400">
                          Last Maintenance: {item?.lastMaintenance ? new Date(item.lastMaintenance).toLocaleDateString() : 'Never'}
                        </Text>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      }

      export default EquipmentList