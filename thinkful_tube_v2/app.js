const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = config.API_KEY;
let search_term = null;

// API CALL
function getDataFromApi(searchTerm, pagekey, callback){
  search_term = searchTerm;
  const query = {
    part: 'snippet',
    key: API_KEY,
    q: `${searchTerm} in:title`,
    type: 'video',
    maxResults: 6,
    pageToken: pagekey
  }

  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


// RENDER RESULTS
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

function displayYouTubeSearchData(data){
  const results = data.items.map((item, index) => renderResult(item));
  // console.log(data);
  $('.js-results').html(results);
  $('.js-total-results').html(`${data.pageInfo.totalResults} result(s) found`);
  getNextPage(data.nextPageToken);
  getPrevPage(data.prevPageToken);
}

// PAGES
function getNextPage(pageToken){
  console.log(`Next Page Token: ${pageToken}`);
  if (!$('#nextPage').hasClass("hidden")){
    $('#nextPage').addClass("hidden");
  }

  if (pageToken !== null && pageToken !== undefined){
    $('#nextPage').removeClass("hidden");
    $('#nextPage').on('click', function(event){
      getDataFromApi(search_term, pageToken, displayYouTubeSearchData);
    })
  }
}

function getPrevPage(pageToken){
  console.log(`Prev Page Token: ${pageToken}`);
  $('#prevPage').addClass("hidden");
  if (pageToken !== null && pageToken !== undefined){
    $('#prevPage').removeClass("hidden");
    $('#prevPage').on('click', function(event){
      getDataFromApi(search_term, pageToken, displayYouTubeSearchData);
    })
  }
}


// EVENT LISTENER
function watchSubmit() {
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(`submited search query: ${query}`);
    queryTarget.val("");  //clears input

    getDataFromApi(query, null, displayYouTubeSearchData)
  })
}

$(watchSubmit)
