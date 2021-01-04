export function searchProducts(item, condition, sort, page) {
  page ? (page = `&page=${page}`) : (page = "");
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/search?query=${item}${page}`)
      .then((res) => res.json())
      .then((res) => {
        if (condition) {
          res.results = res.results.filter((product) => product.condition === condition);
        }
        return res;
      })
      .then((res) => {
        if (sort) {
          sort === "asc"
            ? (res.results = res.results.sort((a, b) => a.price - b.price))
            : (res.results = res.results.sort((a, b) => b.price - a.price));
        }
        return res;
      })
      .then((data) => {
        dispatch({
          type: "SEARCH_PRODUCTS",
          payload: data,
        });
      });
  };
}

export function searchByCategory(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/search?category=${id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "SEARCH_BY_CATEGORY",
          payload: res,
        });
      });
  };
}

export function getCategories() {
  return function (dispatch) {
    return fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_CATEGORIES",
          payload: res,
        });
      });
  };
}
