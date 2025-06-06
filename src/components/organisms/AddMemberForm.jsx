import React from 'react'
import Input from '../atoms/Input'
import Modal from '../molecules/Modal'
      const AddMemberForm = ({ isOpen, onClose, newMember, setNewMember, onAddMember }) => {
        return (
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Member"
            onSubmit={onAddMember}
            submitText="Add Member"
          >
            <Input
              type="text"
              placeholder="Full Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
            />
            {/* Using a direct select for now, could be a Select atom */}
            <select
              value={newMember.membershipType}
              onChange={(e) => setNewMember({ ...newMember, membershipType: e.target.value })}
              className="w-full px-4 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
            <Input
              type="text"
              placeholder="Emergency Contact"
              value={newMember.emergencyContact}
              onChange={(e) => setNewMember({ ...newMember, emergencyContact: e.target.value })}
            />
          </Modal>
        )
      }

      export default AddMemberForm