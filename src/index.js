document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000";

  fetch(`${baseUrl}/films/1`)
  .then(response => response.json())
  .then(movie => {
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById('title').textContent = movie.title;
    document.getElementById('film-info').textContent = movie.description;
    document.getElementById('runtime').textContent = movie.runtime;
    document.getElementById('showtime').textContent = movie.showtime;
    document.getElementById('poster').src = movie.poster;
    document.getElementById('ticket-num').textContent = availableTickets;
  })
  .catch(error => console.error('Error fetching movie details:', error));

});

document.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("films");
  const li = ul.firstElementChild
  ul.removeChild(li)
  MovieMenu();

  function MovieMenu() {
    fetch("http://localhost:3000/films")
      .then(response => response.json())
      .then(movieList => {
        const ul = document.getElementById("films");
        movieList.forEach(movie => {
          const li = document.createElement("li");
          li.className = "film"; 
          li.textContent = movie.title;

          const buyButton = document.getElementById("buy-ticket");
          buyButton.addEventListener("click", () => {
            buyTicket(movie);
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.addEventListener("click", () => {
            deleteMovie(movie.id); 
          });

          li.appendChild(deleteBtn);
          ul.appendChild(li);
        });
      })
      .catch(error => console.error("Error fetching movies:", error));
  }


function deleteMovie(filmId) {
    fetch(`http://localhost:3000/films/${filmIdId}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to delete movie");
      })
      .then(() => {
        const listItem = document.getElementsByClassName(`.film[data-id="${filmId}"]`);
        if (listItem) {
          listItem.remove();
        } else {
          console.error("Movie not found in the list");
        }
      })
      .catch(error => console.error("Error deleting movie:", error));
  }
});

