export const postRequest = async ({
  reqBody,
  url = 'https://api.weekday.technology/adhoc/getSampleJdJSON',
}: {
  reqBody: string;
  url?: string;
}) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: reqBody,
  };

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
