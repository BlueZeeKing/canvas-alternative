export default async function handler(request, response) {
  console.log(new URLSearchParams(JSON.parse(request.headers.query)).toString());
  const res = await fetch(
    `https://apsva.instructure.com/api/v1${request.query.url}${JSON.parse(request.headers.query).length != 0 ? "?" : ""}${new URLSearchParams(JSON.parse(request.headers.query)).toString()}`,
    {
      headers: {
        Authorization: request.headers.authorization,
      },
    }
  );

  const data = await res.json();
  return response.status(200).json({ data });
}
