export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';

const MAIN_URL = 'https://api.jikan.moe/v4/';

const services = async ({endpoint, method, requestObject}) => {
  try {
    const response = await fetch(MAIN_URL + endpoint, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: requestObject,
    });
    return response?.json();
  } catch (err) {
    return err;
  }
};

export default {services};
