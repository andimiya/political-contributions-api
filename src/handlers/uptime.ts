const up = (): any => ({
  statusCode: 200,
  headers: {},
  body: JSON.stringify({ status: 'ok' }),
});


// eslint-disable-next-line import/prefer-default-export
export { up };
