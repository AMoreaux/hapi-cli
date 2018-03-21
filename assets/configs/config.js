module.exports = (type) => {
  return {
    'server': {
      'auth': {
        'saltFactor': 10
      },
      'connection': {
        'port': (type === 'production') ? 80 : 3001,
        'routes': {
          'cors': {
            'origin': ['*'],
            'headers': [
              'Access-Control-Allow-Origin',
              'Access-Control-Allow-Headers',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Authorization'
            ],
            'credentials': true
          }
        }
      }
    }
  }
}
