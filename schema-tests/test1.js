/**
 * @description ajv基本使用和自定义format
 */

const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

ajv.addFormat('test', (data) => {
  console.log(data, '--------------')
  return data === 'data'
})

const schema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      format: 'test'
      // minLength: 10
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    isworker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}

const data = {
  name: 'data',
  age: 19,
  pets: ['mimi', 'wawa'],
  isworker: true
}

const validate = ajv.compile(schema)

const valid = validate(data)
if (!valid) console.log(validate.errors)