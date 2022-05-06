# Personal Library Organization and Tracking (PLOT)
---
## Application Overview
This project is inspired by my family's gloriously unmanageable book collection. Its primary goal is to provide a simple way to track your book collection, to avoid double-buying and help disorganized book-lovers everywhere stay sane! You can also track where a particular book is physically (or at least, where it should be!). There are a few features I'd still like to implement (mentioned below), but mainly I want this app to stay simple so it is easy to use and maintain.  

##### Some technical details
PLOT is built on the [Electron](https://www.electronjs.org/) Framework. It also uses [React](https://reactjs.org/) for UI rendering and management. The [SQLite](https://www.sqlite.org/index.html) database is created and modified using [Sequelize](https://sequelize.org/). The [Google Books API](https://developers.google.com/books) provides book details from a given ISBN.

## Next features
##### Reading History and TBR
As you may notice, the ability to view books as a particular user goes completely unused at this point. The vision for this feature is to implement a reading history and to be read list. A user will be able to add books from the library to their own list.

##### Select and Move Multiple Books
I would like to add the ability to move multiple books at once from one location to another. With the current feature set, if you move several books from one shelf to another you would need to change their location in PLOT one at a time, which could be heinously tedious depending on how many books you move at once.

##### User-defined Tags
Users would be able to define their own categories and assign books to them.

##### What would you like to see?
I welcome feature suggestions and other input. If you have an idea for refinement of an existing feature or if there is a feature you would love to see, create an issue in this repo to let me know! This is also the best way to report bugs.

## Acknowledgements
Many thanks to the student developer team who started this project with me: Max Briggs, Nathan Lee, Kevin Mach, and Jordan Mielbrecht. Thank you, Dr. Arias, for always encouraging me and for mentoring my Honors Project; and my family, for fostering my love of books, technology, and creativity. Finally, I am so grateful to my father and first software mentor, Bradey Honsinger, for advising me through every step of creating PLOT.  

App icons created by [Daniel Ceha](https://www.flaticon.com/free-icons/bookshelf) and [bqlqn](https://www.flaticon.com/free-icons/book)


---
## FIXME Installation Guide
App images for MacOS (`.dmg`) and Linux (`.AppImage`) are available in the [`dist`](dist) directory. Windows OS is coming soon. To install, simply download and open the appropriate file.  
##### Some MacOS-specific notes
On MacOS, since I didn't buy an app certificate from Apple, you will probably get a security warning when you go to open the app. If it won't open with a simple click, you should be able to open it if you right-click on the app and choose "open".


## User Guide
### Library setup
The first time you open PLOT, you will see a screen like the one above. Give your library a name! It will be displayed later as "The _Yourname_ Library". If you input "The Yourname Library" into the text box, it will turn into "The The Yourname Library Library". Then you can sign in as guest right away, or add a user first. Either way, you should add a location before you add a book because of [this existing issue](https://github.com/katiehons/plot2/issues/5). After clicking the Menu button (☰) go to Manage Locations > Add a location. You'll need to add a room first and then a bookshelf. Then you can start adding books under Menu > Add Book! See the below section for more information.

### Profiles
You can add a new profile from the profiles page, which you'll see immediately after you open on the app. You can also get to the profiles page through Menu > Switch Profiles. Usernames can't be empty, which the app will tell you if you try to "Save and return" before entering a name. Other than that there are no restrictions on characters or length for usernames. There is also currently no way to delete a user, so be careful who you add!

### Locations
##### Managing Locations
You can add and delete locations from "Manage Locations". Deleting a room also deletes all of its bookshelves. Location will be unset for any books stored on the bookshelf or in the room you delete. Set the location of a particular book through its "Edit" button  

##### View Books by Location
On the "Browse Bookshelves" page you can see all the books located on a bookshelf. My vision for this feature was to mimic browsing your shelves looking for something to read.

### Books
##### Adding a book
On the "Add Book" page, you can add a new book by entering an ISBN. If you are going to be adding many books, I recommend getting a barcode scanner; all you need to do is connect the scanner to your computer and it can get the ISBN from a book's barcode. PLOT looks on Google Books to find information about the book you're adding. It is a large but not exhaustive database of books; if you are getting a message that it failed to find a book with your ISBN and you are sure there are no errors in the ISBN, try searching [books.google.com](https://books.google.com) by title, and see if there is a comparable book. If you find something close enough, you can copy and paste the ISBN from that listing. You can also use the "Add Manually" button to enter information without searching. There is no formatting or other error checking for the input fields though, so be careful!    

### Page List
The pages in the library, a brief description of their purpose, and how to navigate to them.  

**Menu**: PLOT's toolbar for page navigation. Accessible under the hamburger menu icon "☰" from most pages  
**Profiles**: Select profile. First page shown after opening the app, and is also under Menu > Switch Profiles  
**Add Profile**: Create a new user. Profiles > "Add Profile" button  
**Home**: Library homepage. View which user is signed in, and scroll through an unordered list of books. Access by clicking any profile button on the Profiles page, or through Menu > Library Home  
**Browse Bookshelves**: Scroll through books on a particular bookshelf. Menu > Browse Locations   
**Search**: Search the books in your own library by Title, Author, or ISBN. Menu > Search Books  
**Add a New Book (ISBN search)**: Add a book to the library by entering only its ISBN. Menu > Add Book or from Add Book (Manually) click "Add by Searching" button.  
**Add a New Book (Manually)**: Menu > Add Book > "Add Manually" button  
**Edit (Book)**: Edit title, author, ISBN, and location of a particular book. Click the "Edit" button on a book tile anywhere it's visible: Home, Search, or Browse Bookshelves.  
**Manage Locations**: Navigate to add or delete locations page. View all locations that exist in the library. Menu > Manage Locations  
**Add New Location** Add a room or bookshelf. Manage Locations > "Add Location" button  
**Delete a Location** Remove a room or bookshelf from your library. Manage Locations > "Delete Location" button  
**Setup** Set your library name. Visible only the first time you open the app; no way to navigate back to it after setup is complete.
