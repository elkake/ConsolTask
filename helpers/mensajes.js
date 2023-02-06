import 'colors'
import readline from 'readline'
// -----------------------------
export const mostrarMenu = () => {
  return new Promise((res, rej) => {
    console.clear()
    console.log('==========================='.green)
    console.log('   Seleccione una opción'.yellow)
    console.log('===========================\n'.green)

    console.log(`${'1.'.green} Crear tarea`)
    console.log(`${'2.'.green} Listar tareas`)
    console.log(`${'3.'.green} Listar tareas completadas`)
    console.log(`${'4.'.green} Listar tareas pendientes`)
    console.log(`${'5.'.green} Completar tarea(s)`)
    console.log(`${'6.'.green} Borrar tarea`)
    console.log(`${'0.'.green} Salir \n`)

    // almacenar el valor entregado por la terminal a traves de process stdin y stdout
    let readlineD=readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    // preguntamos que queremos y devolvemos el dato entregado como resolve
    readlineD.question('Seleccione una opción: ', opt => {
      readlineD.close()
      res(opt)
    })
  })
}

// -------------------------------------------
// no devuelve nada, solo espera que demos enter para pausa
export const pausa = () => {
  return new Promise(res => {
    // almacenar el valor entregado por la terminal a traves de process stdin y stdout
    let readlineD=readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
   readlineD.question(`\nPresione ${'ENTER'.green} para pausa\n`, opt => {
      readlineD.close()
      res()
    })
  })
}


