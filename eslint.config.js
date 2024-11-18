import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,

  overrides: {
    stylistic: {
      'ts/array-type': 'warn',
      'style/arrow-parens': 'error',
      // 'ts/explicit-function-return-type': 'error',
    },
  },
})
