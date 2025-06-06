import equipmentData from '../mockData/equipment.json'

class EquipmentService {
  constructor() {
    this.equipment = [...equipmentData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.equipment]
  }

  async getById(id) {
    await this.delay()
    const item = this.equipment.find(e => e.id === id)
    return item ? {...item} : null
  }

  async create(equipmentData) {
    await this.delay()
    const newEquipment = {
      ...equipmentData,
      id: Date.now().toString(),
      lastMaintenance: equipmentData.lastMaintenance || new Date().toISOString(),
      status: equipmentData.status || 'Working'
    }
    this.equipment.push(newEquipment)
    return {...newEquipment}
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.equipment.findIndex(e => e.id === id)
    if (index !== -1) {
      this.equipment[index] = { ...this.equipment[index], ...updateData }
      return {...this.equipment[index]}
    }
    throw new Error('Equipment not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.equipment.findIndex(e => e.id === id)
    if (index !== -1) {
      const deleted = this.equipment.splice(index, 1)[0]
      return {...deleted}
    }
    throw new Error('Equipment not found')
  }
}

export default new EquipmentService()