# component-lib

### lib:

vue3+TS+Jest 进一步学习 vue3 里面包含 vue3 的一些源码讲解

#### prettierrc：

1、安装：
在 vsCode 插件中安装 Prettier-Code formatter
2、在项目中创建 .prettierrc 文件：
在该文件中配置规则

```bash
{
  "semi": false, // 是否要写分号
  "singleQuote": true, // 是否用单引号
  "trailingComma": "all" //在后面加上逗号
}
```

##### vue3 源码中 apiDefineComponent.ts, defineComponent 的实现：

```ts
// 一些通用的 Props 类型的定义：
export type PublicProps = VNodeProps &
  AllowedComponentProps &
  ComponentCustomProps

// defineComponent 返回的类型都在这：
export type DefineComponent<
  // 定义 Props
  PropsOrPropOptions = {},
  // setup 函数返回的类型可以在这里进行定义
  RawBindings = {},
  // data 的类型：
  D = {},
  // computed 的类型：
  C extends ComputedOptions = ComputedOptions,
  // methods 中各种函数的定义:
  M extends MethodOptions = MethodOptions,
  // 通过 minxi 写的:
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  // 通过 emit 来写的,对 emit 的事件进行定义:
  E extends EmitsOptions = {},
  EE extends string = string,
  PP = PublicProps,
  Props = Readonly<
    PropsOrPropOptions extends ComponentPropsOptions
      ? ExtractPropTypes<PropsOrPropOptions>
      : PropsOrPropOptions
  > &
    ({} extends E ? {} : EmitsToProps<E>),
  Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>,
> = ComponentPublicInstanceConstructor<
  CreateComponentPublicInstance<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    PP & Props,
    Defaults,
    true
  > &
    Props
> &
  ComponentOptionsBase<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    Defaults
  > &
  PP
```

手动声明组件的类型通过 DefineComponent:

```ts
type MyComponentDefine = DefineComponent<
  { a: string },
  { name: string },
  {},
  { count: () => number }
>
```

上面写法就是定义了 props 里面 a 的类型是 string ,setup 中返回的 name 类型是 string, 若没有 data,直接一个空对象即可, 然后 computed 中 count 的类型是一个函数,返回类型是 number

vue3 中 defineComponents 接收四种重载:

```ts
// 第一种重载: 接收 setup 的重载,这种还需要声明 props 的类型
export function defineComponent<Props, RawBindings = object>(
  setup: (
    props: Readonly<Props>,
    ctx: SetupContext,
  ) => RawBindings | RenderFunction,
): DefineComponent<Props, RawBindings>

// 第二种重载：通过对象来声明 props 但是不传 props
// overload 2: object format with no props
// (uses user defined props interface)
// return type is for Vetur and TSX support
export function defineComponent<
  Props = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
>(
  options: ComponentOptionsWithoutProps<
    Props,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE
  >,
): DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE>

// 第三种重载：通过 Array 接收 props --- 这种类型的 props 都是any类型，不推荐
// overload 3: object format with array props declaration
// props inferred as { [key in PropNames]?: any }
// return type is for Vetur and TSX support
export function defineComponent<
  PropNames extends string,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
  options: ComponentOptionsWithArrayProps<
    PropNames,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE
  >,
): DefineComponent<
  Readonly<{ [key in PropNames]?: any }>,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE
>
  // 如果用 TS 写 Vue3 前面三种可以忽略
  // 第四种重载：需要通过数组声明 props，例：
{
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
// overload 4: object format with object props declaration
// see `ExtractPropTypes` in ./componentProps.ts
export function defineComponent<
  // the Readonly constraint allows TS to treat the type of { required: true }
  // as constant instead of boolean.
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
  options: ComponentOptionsWithObjectProps<
    PropsOptions,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE
  >,
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>

// 真正 defineComponent 的实现：
// 判断传入的是否是一个函数，如果是一个函数就返回一个包装过的对象（里面有setup和name），如果是一个对象那么就直接返回一个对象
// implementation, close to no-op
export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options, name: options.name } : options
}
```

##### vue3+TS 对 props 的一些细节：

在 vue3+TS 定义 props 中的类型：

```ts
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Config {
  name: string
}
export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: Number as PropType<number>,
    },
    config: {
      // TS的类型定义：
      type: Object as PropType<Config>,
      // 不用TS的类型定义：
      // type: Object
      required: true,
    },
  },
  setup() {
    const a = 1
    return { a }
  },
  mounted() {
    this.name
    // 类型是 Config 得益于required: true,因为required: true,所以TS判断出类型就只能是Config而不是Config | undefined，这样 . 编译器会直接给提示（可以很安全的调用），否则 . 会有红线
    this.config
  },
})
</script>
```

##### 提取 props 的定义：

```ts
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Config {
  name: string
}
const PropType = {
  name: {
    type: Number as PropType<number>,
  },
  config: {
    type: Object as PropType<Config>,
    required: true,
  },
}
export default defineComponent({
  name: 'App',
  props: PropType,
  setup() {
    const a = 1
    return { a }
  },
  // 将 props 的定义提出之后config就类型就不再是 Config 而是 Config | undefined
  mounted() {
    this.name
    this.config
  },
})
```

解决方案：在提取出来的 props 定义后面加上 as const

```ts
const PropType = {
  name: {
    type: Number as PropType<number>,
  },
  config: {
    type: Object as PropType<Config>,
    required: true,
  },
} as const
```

这时 config 的类型就是 Config
原因是 props 是 readonly 的类型，但 props 定义一旦提取出来之后 TS 就无法识别是 readonly 的类型，所以 TS 进行判断时就会有 undefined，当在后面加上 as const 后就说明它是只读的类型，因此 TS 就可去掉 undefined 这种类型推测，其实这点在 vue3 源码中 apiDefineComponent.ts 也有提到，第 162 163 行

##### h 函数：

h 函数跟 React 中的 createElement 很类似，都是创建虚拟 DOM，要理清楚的是我们在 vue 的 SFC 中的 template 写的不是真正的 HTML 而是 h 函数，h 函数其实是对调用 createVNode 做了一个判断，根据不同的参数调用不同的 createVNode，下面是源码：

```ts
// Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  const l = arguments.length
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}
```

##### 使用 JSX 开发组件：

安装：

```bash
yarn add @vue/babel-plugin-jsx -D
```

在 babel 中进行配置：

```babel
plugins: ['@vue/babel-plugin-jsx']
```

官方介绍：
https://github.com/vuejs/jsx-next

##### 安装 monaco-editor：

```bash
yarn add monaco-editor -D
```

在 js 中写 css:
安装：

```bash
yarn add vue-jss -S
```
