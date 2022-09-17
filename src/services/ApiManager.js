export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';

const MAIN_URL = 'https://api.jikan.moe/v4';

const fetchServices = async ({endpoint, method, requestObject = null}) => {
  try {
    const response = await fetch(MAIN_URL + endpoint, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestObject,
    }).then(res => res.json());
    return response;
  } catch (err) {
    return err?.message;
  }
};

export default {fetchServices};
