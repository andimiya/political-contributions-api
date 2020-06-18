import { APIGatewayProxyResult } from "aws-lambda";

// eslint-disable-next-line import/prefer-default-export
export async function up(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({
      status: "ok",
    }),
  };
}
