## Movie4u - A Netflix Style Movie Search App

**Movie4u** is a user-friendly web application that allows users to search for their favorite movies, view information, and add them to their favorites list. This project was built using HTML, CSS, JavaScript, and the OMDb API.

### Features:

- **Search Functionality:** Easily search for movies by title.
- **Movie Information:** View movie details such as title, poster, year of release, and IMDb link.
- **Favorites List:** Add movies to your favorites list for quick access.
- **Local Storage:** Your favorites list is saved locally in your browser so it persists even after closing the page.
- **Responsive Design:** Enjoy a seamless experience on different screen sizes.


### Technologies Used:

**Frontend:**
- HTML: Structures the web pages.
- CSS: Styles the website for an appealing look.
- JavaScript: Handles user interactions and fetches data from the API.

**API:**
- OMDb API: Used to retrieve movie information. [http://www.omdbapi.com/](http://www.omdbapi.com/)

### Functionality:

1. **Home Page:** The application starts on the Home Page, where users can search for movies by typing a movie title into the search bar and clicking the "Search" button.

2. **Search Results:** The search results are displayed in a grid format. Each movie card displays the movie poster, title, and year of release. Clicking on the movie poster or title redirects the user to the movie's IMDb page.

3. **Favorites Page:** Clicking the "Favorites" button in the header takes the user to the Favorites Page. Here, all the movies added to the favorites list are displayed.

4. **Add to Favorites:** Each movie card has a heart icon. Clicking this icon adds the movie to the favorites list. 

5. **Remove from Favorites:**  On the Favorites Page, each movie card has a "Remove" button, which removes the movie from the favorites list.

### How to Use:

1. **Get an API Key:** Before running the application, you need to obtain an API key from [http://www.omdbapi.com/](http://www.omdbapi.com/) and replace the placeholder in `script.js` with your API key.
   
2. **Open `index.html`:** Open the `index.html` file in your web browser to start using the application.

### Future Enhancements:

- Implement pagination for displaying large search results.
- Add the ability to clear the entire favorites list.
- Improve the user interface with more styling and animations.
- Allow users to create accounts and manage their favorites lists online.
