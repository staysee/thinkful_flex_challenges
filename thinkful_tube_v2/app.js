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

// display youtube search data
function displayYouTubeSearchData(data){
  const results = data.items.map((item, index) => renderResult(item));
  console.log(data);
  $('.js-results').html(results);
}

// render result
function renderResult(result){
  const videoID = result.id.videoId;
  const channelID = result.snippet.channelId;

  return `
    <div class="search-item">
        <a href="https://youtube.com/watch?v=${videoID}"><img src="${result.snippet.thumbnails.medium.url}"></a>
        <div class="video-title">${result.snippet.title}</div>
        <div class="video-description">${result.snippet.description}</div>
        <div class="channel-title">View more by <a href="https://youtube.com/channel/${channelID}" target="_blank">${result.snippet.channelTitle}</a></div>
    </div>
  `
}


// get next page for more search results

// get previous page for previous search results


// EVENT LISTENER

//handleSearch
function watchSubmit() {
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(`submited search query: ${query}`);

    //clears search field
    queryTarget.val("");

    getDataFromApi(query, displayYouTubeSearchData)


  })
}

$(watchSubmit)
