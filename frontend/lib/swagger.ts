import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Skolara API',
      version: '1.0.0',
      description: 'REST API documentation for Skolara school management platform'
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      { name: 'Auth', description: 'Authentication' },
      { name: 'Students', description: 'Student management' },
      { name: 'Teachers', description: 'Teacher management' },
      { name: 'Classes', description: 'Class management' },
      { name: 'Subjects', description: 'Subject management' },
      { name: 'Grades', description: 'Grade entry' },
      { name: 'Absences', description: 'Absence management' },
      { name: 'Timetables', description: 'Timetable management' },
      { name: 'ReportCards', description: 'Report card generation' },
      { name: 'News', description: 'News & Blog' },
      { name: 'Contact', description: 'Contact messages' },
      { name: 'Calendar', description: 'School calendar' },
      { name: 'Settings', description: 'Site settings' },
      { name: 'PreRegistrations', description: 'Pre-registration management' },
    ]
  },
  // Path to the API docs (all files containing JSDoc annotations)
  // We scan the backend directory from the frontend
  apis: ['../backend/src/modules/**/*.routes.ts', '../backend/src/modules/**/*.controller.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
