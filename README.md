# OpenChair.in

Temporarily Live @ http://www.openchair.in/

###General Info
-------------------------------------------
OpenChair.in is an appointment scheduling website akin to open table, but for salon and spa services.

###Purpose
-------------------------------------------
The problem this solves is that open table only works for restaurants and not other businesses that could actually use it. OpenChair.in will allow any business that wants to, create and manage a scheduling calendar so that they can keep track of appointments more efficiently,make themselves easier to find, and help establish a web presence.

### User Experience
-------------------------------------------
User can search based on their current location of specific types of businesses(ex. masssage therapist, hair salon) and open times. More specifically, last minute openings. They search for nearby businesses and choose one. The  businesses page has photos as well as links to Yelp account with reviews and allows you to book appointments. Availible times and choose a time,  a service, and can add notes. They can then book the appointment which sends out a confirmation email. They can go to their user page and see all their current appointments and see current appointments, saved favorited business, and update personal info. 

### Business Experience
------------------------------------------
Once logged in it takes the business user to his schedlue calendar. You can choose month, week, or day view. There you can see current appointments and add and edit them. The appointments are drag and droppable on the calendar to update. On the business dash you can edit business info, add pictures, change open hours.



|Technologies|Used|
|-------|-------|
|Mongo|Mongo was used for our database|
|Express|Express made writing our server easier by doing the hard stuff|
|Angular|Angular was used to create front end web application as well getting data with $http, moving that data around and providing functionality to the html.|
|Node|Node was used as for the web server.|
|Mongoose|Mongoose was used to help model Schema's|
|bcryptjs|Bcryptjs is used for it's password hash algorythm. |
|bady-parser|Body parser is used as middleware that returns objects in req.body or returns an error to the callbacks.|
|cors|Allows for http requests from different domain than the one that served the request.|
|express-sessions|Used to save the user info to the session in server once logged in.|
|gulp| Gulp was used for auto configuration.|
|less| Less was used as our preprocesser for our CSS.|
|passport|Passport was used to authenticate the user.|
|moment.js|Moment.js was used in manipulating and formatting times and dates.|
|mandril| Mandril was used for confirmation emails.|
|FullCalendar| FullCalendar was used to help create the business schedule view|



###Contributers
-------------------------------------------
* Cyrus Holt,
* Deon Sharp,
* Devyn Bartell,
* Stephen Brinkworth,
* Travis Erickson
