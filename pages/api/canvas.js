export default async function handler(request, response) {
  const res = await fetch(
    `https://apsva.instructure.com/api/v1${request.headers.url}`,
    {
      headers: {
        Authorization: request.headers.authorization,
      },
    }
  );

  const data = await res.json();
  return response.status(200).json({ data });
}
