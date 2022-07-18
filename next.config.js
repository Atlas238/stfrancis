module.exports = {
  serverRuntimeConfig: {
    secret: 'SDFKKJEJC1023fjKDSljf30jsdlf34kKDhf3jFXk8sd6fJSl'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'http://localhost:3000/api'
  },
  typescript: {
    ignoreBuildErrors: true
  }
}
