import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import memberService from '../services/api/memberService'
import equipmentService from '../services/api/equipmentService'
import classService from '../services/api/classService'
import workoutService from '../services/api/workoutService'

const MainFeature = ({ activeSection }) => {
  const [members, setMembers] = useState([])
  const [equipment, setEquipment] = useState([])
  const [classes, setClasses] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [newMember, setNewMember] = useState({
    name: '', email: '', phone: '', membershipType: 'Basic', emergencyContact: ''
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Load data based on active section
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        switch (activeSection) {
          case 'members':
            const memberData = await memberService.getAll()
            setMembers(memberData || [])
            break
          case 'equipment':
            const equipmentData = await equipmentService.getAll()
            setEquipment(equipmentData || [])
            break
          case 'classes':
            const classData = await classService.getAll()
            setClasses(classData || [])
            break
          case 'workouts':
            const workoutData = await workoutService.getAll()
            setWorkouts(workoutData || [])
            break
        }
      } catch (err) {
        setError(err.message)
        toast.error(`Failed to load ${activeSection}`)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [activeSection])

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.email) {
      toast.error('Name and email are required')
      return
    }
    
    try {
      const memberData = {
        ...newMember,
        joinDate: new Date().toISOString(),
        status: 'Active'
      }
      const created = await memberService.create(memberData)
      setMembers([...members, created])
      setNewMember({ name: '', email: '', phone: '', membershipType: 'Basic', emergencyContact: '' })
      setShowAddModal(false)
      toast.success('Member added successfully')
    } catch (err) {
      toast.error('Failed to add member')
    }
  }

  const handleDeleteMember = async (id) => {
    try {
      await memberService.delete(id)
      setMembers(members.filter(m => m.id !== id))
      toast.success('Member deleted successfully')
    } catch (err) {
      toast.error('Failed to delete member')
    }
  }

  const filteredMembers = members.filter(member =>
    member?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <ApperIcon name="AlertCircle" className="text-red-500" size={20} />
          <span className="text-red-700 dark:text-red-300">Error: {error}</span>
        </div>
      </div>
    )
  }

  // Dashboard View
  if (activeSection === 'dashboard') {
    return (
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { title: 'Total Members', value: '1,234', icon: 'Users', color: 'from-blue-500 to-blue-600', change: '+12%' },
            { title: 'Active Classes', value: '8', icon: 'Calendar', color: 'from-green-500 to-green-600', change: '+2' },
            { title: 'Equipment Status', value: '94%', icon: 'Dumbbell', color: 'from-orange-500 to-orange-600', change: '+3%' },
            { title: 'Today Check-ins', value: '156', icon: 'UserCheck', color: 'from-purple-500 to-purple-600', change: '+24' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-600 dark:text-surface-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-heading font-bold text-surface-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-accent text-sm font-medium mt-1">{stat.change} from yesterday</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="glassmorphism rounded-2xl p-6">
          <h3 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Member', icon: 'UserPlus', action: () => setActiveSection('members') },
              { label: 'Schedule Class', icon: 'CalendarPlus', action: () => setActiveSection('classes') },
              { label: 'Equipment Check', icon: 'Wrench', action: () => setActiveSection('equipment') },
              { label: 'Create Workout', icon: 'Plus', action: () => setActiveSection('workouts') }
            ].map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex flex-col items-center space-y-2 p-4 bg-surface-100 dark:bg-surface-700 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              >
                <ApperIcon name={action.icon} size={24} className="text-primary" />
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Members Management
  if (activeSection === 'members') {
    return (
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <ApperIcon name="UserPlus" size={20} />
            <span>Add Member</span>
          </button>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glassmorphism rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{member?.name?.charAt(0) || 'M'}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">{member?.name || 'Unknown'}</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400">{member?.membershipType || 'Basic'}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  member?.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {member?.status || 'Unknown'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Mail" size={16} className="text-surface-400" />
                  <span className="text-surface-600 dark:text-surface-400">{member?.email || 'No email'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Phone" size={16} className="text-surface-400" />
                  <span className="text-surface-600 dark:text-surface-400">{member?.phone || 'No phone'}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setSelectedMember(member)}
                  className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="Eye" size={16} />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Member Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-heading font-semibold text-surface-900 dark:text-white mb-4">Add New Member</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={newMember.membershipType}
                  onChange={(e) => setNewMember({...newMember, membershipType: e.target.value})}
                  className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
                <input
                  type="text"
                  placeholder="Emergency Contact"
                  value={newMember.emergencyContact}
                  onChange={(e) => setNewMember({...newMember, emergencyContact: e.target.value})}
                  className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Add Member
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  }

  // Equipment Management
  if (activeSection === 'equipment') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 dark:text-white">{item?.name || 'Unknown Equipment'}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item?.status === 'Working' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : item?.status === 'Maintenance'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {item?.status || 'Unknown'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="text-surface-600 dark:text-surface-400">Type: {item?.type || 'Unknown'}</p>
                <p className="text-surface-600 dark:text-surface-400">Location: {item?.location || 'Unknown'}</p>
                <p className="text-surface-600 dark:text-surface-400">
                  Last Maintenance: {item?.lastMaintenance ? new Date(item.lastMaintenance).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Default fallback for other sections
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="Construction" size={32} className="text-white" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-surface-900 dark:text-white mb-2">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
      </h3>
      <p className="text-surface-600 dark:text-surface-400">
        This section is under development. More features coming soon!
      </p>
    </div>
  )
}

export default MainFeature