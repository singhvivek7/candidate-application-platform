const headers = new Headers();

export const postRequest = async ({
  reqBody,
  url = 'https://api.weekday.technology/adhoc/getSampleJdJSON', // will replace with env variable
}: {
  reqBody: string;
  url?: string;
}) => {
  headers.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers,
    body: reqBody,
  };

  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};
