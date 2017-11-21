module.exports = (type) => {
  return {
    'server': {
      'auth': {
        'saltFactor': 10
      },
      'connection': {
        'port': (type === 'production') ? 80 : 3001,
        'routes': {
          'cors': true
        }
      }
    }
  }
}