/**
 * @description 自定义关键字
 * @author 凉风有信、
 */

const Ajv = require("ajv")
const localize = require("ajv-i18n")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

// ajv.addFormat('test', (data) => {
//   console.log(data, '--------------')
//   return data === 'data'
// })

ajv.addKeyword('test', {
  validate: function fun(schema, data) {

    fun.errors = [{
      keyword: 'test',
      dataPath: '.name',
      schemaPath: '#/properties/name/test',
      params: {
        keyword: 'test'
      },
      message: '这是自定义的错误信息！'
    }]
    // console.log(schema, data, '----------');
    return false
  },
  // compile(schema, parentSchema) {
  //   console.log(schema, parentSchema);
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'boolean'
  // },
  // macro: function (schema, parentSchema) {
  //   return {
  //     minLength: 10
  //   }
  // }
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
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}