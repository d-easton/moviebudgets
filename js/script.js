
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
    // event.preventDefault();
    queryMovieDetails(movieID);
}

const populateConfirmationWindow = (results) => {
    results.forEach( (elem, index) => {
        const title = elem.title;
        const id = "card" + index;
        $("#candidate-panel").append("<div id='"+id+"' class='movie-card' movieID='"+elem.id+"' onclick='movieSelected("+id+", "+elem.id+")'/> </div>");
        const card = $("#"+id);
        card.append("<p>"+title+"</p>");
        card.append("<img class='poster-img' src='"+imgURL+elem.poster_path+"' alt='"+title+"'/></div>");
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
            console.log(result);
        }
    });
}

// Callbacks
const searchCallback = (event) => {
    event.preventDefault();
    const input = $("#search-field").val();
    queryMovieDetails(  searchMovie(input)  );
};

// Listeners
$("#search-form").on("submit", searchCallback);

window.onload = (event) => {
    // searchMovie("Dune");

}