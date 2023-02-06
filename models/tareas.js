import Tarea from './tarea.js'
import color from 'colors'

class Tareas {
  constructor() {
    this._listado = {}
  }

  // crea la tabla con las variables dadas por el archivo tarea
  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  // coge el array que viene el archivo json y lo mete en el array de _listado
  cargarTareas(tareas = []) {
    tareas.forEach(e => {
      this._listado[e.id] = e
    })
  }

  //   convierte el objeto en un array para recorrerlo
  get listadoArr() {
    const listado = []
    // convertir el objeto en un array
    Object.keys(this._listado).forEach(e => listado.push(this._listado[e]))
    return listado
  }

  //   convierte el array en la lista entendible
  arrayToList(arrayTL = []) {
    arrayTL.forEach((dato, indice) => {
      const orden = `${indice + 1}.`.green
      const { desc, completadoEn } = dato

      const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red

      console.log(`${orden} ${desc} :: ${estado}`)
    })
  }
  //   transformar el array de tareas en una lista simplem entendible para la opcion 2
  listadoCompleto() {
    this.arrayToList(this.listadoArr)
  }

  //   lista solo las tareas completadas
  listarPendientesCompletadas() {
    const newArray = []
    this.listadoArr.forEach(e => {
      if (e.completadoEn !== null) newArray.push(e)
    })

    newArray.forEach((dato, indice) => {
      const orden = `${indice + 1}.`.green
      const { desc, completadoEn } = dato

      console.log(`${orden} ${desc} :: ${color.green(completadoEn)}`)
    })
  }

  //   tareas incompletas
  listarPendientesIncompletas() {
    const newArray = []
    this.listadoArr.forEach(e => {
      if (e.completadoEn === null) newArray.push(e)
    })

    this.arrayToList(newArray)
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

export default Tareas
