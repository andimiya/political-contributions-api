import { APIGatewayEvent } from 'aws-lambda';
import { createRawLog } from '../services/RawLogService';

const index = async (): Promise<any> => {
  const response = {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({ message: 'Logs Index Endpoint' }),
  };

  return response;
};

const create = async (event: APIGatewayEvent): Promise<any> => {
  let response;
  try {
    await createRawLog(event);
    response = {
      statusCode: 201,
      headers: {},
      body: JSON.stringify({ message: 'Log Created' }),
    };
  } catch (e) {
    response = {
      statusCode: 500,
      headers: {},
      body: JSON.stringify({ error: e.message }),
    };
  }

  return response;
};


export {
  index,
  create,
};
