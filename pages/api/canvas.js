export default async function handler(request, response) {
  const res = await fetch(
    `https://apsva.instructure.com/api/v1${request.query.url}${JSON.parse(request.headers.query).length != 0 ? "?" : ""}${new URLSearchParams(JSON.parse(request.headers.query)).toString()}`,
    {
      headers: {
        Authorization: request.headers.authorization,
      },
    }
  );
  
  const data = await res.json();
  return response.status(res.status).json({ data });
}
