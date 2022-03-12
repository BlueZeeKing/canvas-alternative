export default async function handler(request, response) {
  const res = await fetch(request.query.url);
  const data = await res.arrayBuffer();
  response.setHeader("x-rate-limit-remaining", res.headers.get("x-rate-limit-remaining"))
  return response.status(res.status).send(Buffer.from(data));
}
