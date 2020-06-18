import { APIGatewayEvent } from "aws-lambda";
import dbConnect from "../lib/dbConnect";
import CAContributionsService from "../services/CAContributionsService";
import Response from "../interfaces/Response";
import { errorResponse, invalidResponse } from "../lib/HTTPResponse";

let db; // Memoize db - lambda can reuse this connection

const query = async (event: APIGatewayEvent): Promise<Response> => {
  try {
    db = db || (await dbConnect());
    return db;
  } catch (e) {
    return errorResponse(e.message);
  }
};

export { query };
