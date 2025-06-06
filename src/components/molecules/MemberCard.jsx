import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Card from '@/components/molecules/Card'

      const MemberCard = ({ member, onDelete, onSelect }) => {
        const statusClass = member?.status === 'Active'
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <Text as="span" className="text-white font-semibold">
                      {member?.name?.charAt(0) || 'M'}
                    </Text>
                  </div>
                  <div>
                    <Title as="h3" className="font-semibold text-surface-900 dark:text-white">
                      {member?.name || 'Unknown'}
                    </Title>
                    <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">
                      {member?.membershipType || 'Basic'}
                    </Text>
                  </div>
                </div>
                <Text as="span" className={`px-2 py-1 text-xs rounded-full ${statusClass}`}>
                  {member?.status || 'Unknown'}
                </Text>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-surface-400" />
                  <Text as="span" className="text-surface-600 dark:text-surface-400">
                    {member?.email || 'No email'}
                  </Text>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-surface-400" />
                  <Text as="span" className="text-surface-600 dark:text-surface-400">
                    {member?.phone || 'No phone'}
                  </Text>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  onClick={() => onSelect(member)}
                  className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg"
                  icon={<Icon name="Eye" size={16} />}
                >
                  {null}
                </Button>
                <Button
                  onClick={() => onDelete(member.id)}
                  className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                  icon={<Icon name="Trash2" size={16} />}
                >
                  {null}
                </Button>
              </div>
            </Card>
          </motion.div>
        )
      }

      export default MemberCard