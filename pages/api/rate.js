import axios from "axios";

export default async function handler(request, response) {
  const res = await fetch(
    `https://apsva.instructure.com/api/v1/courses/${request.query.course}/discussion_topics/${request.query.discussion}/entries/${request.query.item}/rating`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${request.headers.authorization}`,
      },
      body: `rating=${request.query.rate}&_method=POST`,
    }
  );
  console.log(
    `rating=${request.query.rate}&_method=POST&authenticity_token=${nanoid()}`
  );
  console.log(res);
  response.setHeader(
    "x-rate-limit-remaining",
    res.headers.get("x-rate-limit-remaining")
  );
  return response.status(res.status).send();
}
