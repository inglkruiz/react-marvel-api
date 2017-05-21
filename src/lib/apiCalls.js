const getMarvelCharacters = (offset, name = '', exactMatch = false, sortName = '') => {
  let url =
    `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&offset=${offset}&orderBy=${sortName}name`;
  if (name) {
    if (exactMatch) { url += `&name=${name}`; }
    else { url += `&nameStartsWith=${name}`; }
  }
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / 20);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % 20 > 0 ? pages + 1 : pages,
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

export {
  getMarvelCharacters,
};
