import axios from "axios";

export default async function handler(request, response) {

  const res = await axios.post(
    `https://apsva.instructure.com/api/v1/courses/${request.query.course}/discussion_topics/${request.query.discussion}/entries/${request.query.item}/rating`,
    {
      rating: parseInt(request.query.rate),
    },
    {
      headers: { Authorization: `Bearer ${request.headers.authorization}` },
    }
  );

  return response.status(res.status).send();
}
