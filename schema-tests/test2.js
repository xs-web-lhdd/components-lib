/**
 * @description 自定义关键字
 * @author 凉风有信、
 */

const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

// ajv.addFormat('test', (data) => {
//   console.log(data, '--------------')
//   return data === 'data'
// })

ajv.addKeyword('test', {
  // validate: function (schema, data) {
  //   console.log(schema, data, '----------');
  //   if (schema === true) {
  //     return true
  //   } else {
  //     return schema.length === 6
  //   }
  // }
  // compile(schema, parentSchema) {
  //   console.log(schema, parentSchema);
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'boolean'
  // },
  macro: function (schema, parentSchema) {
    return {
      minLength: 10
    }
  }
})

const schema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      test: true
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
  name: 'liang',
  age: 19,
  pets: ['mimi', 'wawa'],
  isworker: true
}

const validate = ajv.compile(schema)

const valid = validate(data)
if (!valid) console.log(validate.errors)