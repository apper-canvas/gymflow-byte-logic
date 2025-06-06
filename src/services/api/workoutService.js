import workoutsData from '../mockData/workouts.json'

class WorkoutService {
  constructor() {
    this.workouts = [...workoutsData]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.workouts]
  }

  async getById(id) {
    await this.delay()
    const workout = this.workouts.find(w => w.id === id)
    return workout ? {...workout} : null
  }

  async create(workoutData) {
    await this.delay()
    const newWorkout = {
      ...workoutData,
      id: Date.now().toString(),
      exercises: workoutData.exercises || []
    }
    this.workouts.push(newWorkout)
    return {...newWorkout}
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.workouts.findIndex(w => w.id === id)
    if (index !== -1) {
      this.workouts[index] = { ...this.workouts[index], ...updateData }
      return {...this.workouts[index]}
    }
    throw new Error('Workout not found')
  }

  async delete(id) {
    await this.delay()
    const index = this.workouts.findIndex(w => w.id === id)
    if (index !== -1) {
      const deleted = this.workouts.splice(index, 1)[0]
      return {...deleted}
    }
    throw new Error('Workout not found')
  }
}

export default new WorkoutService()