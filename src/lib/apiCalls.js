const marvelURL = 'https://gateway.marvel.com/v1/public/',
  apiKey = `apikey=${process.env.REACT_APP_PUBLIC_API_KEY}`,
  STATUS_CODE_OK = 200;

const getMarvelCharacters = (options) => {
  const {
    offset,
    name,
    exactMatch,
    sortName,
    limit,
  } = Object.assign({
    offset: 0,
    name: '',
    exactMatch: false,
    sortName: '',
    limit: 20,
  }, options);

  let url =
    `${marvelURL}characters?${apiKey}&offset=${offset}&orderBy=${sortName}name&limit=${limit}`;
  if (name) {
    if (exactMatch) { url += `&name=${name}`; }
    else { url += `&nameStartsWith=${name}`; }
  }
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === STATUS_CODE_OK) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
            };
          }
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
}

const getMarvelComics = () => {
  let url =
    `${marvelURL}comics?${apiKey}`;
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === STATUS_CODE_OK) {
          return {
            comics: resObj.data.results,
          };
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          comics: [],
        };
      }
    });
};

export {
  getMarvelCharacters,
  getMarvelComics,
};
