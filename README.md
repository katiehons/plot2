# Personal Library Organization and Tracking (PLOT)
---
## Application Overview
This project is inspired by my family's gloriously unmanageable book collection. Its primary goal is to provide a simple way to track your book collection, to avoid double-buying and help disorganized book-lovers everywhere stay sane! You can also track where a particular book is physically (or at least, where it should be!). There are a few features I'd still like to implement (mentioned below), but mainly I want this app to stay simple so it is easy to use and maintain.  

##### Some technical details
PLOT is built on the [Electron](https://www.electronjs.org/) Framework. It also uses [React](https://reactjs.org/) for UI rendering and management. The [SQLite](https://www.sqlite.org/index.html) database is created and modified using [Sequelize](https://sequelize.org/). The [Google Books API](https://developers.google.com/books) provides book details from a given ISBN.

## Acknowledgements
Many thanks to the student developer team who started this project with me: Max Briggs, Nathan Lee, Kevin Mach, and Jordan Mielbrecht. Thank you, Dr. Arias, for always encouraging me and for mentoring my Honors Project; and my family, for fostering my love of books, technology, and creativity. Finally, I am so grateful to my father and first software mentor, Bradey Honsinger, for advising me through every step of creating PLOT.  

App icons created by [Daniel Ceha](https://www.flaticon.com/free-icons/bookshelf) and [bqlqn](https://www.flaticon.com/free-icons/book)

---
## Installation Guide
To download the app, go to the [releases page](https://github.com/katiehons/plot2/releases) or click the "releases" link in the sidebar.
App images are available for MacOS (`.dmg`), Linux (`.AppImage`), and Windows (`.exe`).

##### MacOS-specific notes
Since I didn't buy an application certificate from Apple, you will probably get a security warning when you go to open the app. If it gives you a warning dialog and won't open with a simple click, you should be able to open it if you right-click on the app and choose "open".

##### Windows-specific notes
You may also get warnings about unknown developers on Windows. It should be more straightforward to click through them on MacOS; I needed to click "Read More" and then I could "Run Anyways"

##### Linux-specific notes
If you click the app to open it and you get a message about not having an application to open files of this type, you probably need to edit the file permissions. Right-click on the app and select "properties" from the menu that pops up. Go to the "Permissions" tab and select the box that says "Allow executing file as program". Then when you click the app, it should run!



## User Guide
### Library setup
<img src="./plot_screencaps/library_setup.png" alt="library setup page" width=75%><br/>  
The first time you open PLOT, you will see a screen like the one above. Give your library a name! It will be displayed later as "The _Yourname_ Library". If you input "The Yourname Library" into the text box, it will turn into "The The Yourname Library Library". Then you can sign in as guest right away, or add a user first. Either way, you should add a location before you add a book because of [this existing issue](https://github.com/katiehons/plot2/issues/5). After clicking the Menu button (☰) go to Manage Locations > Add a location. You'll need to add a room first and then a bookshelf. Then you can start adding books under Menu > Add Book! See the below section for more information.

### Profiles
<img src="./plot_screencaps/profiles.png" alt="profiles page" width=75%><br/>  
You can add a new profile from the profiles page, which you'll see immediately after you open on the app. You can also get to the profiles page through Menu > Switch Profiles. Usernames can't be empty, which the app will tell you if you try to "Save and return" before entering a name. Other than that there are no restrictions on characters or length for usernames. There is also currently no way to delete a user, so be careful who you add!

### Locations
<img src="./plot_screencaps/manage_locations.png" alt="manage locations page" width=75%><br/>  
##### Managing Locations
You can add and delete locations from "Manage Locations". Deleting a room also deletes all of its bookshelves. Location will be unset for any books stored on the bookshelf or in the room you delete. Set the location of a particular book through its "Edit" button  

##### View Books by Location
On the "Browse Bookshelves" page you can see all the books located on a bookshelf. My vision for this feature was to mimic browsing your shelves looking for something to read.

### Books
<img src="./plot_screencaps/home_books.png" alt="home screen books" width=75%><br/>  
##### Adding a book
On the "Add Book" page, you can add a new book by entering an ISBN. If you are going to be adding many books, I recommend getting a barcode scanner; all you need to do is connect the scanner to your computer and it can get the ISBN from a book's barcode. PLOT looks on Google Books to find information about the book you're adding. It is a large but not exhaustive database of books; if you are getting a message that it failed to find a book with your ISBN and you are sure there are no errors in the ISBN, try searching [books.google.com](https://books.google.com) by title, and see if there is a comparable book. If you find something close enough, you can copy and paste the ISBN from that listing. You can also use the "Add Manually" button to enter information without searching. There is no way to add a cover image manually, so the default image will be used. There is no formatting or other error checking for the input fields though, so be careful!    

### Page List
The pages in the library, a brief description of their purpose, and how to navigate to them.  

**Menu:** PLOT's toolbar for page navigation. Accessible under the hamburger menu
 icon "☰" from most pages  
 <img src="./plot_screencaps/menu_bar.png" alt="menu bar" width=50%><br/>  

**Profiles:** Select profile. First page shown after opening the app, and is also under Menu > Switch Profiles  
<img src="./plot_screencaps/profiles.png" alt="profiles page" width=50%><br/>  

**Add Profile:** Create a new user. Profiles > "Add Profile" button  
<img src="./plot_screencaps/add_profile.png" alt="new profile page" width=50%><br/>  

**Home:** Library homepage. View which user is signed in, and scroll through an unordered list of books. Access by clicking any profile button on the Profiles page, or through Menu > Library Home  
<img src="./plot_screencaps/home.png" alt="home page" width=50%><br/>  

**Browse Bookshelves:** Scroll through books on a particular bookshelf. Menu > Browse Locations   
<img src="./plot_screencaps/browse_bookshelves.png" alt="browse bookshelves page" width=50%><br/>  

**Search:** Search the books in your own library by Title, Author, or ISBN. Menu > Search Books  
<img src="./plot_screencaps/search.png" alt="search page" width=50%><br/>

**Add a New Book (ISBN search):** Add a book to the library by entering only its ISBN. Menu > Add Book or from Add Book (Manually) click "Add by Searching" button.  
<img src="./plot_screencaps/add_book_isbn.png" alt="add book by isbn" width=50%><br/>
<img src="./plot_screencaps/add_isbn_confirm.png" alt="add book by isbn: confirmation" width=50%><br/>

**Add a New Book (Manually)**: Menu > Add Book > "Add Manually" button  
<img src="./plot_screencaps/add_man.png" alt="add book manually" width=50%><br/>
<img src="./plot_screencaps/add_man_confirm.png" alt="add book manually: confirmation" width=50%><br/>

**Edit (Book)**: Edit title, author, ISBN, and location of a particular book. Click the "Edit" button on a book tile anywhere it's visible: Home, Search, or Browse Bookshelves.  
<img src="./plot_screencaps/edit_book.png" alt="edit book page" width=50%><br/>

**Manage Locations:** Navigate to add or delete locations page. View all locations that exist in the library. Menu > Manage Locations  
<img src="./plot_screencaps/manage_locations.png" alt="manage locations" width=50%><br/>

**Add New Location:** Add a room or bookshelf. Manage Locations > "Add Location" button  
<img src="./plot_screencaps/add_loc.png" alt="add location" width=50%><br/>

**Delete a Location:** Remove a room or bookshelf from your library. Manage Locations > "Delete Location" button  
<img src="./plot_screencaps/del_loc.png" alt="delete location" width=50%><br/>

**Setup:** Set your library name. Visible only the first time you open the app; no way to navigate back to it after setup is complete.  
<img src="./plot_screencaps/library_setup.png" alt="library setup screen" width=50%><br/>

## Planned Features
##### Reading History and TBR
As you may notice, the ability to view books as a particular user goes completely unused at this point. The vision for this feature is to implement a reading history and to be read list. A user will be able to add books from the library to their own list.

##### Select and Move Multiple Books
I would like to add the ability to move multiple books at once from one location to another. With the current feature set, if you move several books from one shelf to another you would need to change their location in PLOT one at a time, which could be heinously tedious depending on how many books you move at once.

##### User-defined Tags
Users would be able to define their own categories and assign books to them.

##### What would you like to see?
I welcome feature suggestions and other input. If you have an idea for refinement of an existing feature or if there is a feature you would love to see, create an issue in this repo to let me know! This is also the best way to report bugs.
