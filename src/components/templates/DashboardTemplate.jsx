import Sidebar from '@/components/organisms/Sidebar'
      import Header from '@/components/organisms/Header'

      const DashboardTemplate = ({ children, activeSection, setActiveSection, darkMode, setDarkMode }) => {
        return (
          <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <div className="ml-64 min-h-screen">
              <Header activeSection={activeSection} />
              <main className="p-8">
                {children}
              </main>
            </div>
          </div>
        )
      }

      export default DashboardTemplate