import ApiManager, {METHOD_GET} from './ApiManager';

export async function getAnimeList({endpoint}) {
  return await ApiManager.fetchServices({
    endpoint: endpoint,
    method: METHOD_GET,
  });
}

export async function getAnimeDetails({id}) {
  const endpoint = `/anime/${id}/full`;
  return await ApiManager.fetchServices({
    endpoint: endpoint,
    method: METHOD_GET,
  });
}
