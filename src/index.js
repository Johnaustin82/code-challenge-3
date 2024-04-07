// Your code here
// fetch('http://localhost:3000/films')
// .then(res => res.json())
// .then(ticketsAvailable => {const numberOfTickets = "capacity"-"tickets_sold"});

// fetch('http://localhost:3000/films')
//   .then(response => response.json())
//   .then(data => {
//     // Access the movie details from the response data
//     const poster = data.poster;
//     const title = data.title;
//     const runtime = data.runtime;
//     const showtime = data.showtime;
//     const capacity = data.capacity;
//     const ticketsSold = data.tickets_sold;

//     // Calculate the number of available tickets
//     const availableTickets = capacity - ticketsSold;


document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            const film = data[0]; 
            const poster = film.poster;
            const title = film.title;
            const runtime = film.runtime;
            const showtime = film.showtime;
            const capacity = film.capacity;
            const ticketsSold = film.tickets_sold;
            const availableTickets = capacity - ticketsSold;
            const description = film.description;

            document.getElementById('title').textContent = title;
            document.getElementById('runtime').textContent = runtime;
            document.getElementById('showtime').textContent = showtime;
            document.getElementById('description').textContent = description;
            document.getElementById('availableTickets').textContent = availableTickets;
            document.getElementById('poster').innerHTML = `<img src="${poster}" alt="Poster">`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


const ul = document.getElementById("films");
const li = ul.firstElementChild
ul.removeChild(li)

fetch('http://localhost:3000/films')
 .then(res => res.json())
 .then(movieList => {
    const list = document.getElementById("films");
    movieList.forEach(films =>{
        const makeList = document.createElement("li");
        makeList.className ="movies"; 
        makeList.textContent = films.title;
        makeList.style.color = "#FF0000 ";
        makeList.style.fontFamily = "fantasy";
        makeList.style.fontStyle = "italic";
        list.appendChild(makeList)
        makeList.addEventListener('click', () => {
            buyTicket(movie.id);
        });
    })
})


function buyTicket(movies) {
    fetch(`http://localhost:3000/films/${movies}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tickets_sold: 1 }) 
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('class').textContent = data.capacity - data.tickets_sold;
    })
    .catch(error => {
        console.error('Error buying ticket:', error);
    });
}

