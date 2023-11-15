import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './css/styles.css';
import './assets/images/error-screen.jpg';

function getGifs(searchTerm) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=3&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
            printElements(response, searchTerm);
        } else {
            printError(this, response, searchTerm);
        }
    });

    request.open("GET", url, true);
    request.send();
}

//UI

function printError(request, apiResponse, searchTerm) {
    document.querySelector('#showGif').innerText = `There was an error accessing gifs for ${searchTerm}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse) {
    const gifDiv = document.querySelector('#showGif');
    const gif = document.createElement("img");

    gifDiv.innerText = "";

    try {
        gif.src = apiResponse.data[1].images.original.url;

        gif.alt = "a gif";
        gifDiv.append(gif);
    } catch (error) {
        console.error("Error accessing gif URL:", error);
        gif.src = './assets/images/error-screen.jpg';
        gif.alt = "error loading gif";
        gifDiv.append(gif);
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('#gif').value;
    document.querySelector('#gif').value = null;
    getGifs(searchTerm);
}


window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
});