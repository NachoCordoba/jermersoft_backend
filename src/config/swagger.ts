export default {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Jemersoft API - Pokemon',
          version: '1.0.0',
          description:
                    'Backend Prueba Tecnica Jermersoft',
          license: {
            name: 'MIT',
            url: 'https://spdx.org/licenses/MIT.html',
          }
        },
        servers: [{
          url: `${process.env.LOCAL_URI}:${process.env.PORT}/`,
          
        }],
      },
      apis: ['./src/modules/*/*.routes.ts'],
}