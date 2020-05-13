import Raven from 'raven';
import RavenLambdaWrapper from 'serverless-sentry-lib';


exports.index = RavenLambdaWrapper.handler(Raven, async (event) => {
  console.log(event); // Contains incoming request data (e.g., query params, headers and more)

  const response = {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({ message: 'Logs Index Endpoint' }),
  };

  return response;
});

exports.create = RavenLambdaWrapper.handler(Raven, async (event) => {
  console.log(event); // Contains incoming request data (e.g., query params, headers and more)

  const response = {
    statusCode: 201,
    headers: {},
    body: JSON.stringify({ message: 'Logs Created Endpoint', body: event.body }),
  };

  return response;
});
