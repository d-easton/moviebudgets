
const searchMovie = async (title) => {
    const endpoint = "search/movie";
    const lang = "?language=en-US";
    const query = "&query=" + (title);    
    const compositeURL = url.concat(endpoint, lang, query);
    $.ajax({
        url: compositeURL,
        data: { "api_key": keyV3 },
        dataType: "json",
   
        success: ( result ) => {
            populateConfirmationWindow(result.results);
        }
    });
};

// after search, populate panel with potential matches. User picks the one they intended


const movieSelected = (event, movieID) => {
    queryMovieDetails(movieID);
}

const populateConfirmationWindow = (results) => {
    let cards = [];
    results.forEach( (elem, index) => {
        const title = elem.title;
        const id = "card" + index;
        $("#candidate-panel").append("<div id='"+id+"' class='movie-card' movieID='"+elem.id+"' onclick='movieSelected("+id+", "+elem.id+")'/> </div>");
        const card = $("#"+id);
        card.append("<p>"+title+"</p>");
        card.append("<img class='poster-img' src='"+imgURL+elem.poster_path+"' alt='"+title+"'/></div>");
        cards.push(id);
    });
    cards.forEach( (elem) => {
        console.log(elem);
        $("#"+elem).fadeTo(400, 1.0);
    });
}


const queryMovieDetails = (movieID) => {
    const endpoint = "movie";
    const lang = "?language=en-US";    
    const compositeURL = url.concat(endpoint, ext, movieID, lang);
    $.ajax({
        url: compositeURL,
        data: { "api_key": keyV3 },
        dataType: "json",
   
        success: ( result ) => {
            palette.push( result );
        }
    });
}


// Callbacks
const searchCallback = (event) => {
    event.preventDefault();
    const input = $("#search-field").val();
    queryMovieDetails(  searchMovie(input)  );
}

const toggleSidePanel = () => {
    sidebarState = !sidebarState;
    if (sidebarState) {
        $("#side-panel").animate({right: '0px'});
    } 
    else {
        $("#side-panel").animate({right: '-400px'});
    }
}

const toggleSearchPanel = () => {
    searchState = !searchState;
    if (searchState) {
        $("#search-panel").animate({left: '0px'});
    } 
    else {
        $("#search-panel").animate({left: '-500px'});
    }
}

// Listeners
$("#search-form").on("submit", searchCallback);
$("#side-panel-btn").on("click", toggleSidePanel);
$("#search-panel-btn").on("click", toggleSearchPanel);

window.onload = (event) => {

}