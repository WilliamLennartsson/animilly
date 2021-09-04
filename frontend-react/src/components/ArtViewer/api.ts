import { ArtObject, SearchResponse } from './ObjectModel';

const getArt = (url: string) => {
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(result => {
      return result
    })
}

export const createAPI = () => {

  const BASE_URL = 'https://collectionapi.metmuseum.org/'
  const OBJECTS_PATH = 'public/collection/v1/objects/'
  const URL_OBJECTS = `${BASE_URL}${OBJECTS_PATH}`
  const SEARCH_PATH = 'public/collection/vi/search?'

  const QUERY_HAS_IMAGE = 'hasImages=true&q=Auguste Renoir'
  const augustSearch = 'https://collectionapi.metmuseum.org/public/collection/v1/search?' + QUERY_HAS_IMAGE

  const URL_IMAGES = BASE_URL + SEARCH_PATH + QUERY_HAS_IMAGE
  // console.log(`augustSearch`, augustSearch)
  // console.log(`augustSearch`, URL_IMAGES)
  
  return {
    getObjects: () => getArt(URL_OBJECTS),
    getObjectById: (id: number): Promise<ArtObject> => getArt(`${URL_OBJECTS}${id}`),
    getObjectsWithImages: (): Promise<SearchResponse> => getArt(augustSearch)// getArt(`${BASE_URL}${SEARCH_PATH}${QUERY_HAS_IMAGE}`)
  }
}

// "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir"
// "https://collectionapi.metmuseum.org/public/collection/vi/search?hasImages=true&q=Auguste Renoir"
