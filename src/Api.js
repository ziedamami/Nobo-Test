var allFilms = [];
///
//
// Methods of this class are used to simulate calls to server.
//
class Api {
  getItemUsingID(id) {
    let res = allFilms.filter(x => x.show.id === parseInt(id, 10));
    return res.length === 0 ? null : res[0];
  }

  async getItems(queryItem) {
    try {
      if(queryItem ===''){
        return [];
      }
      allFilms = await fetch(
        'https://api.tvmaze.com/search/shows?q=' + queryItem
      )
      allFilms = await allFilms.json();
      return allFilms;
    } catch (e) {
      console.log('error ' + e)
      return;
    }
  }
}

export default new Api();
