import DashboardStatCard from '@/components/molecules/DashboardStatCard'
      import FeatureActionCard from '@/components/molecules/FeatureActionCard'
      import Title from '@/components/atoms/Title'
      import Card from '@/components/molecules/Card'

      const DashboardOverview = ({ setActiveSection }) => {
        const stats = [
          { title: 'Total Members', value: '1,234', icon: 'Users', color: 'from-blue-500 to-blue-600', change: '+12%' },
          { title: 'Active Classes', value: '8', icon: 'Calendar', color: 'from-green-500 to-green-600', change: '+2' },
          { title: 'Equipment Status', value: '94%', icon: 'Dumbbell', color: 'from-orange-500 to-orange-600', change: '+3%' },
          { title: 'Today Check-ins', value: '156', icon: 'UserCheck', color: 'from-purple-500 to-purple-600', change: '+24' }
        ]

        const quickActions = [
          { label: 'Add Member', icon: 'UserPlus', action: () => setActiveSection('members') },
          { label: 'Schedule Class', icon: 'CalendarPlus', action: () => setActiveSection('classes') },
          { label: 'Equipment Check', icon: 'Wrench', action: () => setActiveSection('equipment') },
          { label: 'Create Workout', icon: 'Plus', action: () => setActiveSection('workouts') }
        ]

        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <DashboardStatCard key={index} {...stat} delay={index * 0.1} />
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <Title as="h3" className="text-lg mb-4">Quick Actions</Title>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <FeatureActionCard key={index} {...action} />
                ))}
              </div>
            </Card>
          </div>
        )
      }

      export default DashboardOverview