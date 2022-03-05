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
  console.log(data)
  return response.status(200).json({ data });
}
