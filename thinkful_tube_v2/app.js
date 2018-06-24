const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = config.API_KEY;

//get data from api
function getDataFromApi(searchTerm, callback){
  const query = {
    part: 'snippet',
    key: API_KEY,
    q: `${searchTerm} in:title`,
    type: 'video',

  }

  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

// render result

// display youtube search data

// get next page for more search results

// get previous page for previous search results


// EVENT LISTENER

//handleSearch
function watchSubmit() {
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    console.log('submited search query');

    //clears search field
    $("input").val("");


  })
}

$(watchSubmit)
