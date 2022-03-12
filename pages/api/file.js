export default async function handler(request, response) {
  console.log(request.query.url);
  const res = await fetch(request.query.url);
  const data = await file.arrayBuffer();
  console.log(Buffer.from(data));
  response.setHeader("x-rate-limit-remaining", res.headers.get("x-rate-limit-remaining"))
  return response.status(res.status).send(Buffer.from(file_data));
}
