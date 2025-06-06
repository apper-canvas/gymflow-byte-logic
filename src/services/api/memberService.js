import membersData from '../mockData/members.json'

class MemberService {
  constructor() {
    this.members = [...membersData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.members]
  }

  async getById(id) {
    await this.delay()
    const member = this.members.find(m => m.id === id)
    return member ? {...member} : null
  }

  async create(memberData) {
    await this.delay()
    const newMember = {
      ...memberData,
      id: Date.now().toString(),
      joinDate: memberData.joinDate || new Date().toISOString(),
      status: memberData.status || 'Active'
    }
    this.members.push(newMember)
    return {...newMember}
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.members.findIndex(m => m.id === id)
    if (index !== -1) {
      this.members[index] = { ...this.members[index], ...updateData }
      return {...this.members[index]}
    }
    throw new Error('Member not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.members.findIndex(m => m.id === id)
    if (index !== -1) {
      const deleted = this.members.splice(index, 1)[0]
      return {...deleted}
    }
    throw new Error('Member not found')
  }
}

export default new MemberService()