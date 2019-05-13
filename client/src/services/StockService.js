const baseURL = 'http://localhost:3000/api/stocks/'

export default {

  getStocks(){
    return fetch(baseURL)
    .then(res => res.json())
  },

  getBySymbol(symbol){
    return fetch(baseURL + symbol)
    .then(res => res.json())
  },

  deleteStock(id){
    return fetch(baseURL + id, {
      method: 'DELETE'
    })
  },

  postStock(payload){
    console.log('in postStock', payload);
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },

  putStock(payload, id){
    console.log('in putStock', payload, baseURL+id);
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: { 'Content Type': 'application/json' }
    })
    .then(res => res.json())
  }
}
