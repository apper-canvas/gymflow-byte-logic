import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = ({ darkMode, setDarkMode }) => {
  const [activeSection, setActiveSection] = useState('dashboard')

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'members', label: 'Members', icon: 'Users' },
    { id: 'equipment', label: 'Equipment', icon: 'Dumbbell' },
    { id: 'classes', label: 'Classes', icon: 'Calendar' },
    { id: 'workouts', label: 'Workouts', icon: 'Activity' },
    { id: 'checkin', label: 'Check-in', icon: 'UserCheck' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-0 h-full w-64 bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-r border-surface-200 dark:border-surface-700 z-30"
      >
        {/* Logo */}
        <div className="p-6 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <ApperIcon name="Dumbbell" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-surface-900 dark:text-white">GymFlow</h1>
              <p className="text-sm text-surface-600 dark:text-surface-400">Gym Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg'
                  : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
          >
            <ApperIcon name={darkMode ? 'Sun' : 'Moon'} size={20} className="text-surface-700 dark:text-surface-300" />
            <span className="font-medium text-surface-700 dark:text-surface-300">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 px-8 py-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white capitalize">
                {activeSection}
              </h2>
              <p className="text-surface-600 dark:text-surface-400 mt-1">
                Manage your gym operations efficiently
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-accent">Live</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="User" size={20} className="text-white" />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MainFeature activeSection={activeSection} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Home