# Welcome to MyKadima!

MyKadima is a RoR-based application that allows users to keep track of their Kadima games, stats, locations, and partners.

  - OmniAuth session functionality allows users to login with Facebook
  - Secure authentication with username, email, and password
  - Add/View Kadima games you are a part of
  - See your Kadima stats such as top scores, favorite partner, and favorite location
  - Add/View Kadima locations including important information about turf and lighting

<<<<<<< HEAD
## Video Walkthrough
=======
##Video Walkthrough
>>>>>>> f9474bbccc8ab708bacce7fe6fbd9f6ff81f9c9d
  [![IMAGE ALT TEXT](http://i.imgur.com/uHsVlgW.png)](https://github.com/liahwallace1/my-kadima-rails "MyKadima Walkthrough")

## Installation
  Clone the repository, then execute:
  ```
  $ cd my-kadima-rails
  $ bundle
  ```

## Usage

  To start the server, run:
  ```
  $ shotgun
  ```
  Then navigate to ```localhost:9393``` or run:
  ```
  $ open http://localhost:9393
  ```
  Note: *You can also use ```rackup``` then go to ```localhost:9292``` as an alternative to ```shotgun```*
  Note: *If using Learn IDE, navigate to the url given when ```shotgun``` starts*

### Creating an Account

  You can sign up for a MyKadima account by navigating to the Sign Up page. Here, either enter the required fields to create a user, or click the "Log in with Facebook" button.

### Creating a Game

  You can access the New Game form from your User Profile page or from the Navigation bar Games dropdown. Enter all information about your game. Make sure you enter the USERNAME of your game partners. Once you create the game, it will be added to the Games of your friends as well.
 
### Creating a Location
  MyKadima counts on its users to enter the best location information in your area. You can create a new location by clicking "Add a New Location" in the Navigation bar Location dropdown. You can also create a new location when you create a game. If your location is not already present (name will autofill or use the dropdown), you can enter the name of your new Location, and it will be created. This location will not have all of the available location information though, so if possible, visit the location page and update the information.

### Updating User Information
  You can update your username, email, and password by clicking the Update User button on your User Profile page.


### Tech

  MyKadima uses a number of open source projects to work properly:
  * [Ruby on Rails] - A web-application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller (MVC) pattern.
  * [Active Record] - Connects classes to relational database tables.
  * [Bcrypt] - A sophisticated and secure hash algorithm designed by The OpenBSD project.


  MyKadima itself is open source with a [public repository][my-kadima-rails]
   on GitHub.


### To Dos
   - Filters for Games and Locations
   - Adding map to location
   - Add additional styling with Javascript
   - Allow games to include non-users as partners

## Contributing

  Bug reports and pull requests are welcome on GitHub at [this project's repository][my-kadima-rails]. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

  This Web Application is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).


     [my-kadima-rails]: <https://github.com/liahwallace1/my-kadima-rails>
     [bcrypt]: <https://rubygems.org/gems/bcrypt/versions/3.1.11>
     [Active Record]: <https://github.com/rails/rails/tree/master/activerecord>
     [Ruby on Rails]: <https://github.com/rails/rails>
