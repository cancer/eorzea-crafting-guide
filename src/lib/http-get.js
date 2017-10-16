const makeQueryStr = queryObj => {
  return Object.keys(queryObj).reduce((acc, key) => {
    acc.push(`${key}=${queryObj[key]}`);
    return acc;
  }, []).join('&');
};

const _fetch = (url, resolve, reject) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res  => resolve(res.json()))
      .catch(err => reject(err));
    });
};

export const httpGet = (url, _query) => {
  if (!_query) {
    return _fetch(url);
  }

  const query = makeQueryStr(_query);
  return _fetch(`${url}?${query}`);
};
