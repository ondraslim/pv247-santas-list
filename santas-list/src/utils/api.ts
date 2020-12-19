

const apiConfig = {
  apiKey: 'AIzaSyBgMpZHjVvrSRrAfyCpeiRHu2Cwgfse3Ls',
  searchEngineId: 'c9bd9c488fcf2e2eb',
  urlBase: 'https://www.googleapis.com/customsearch/v1'
};

type Image = {
  src: string,
};

export const defaultImg: string = "https://i.ibb.co/2P0DfdP/Daco-4409798.png";

export type Item = {
  title: string,
  link: string,
  pagemap: {
    cse_image: Image[],
  }
  imgLink: string,
}

export type SearchResponse = {
  items: Item[],
}

export const searchOnline = async (searchQuery: string): Promise<SearchResponse> => {
  const response = await fetch(`${apiConfig.urlBase}?key=${apiConfig.apiKey}&cx=${apiConfig.searchEngineId}&q=${searchQuery}`);
  if (!response.ok) {
    console.log(response.statusText);
    throw new Error(response.statusText);
  }

  return response.json() as Promise<SearchResponse>;
}
