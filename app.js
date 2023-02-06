import 'colors'
import { guardarDB, leerDB } from './helpers/guardarArchivo.js'
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} from './helpers/inquirer.js'
import Tareas from './models/tareas.js'
// import {mostrarMenu,pausa} from './helpers/mensajes.js'

const main = async () => {
  // almacenamos el opt(string) devulto de la promesa para compararlo con el while
  let opt = ''
  const tareas = new Tareas()

  const tareasDB = leerDB()

  // coger los datos de tareasDB y meterlos en el objeto tareas
  tareas.cargarTareas(tareasDB)

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ')
        tareas.crearTarea(desc)
        break

      case '2':
        tareas.listadoCompleto()
        break

      case '3':
        tareas.listarPendientesCompletadas()
        break

      case '4':
        tareas.listarPendientesIncompletas()
        break

      case '5': //completar tareas
        const ids = await mostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        break

      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr)
        if (id !== '0') {
          const ok = await confirmar('¿Estas Seguro?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('Tarea Borrada Correctamente')
          }
        }
        // preguntar si esta seguro de borrarlo

        break
    }

    // transformar la informacion de tareas en un JSON
    guardarDB(tareas.listadoArr)
    if (opt !== '0') await pausa()
  } while (opt !== '0')
}

main()
