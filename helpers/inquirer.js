import 'colors'
// inquirer permite dinamismo en la terminal, como usar las direccionales para elegir opciones
import inquirer from 'inquirer'

// inquiere.promt([])= recibe un array  de opketo
const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    // choices: ['opt1', 'opt2', 'opt3']
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`
      },
      {
        value: '7',
        name: `${'0.'.green} Salir`
      }
    ]
  }
]

const enter = [
  {
    type: 'input',
    name: 'entrada',
    message: `Por favor presione ${'ENTER'.green} para continuar`
  }
]

export const inquirerMenu = async () => {
  console.clear()
  console.log('==========================='.green)
  console.log('   Seleccione una opción'.yellow)
  console.log('===========================\n'.green)

  // retornamos el valor devuelvo por las preguntas de inquierer
  const { opcion } = await inquirer.prompt(preguntas)

  return opcion
}

export const pausa = async () => {
  await inquirer.prompt(enter)
}

export const leerInput = async message => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}

export const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((dato, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: dato.id,
      name: `${idx} ${dato.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`
  })

  const preguntas = [{ type: 'list', name: 'id', message: 'Borrar', choices }]

  const { id } = await inquirer.prompt(preguntas)
  // choices= [{}{}{}]
  return id
}

export const confirmar = async message => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)

  return ok
}

export const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((dato, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: dato.id,
      name: `${idx} ${dato.desc}`,
      checked: dato.completadoEn !== null ? true : false
    }
  })

  const pregunta = [
    { type: 'checkbox', name: 'ids', message: 'Selecciones', choices }
  ]

  const { ids } = await inquirer.prompt(pregunta)
  // choices= [{}{}{}]
  return ids
}
