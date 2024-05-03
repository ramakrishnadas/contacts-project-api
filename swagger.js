const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'This API contains contact information'
  },
  host: 'contacts-project-api.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/contacts.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);