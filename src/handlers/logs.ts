import { APIGatewayEvent } from 'aws-lambda';
import RawLogService from '../services/RawLogService';


const create = async (event: APIGatewayEvent): Promise<any> => {
  let response;

  try {
    if (!event.body) { throw new Error('Must provide body params'); }

    const logs = JSON.parse(event.body).audit_log;
    const rawLogService = new RawLogService(logs, event.path);
    const responseBody = await rawLogService.createRawLog();
    response = {
      statusCode: 201,
      headers: {},
      body: JSON.stringify(responseBody),
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
  create,
};
