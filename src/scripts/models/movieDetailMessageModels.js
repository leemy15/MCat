module.exports = {
  get({key}) {
    return $.ajax({
      url: `api/ajax/detailmovie?movieId=${key}`,
    })
  }
}
