# Project Name
LinkyArt
## Description

Platform where Artists and Art Spaces meet.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.
- **sign up** - As a user I want to sign up on the webpage so that I can see all the Artists or Art Spaces available in my area.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account and make changes.
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Artists or Art Spaces list** - As a user I want to see all the Artists or Art Spaces available so that I can choose which ones I want to contact.
- **Artists or Art Spaces profiles** - As a user I want to see all the Artists or Art Spaces profiles except contact details. Contact details will be avaible when the user recieves a request.
- **send a request** - As a user I want to send a request with my contact details to Artist or Art Spaces.
- **recieve a request** - As a user I want to check all the requests from Artist or Art Spaces.
- **request detail** - As a user I want to see all the requests sent from Artist or Art Spaces so that I can decide if I contact them.


## Backlog

List of other features outside of the MVPs scope

Artist profile:
- see and update my profile.
- upload my collection pictures.
- select favorites Art Spaces.
- see Art Spaces profiles.
- result filters by type of Art Space or by name.
- rating Art Spaces.
 
Art Space profile:
- see and update my profile.
- upload Art Space pictures.
- select favorites Artists.
- see Artists profiles.
- result filters by type of Artist or by name.
- rating Artists.


Homepage
- improve graphic effects.
- API


## ROUTES:
--------------------------------------------------------------
- GET / 
  - renders the homepage
- GET /auth/login
  - redirects to /user if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to /user if user logged in
  - body:
    - username
    - password
    - artist: true/false
- GET /auth/signup
  - redirects to /user if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to /user if user logged in
  - body:
    - username
    - password
    - artist: true/false

- POST /auth/logout
  - redirects to /
  - body: (empty)

-------------------------------------------
- GET /profile
  - renders the User information.
  - redirects to /login if user is anonymous.
- POST /profile/
  - redirects to /login if user is anonymous.
  - if user is register we show the updated info

-------------------------------------------
- GET /artist
  - renders the Artist list.
  - redirects to /login if user is anonymous.
- GET /artist/:id
  - renders the Artist information including contact button.
  - redirects to /login if user is anonymous.
- POST /artist/:id
  - redirects to /login if user is anonymous.
  - Save message between User and Space in Message collection.
  - body Collection Messages: 
    - username
    - space 
    - date
  - redirects to /artist after send the message.
--------------------------------------------------
- GET /space
  - renders the Space list.
  - redirects to /login if user is anonymous.
- GET /space/:id
  - renders the Space information including contact button.
  - redirects to /login if user is anonymous.
- POST /space/:id
  - redirects to /login if user is anonymous.
  - Save message between User and Space in Message collection.
  - body Collection Messages: 
    - username
    - space 
    - date
  - redirects to /artist after send the message.
-----------------------------------------------------
- GET /profile/messages
  - renders the list of sent requests.
  - renders the list of received requests.
  - User can delete any request.
  - redirects to /login if user is anonymous.
------------------------------------------------------
backlog
- POST /profile/messages
  - takes the messages data from the data base (Message collection). 
  - redirects to /login if user is anonymous.
---------------------------------------------------------
- POST /user/message/delete
  - delete the selected request. 
  - redirects to /login if user is anonymous.
  - body:
    - message._id
    - message.sender
    - message.space(owner)


## Models

User model
 
```
type_artist: Boolean
username: String
password: String
name: String
email: String
telephone: String
homepage: String

```

Message Model

```
sender: {
  type: ObjectId,
  ref: 'User'
},
spaceToRent: {
  type: ObjectId,
  ref: 'Space'
},
date: Date

```


Space model

```
owner{
  type: ObjectId,
  ref: 'User'
},
name: String
contact-name: String
email: String
telephone: String
homepage: String


```
## Task list
1. Installation and configuration.
2. Create basic files.
3. Create homepage and links.
4. Create models. Create seeds.
5. Create routes files. 
6. Create login and signup pages. 
7. Connect homepage, login and signup.
8. Create profile page.
9. Create messages page.
10. Create artists - artists/:id page.
11. Create spaces - spaces/:id page.
12. Connect profile, artists and spaces pages.
13. 
XX. Add error pages.

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/esaujc/linkyart)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
