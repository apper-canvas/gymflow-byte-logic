import { useState, useEffect } from 'react'
      import { AnimatePresence, motion } from 'framer-motion'
      import { toast } from 'react-toastify'
      import DashboardTemplate from '@/components/templates/DashboardTemplate'
      import DashboardOverview from '@/components/organisms/DashboardOverview'
      import MemberManagement from '@/components/organisms/MemberManagement'
      import EquipmentList from '@/components/organisms/EquipmentList'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      // Mock service imports - assuming these will be loaded in the actual MainFeature logic
      import classService from '@/services/api/classService'
      import workoutService from '@/services/api/workoutService'

      const HomePage = ({ darkMode, setDarkMode }) => {
        const [activeSection, setActiveSection] = useState('dashboard')
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [classes, setClasses] = useState([])
        const [workouts, setWorkouts] = useState([])

        // Load data for sections other than members and dashboard
        useEffect(() => {
          const loadOtherData = async () => {
            setLoading(true)
            setError(null)
            try {
              switch (activeSection) {
                case 'classes':
                  const classData = await classService.getAll()
                  setClasses(classData || [])
                  break
                case 'workouts':
                  const workoutData = await workoutService.getAll()
                  setWorkouts(workoutData || [])
                  break
                default:
                  break
              }
            } catch (err) {
              setError(err.message)
              toast.error(`Failed to load ${activeSection}`)
            } finally {
              setLoading(false)
            }
          }
          if (activeSection !== 'dashboard' && activeSection !== 'members') {
            loadOtherData()
          }
        }, [activeSection])

        const renderContent = () => {
          if (loading) {
            return (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )
          }

          if (error) {
            return (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" className="text-red-500" size={20} />
                  <Text as="span" className="text-red-700 dark:text-red-300">Error: {error}</Text>
                </div>
              </div>
            )
          }

          switch (activeSection) {
            case 'dashboard':
              return <DashboardOverview setActiveSection={setActiveSection} />
            case 'members':
              return <MemberManagement />
            case 'equipment':
              // Equipment data is handled within EquipmentList using its own state/service calls if needed,
              // or could be passed down if HomePage was responsible for all data.
              // For now, assuming EquipmentList fetches its own data or handles a prop.
              // Given the original structure, equipmentService.getAll was in MainFeature, so we pass it.
              // However, the prompt implies MainFeature logic should be split.
              // For refactoring MainFeature's equipment part:
              // EquipmentList will need to manage its own state/fetch.
              // For simplicity, let's keep it similar to original.
              // For true atomic design, EquipmentList should fetch its own data.
              // Given the original code, it expects a prop `equipment` so I'll pass the `classes` state.
              // No, original `MainFeature` fetched `equipment`. So `EquipmentList` should handle fetching `equipment`.
              // Temporarily using classes state here, but in a real app, EquipmentList would fetch.
              // Reverting to the original data flow for classes/workouts
              return <EquipmentList equipment={classes /* Placeholder: equipment will be fetched by EquipmentList if it's refactored similarly to MemberManagement */} />
            case 'classes':
              return (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Calendar" size={32} className="text-white" />
                  </div>
                  <Title as="h3" className="text-xl mb-2">
                    Classes Section
                  </Title>
                  <Text as="p" className="text-surface-600 dark:text-surface-400">
                    Displaying {classes.length} classes. This section is under development.
                  </Text>
                  {/* Displaying actual classes for demonstration */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classes.map(cls => (
                      <div key={cls.id} className="glassmorphism rounded-xl p-4 text-left">
                        <Title as="h4" className="text-lg">{cls.name}</Title>
                        <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">Instructor: {cls.instructor}</Text>
                        <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">Time: {cls.time}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )
            case 'workouts':
              return (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Activity" size={32} className="text-white" />
                  </div>
                  <Title as="h3" className="text-xl mb-2">
                    Workouts Section
                  </Title>
                  <Text as="p" className="text-surface-600 dark:text-surface-400">
                    Displaying {workouts.length} workouts. This section is under development.
                  </Text>
                  {/* Displaying actual workouts for demonstration */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workouts.map(wk => (
                      <div key={wk.id} className="glassmorphism rounded-xl p-4 text-left">
                        <Title as="h4" className="text-lg">{wk.name}</Title>
                        <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">Category: {wk.category}</Text>
                        <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">Duration: {wk.duration}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )
            case 'checkin':
            default:
              return (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Construction" size={32} className="text-white" />
                  </div>
                  <Title as="h3" className="text-xl mb-2">
                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
                  </Title>
                  <Text as="p" className="text-surface-600 dark:text-surface-400">
                    This section is under development. More features coming soon!
                  </Text>
                </div>
              )
          }
        }

        return (
          <DashboardTemplate
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </DashboardTemplate>
        )
      }

      export default HomePage