module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@routers': './src/routers',
        '@database': './src/database',
        '@schema': './src/schema',
        '@midllewares': './src/midllewares',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}