import classesData from '../mockData/classes.json'

class ClassService {
  constructor() {
    this.classes = [...classesData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.classes]
  }

  async getById(id) {
    await this.delay()
    const classItem = this.classes.find(c => c.id === id)
    return classItem ? {...classItem} : null
  }

  async create(classData) {
    await this.delay()
    const newClass = {
      ...classData,
      id: Date.now().toString(),
      enrolled: classData.enrolled || 0
    }
    this.classes.push(newClass)
    return {...newClass}
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.classes.findIndex(c => c.id === id)
    if (index !== -1) {
      this.classes[index] = { ...this.classes[index], ...updateData }
      return {...this.classes[index]}
    }
    throw new Error('Class not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.classes.findIndex(c => c.id === id)
    if (index !== -1) {
      const deleted = this.classes.splice(index, 1)[0]
      return {...deleted}
    }
    throw new Error('Class not found')
  }
}

export default new ClassService()