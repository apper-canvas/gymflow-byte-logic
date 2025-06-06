import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import memberService from '../../services/api/memberService'
import SearchInput from '../molecules/SearchInput'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import MemberCard from '../molecules/MemberCard'
import AddMemberForm from './AddMemberForm'
import Title from '../atoms/Title'
import Text from '../atoms/Text'
import Modal from '../molecules/Modal'

      const MemberManagement = () => {
        const [members, setMembers] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [selectedMember, setSelectedMember] = useState(null)
        const [newMember, setNewMember] = useState({
          name: '', email: '', phone: '', membershipType: 'Basic', emergencyContact: ''
        })
        const [showAddModal, setShowAddModal] = useState(false)
        const [searchTerm, setSearchTerm] = useState('')

        useEffect(() => {
          const loadMembers = async () => {
            setLoading(true)
            setError(null)
            try {
              const memberData = await memberService.getAll()
              setMembers(memberData || [])
            } catch (err) {
              setError(err.message)
              toast.error('Failed to load members')
            } finally {
              setLoading(false)
            }
          }
          loadMembers()
        }, [])

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
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-800 rounded-xl p-6">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" className="text-red-500" size={20} />
                <Text as="span" className="text-red-700 dark:text-red-300">Error: {error}</Text>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search members..."
              />
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg"
                icon={<Icon name="UserPlus" size={20} />}
              >
                Add Member
              </Button>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onDelete={handleDeleteMember}
                  onSelect={setSelectedMember}
                />
              ))}
            </div>

            {/* Add Member Modal */}
            <AddMemberForm
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              newMember={newMember}
              setNewMember={setNewMember}
              onAddMember={handleAddMember}
            />

            {/* View Member Modal (can be expanded) */}
            {selectedMember && (
              <Modal
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
                title={selectedMember.name}
                showSubmit={false}
              >
                <div className="space-y-2 text-sm text-surface-700 dark:text-surface-300">
                  <p>Email: {selectedMember.email}</p>
                  <p>Phone: {selectedMember.phone}</p>
                  <p>Membership: {selectedMember.membershipType}</p>
                  <p>Status: {selectedMember.status}</p>
                  <p>Joined: {new Date(selectedMember.joinDate).toLocaleDateString()}</p>
                  <p>Emergency Contact: {selectedMember.emergencyContact}</p>
                </div>
              </Modal>
            )}
          </div>
        )
      }

      export default MemberManagement