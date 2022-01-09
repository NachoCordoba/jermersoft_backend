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
          url: `http://localhost:3000/`,
          
        }],
      },
      apis: ['./src/modules/*/*.routes.ts'],
}