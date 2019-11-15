INSERT INTO articles (url, headline, summary, text, image, favorite)
VALUES
  (
    'https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80',
    'TDD Changed My Life',
    'It’s 7:15 am and customer support is swamped. We just got featured on Good Morning America, and a whole bunch of first time customers are bumping into bugs.
It’s all-hands-on-deck. We’re going to ship a hot fix NOW before the opportunity to convert more new users is gone. One of the developers has implemented a change he thinks will fix the issue. We paste the staging link in company chat and ask everybody to go test the fix before we push it live to production. It works!
Our ops superhero fires up his deploy scripts, and minutes later, the change is live. Suddenly, customer support call volume doubles. Our hot-fix broke something else, and the developers erupt in synchronized git blame while the ops hero reverts the change.',
    'It’s 7:15 am and customer support is swamped. We just got featured on Good Morning America, and a whole bunch of first time customers are bumping into bugs.It’s all-hands-on-deck. We’re going to
ship a hot fix NOW before the opportunity to convert more new users is gone. One of the developers has implemented a change he thinks will fix the issue. We paste the staging link in company chat and ask everybody to go test the fix before we push it live to production. It works!
Our ops superhero fires up his deploy scripts, and minutes later, the change is live. Suddenly, customer support call volume doubles. Our hot-fix broke something else, and the developers erupt in synchronized git blame while the ops hero reverts the change.
Why TDD?
It’s been a while since I’ve had to deal with that situation. Not because developers stopped making mistakes, but because for years now, every team I’ve led and worked on has had a policy of using TDD. Bugs still happen, of course, but the release of show-stopping bugs to production has dropped to near zero, even though the rate of software change and upgrade maintenance burden has increased exponentially since then.
Whenever somebody asks me why they should bother with TDD, I’m reminded of this story — and dozens more like it. One of the primary reasons I switched to TDD is for improved test coverage, which leads to 40%-80% fewer bugs in production. This is my favorite benefit of TDD. It’s like a giant weight lifting off your shoulders.
TDD eradicates fear of change.
On my projects, our suites of automated unit and functional tests prevent disastrous breaking changes from happening on a near-daily basis. For example, I’m currently looking at 10 automated library upgrades from the past week that I used to be paranoid about merging because what if it broke something?
All of those upgrades integrated automatically, and they’re already live in production. I didn’t look at a single one of them manually, and I’m not worried at all about them. I didn’t have to go hunting to come up with this example. I popped open GitHub, looked at recent merges, and there they were. What was once manual maintenance (or worse, neglect) is now automated background process. You could try that without good test coverage, but I wouldn’t recommend it.

What is TDD?
TDD stands for Test Driven Development. The process is simple:

Red, Green, Refactor
Before you write implementation code, write some code that proves that the implementation works or fails. Watch the test fail before moving to the next step (this is how we know that a passing test is not a false positive — how we test our tests).
Write the implementation code and watch the test pass.
Refactor if needed. You should feel confident refactoring your code now that you have a test to tell you if you’ve broken something.
How TDD Can Save You Development Time
On the surface, it may seem that writing all those tests is a lot of extra code, and all that extra code takes extra time. At first, this was true for me, as I struggled to understand how to write testable code in the first place, and struggled to understand how to add tests to code that was already written.
TDD has a learning curve, and while you’re climbing that learning curve, it can and frequently does add 15% — 35% to implementation times. But somewhere around the 2-years in mark, something magical started to happen: I started coding faster with unit tests than I ever did without them.
Several years ago I was building a video clip range feature in a UI. The idea was that you’d set a starting point and an ending point for a video, and when the user links to it, it would link to that precise clip rather than the whole video.
But it wasn’t working. The player would reach the end of the clip and keep on playing, and I had no idea why.
I kept thinking it had to do with the event listener not getting hooked up properly. My code look something like this:
video.addEventListener(' timeupdate ', () => {
  if (video.currentTime >= clip.stopTime) {
    video.pause();
  }
});
Change. Compile. Reload. Click. Wait. Repeat.
Each change took almost a minute to test, and I tried a hilariously large number of things (most of them 2–3 times).
Did I misspell timeupdate? Did I get the API right? Is the video.pause() call working? I’d make a change, add a console.log(), jump back into the browser, hit refresh, click to a moment before the end of the clip, and then wait patiently for it to hit the end. Logging inside the if statement did nothing. OK, that’s a clue. Copy and paste timeupdate from the API docs to be absolutely sure it wasn’t a typo. Refresh, click, wait. No luck!
Finally, I placed a console.log() outside the if statement. “This can’t help,” I thought. After all, that if statement was so simple, there’s no way I could have screwed up the logic. It logged. I spit my coffee on the keyboard. WTF?!
Murphy’s Law of Debugging: The thing you believe so deeply can’t possibly be wrong so you never bother testing it is definitely where you’ll find the bug after you pound your head on your desk and change it only because you’ve tried everything else you can possibly think of.
I set a breakpoint to figure out what was going on. I inspected the value of clip.stopTime. undefined??? I looked back at my code. When the user clicks to select the stop time, it places the little stop cursor icon, but never sets clip.stopTime. “OMG I’m a gigantic idiot and nobody should ever let me anywhere near a computer again for as long as I live.”
Years later I still remember this because of that feeling. You know exactly what I’m talking about. We’ve all been there. We’re all living memes.

Actual photos of me while I’m coding.
If I was writing that UI today, I’d start with something like this:
describe('' clipReducer / setClipStopTime '', async assert => {
  const stopTime = 5;
  const clipState = {
    startTime: 2,
    stopTime: Infinity
  };
  assert({
    given: '' clip stop time '',
    should: ''
    set
      clip stop time in state '',
    actual: clipReducer(clipState, setClipStopTime(stopTime)),
    expected: { ...clipState, stopTime }
  });
});
Granted, superficially, that looks like a whole lot more code than clip.stopTime = video.currentTime. But that’s the point. This code acts like a specification. Documentation, along with proof that the code works as documented. And because it exists, if I change the way I position the stop time cursor on the x, y axis, I don’t have to worry about whether or not I’m breaking the clip stop time code in the process.
Note: Want to write unit tests like this? Check out “Rethinking Unit Test Assertions”.
The point is not how long it takes to type this code. The point is how long it takes to debug it if something goes wrong. If this code broke, this test would give me a great bug report. I’d know right away that the problem is not the event handler. I’d know it’s in setClipStopTime() or the clipReducer() which implements the state mutation. I’d know what it’s supposed to do, the actual output, and the expected output — and more importantly — so would a coworker, 6-months into the future who’s trying to add features to the code I built.
One of the first things I do in every project is set up a watch script that automatically runs my unit tests on every file change. I often code with two monitors side-by-side and keep my dev console with the watch script running on one monitor while I code on the other. When I make a change, I usually know within 3 seconds whether or not that change worked.
For me, TDD is far more than a safety net. It’s also constant, fast, realtime feedback. Instant gratification when I get it right. Instant, descriptive bug report when I get it wrong.
TDD Taught Me How to Write Better Code
I’m going to admit something embarrassing: I had no idea how to build apps before I learned TDD with unit testing. How I ever got hired would be beyond me, but after interviewing hundreds and hundreds of developers, I can tell you with great confidence: there are a lot of developers in the same boat. TDD taught me almost everything I know about effective decoupling and composition of software components (meaning modules, functions, objects, UI components, etc.)
The reason for that is because unit tests force you to test components in isolation from each other, and from I/O. Given some input, the unit under test should produce some known output. If it doesn’t, the test fails. If it does, it passes. The key is that it should do so independent of the rest of the application. If you’re testing state logic, you should be able to test it without rendering anything to the screen or saving anything to a database. If you’re testing UI rendering, you should be able to test it without loading the page in a browser or hitting the network.
Among other things, TDD taught me that life gets a lot simpler when you keep UI components as minimal as you can. Isolate business logic and side-effects from UI. In practical terms, that means that if you’re using a component-based UI framework like React or Angular, it may be advantageous to create display components and container components, and keep them separate.
For display components, given some props, always render the same state. Those components can be easily unit tested to be sure that props are correctly wired up, and that any conditional logic in the UI layout works correctly (for example, maybe a list component shouldn’t render at all if the list is empty, and it should instead render an invitation to add some things to the list).
I knew about separation of concerns long before I learned TDD, but I didn’t know how to separate concerns.
Unit testing taught me about using mocks to test things, and then it taught me that mocking is a code smell, and that blew my mind and completely changed how I approach software composition.
All software development is composition: the process of breaking large problems down into lots of small, easy-to-solve problems, and then composing solutions to those problems to form the application. Mocking for the sake of unit tests is an indication that your atomic units of composition are not really atomic, and learning how to eradicate mocks without sacrificing test coverage taught me how to spot a myriad of sneaky sources of tight coupling.
That has made me a much better developer, and taught me how to write much simpler code that is easier to extend, maintain, and scale, both in complexity, and across large distributed systems like cloud infrastructure.
How TDD Saves Whole Teams Time
I mentioned before that testing first leads to improved test coverage. The reason for that is that we don’t start writing the implementation code until we’ve written a test to ensure that it works. First, write the test. Then watch it fail. Then write the implementation code. Fail, pass, refactor, repeat.
That process builds a safety net that few bugs will slip through, and that safety net has a magical impact on the whole team. It eliminates fear of the merge button.
That reassuring coverage number gives your whole team the confidence to stop gatekeeping every little change to the codebase and let changes thrive.
Removing fear of change is like oiling a machine. If you don’t do it, the machine grinds to a halt until you clean it up and crank it, squeaking and grinding back into motion.
Without that fear, the development cadence runs a lot smoother. Pull requests stop backing up. Your CI/CD is running your tests — it will halt if your tests fail. It will fail loudly, and point out what went wrong when it does.
And that has made all the difference.',
      'https://miro.medium.com/max/768/1*UTiUlRqw-jUb3JpoxHo69Q.jpeg',
      true
  ),
  (
    'https://www.freecodecamp.org/news/here-are-some-app-ideas-you-can-build-to-level-up-your-coding-skills-39618291f672/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more',
    'Here are some app ideas you can build to level up your coding skills',
    'Have you ever wanted to build something but you had no idea what to do? Just as authors sometimes have "writers block” it’s also true for developers. Together with my friend Jim we created a collection of application ideas which is intended to solve this issue once and for all! ?',
    'Have you ever wanted to build something but you had no idea what to do? Just as authors sometimes have “writer"' "s block” it’s also true for developers.

Together with my friend Jim we created a collection of application ideas which is intended to solve this issue once and for all! ?

These applications are:

great to improve your coding skills
great to experiment with new technologies
great to be added in your portfolio to impress your next employer/client
great to be used as examples in tutorials (articles or videos)
easy to complete and also easily extendable with new features
This is not just a simple list of projects, but a collection that describes each project in enough detail so you can develop it from the ground up!

Each project specification contains the following:

A clear and descriptive objective
A list of User Stories which should be implemented (these stories act more as a guideline than a forced list of To-Do’s. Feel free to add your own features if you want)
A list of bonus features that improve not only the base project but also your skills at the same time
All the resources and links to help you find what you need to complete the project
Projects
All of the projects are divided into three tiers based on the knowledge and experience required to complete them. These tiers are:

Beginner — Developers in the early stages of their learning journey. Those who are typically focused on creating user-facing applications.
Intermediate — Developers at an intermediate stage of learning and experience. They are comfortable in UI/UX, using development tools, and building apps that use API services.
Advanced — Developers who have all of the above, and are learning more advanced techniques like implementing BackEnd applications and Database services.
Below you’ll find 5 projects for each of the tiers (15 in total), but there are over 30 projects (at the moment) in this GitHub repository. Make sure you check it out as we are planning to add more projects in the future. You are welcome to help! (More about this in the Contributing section below ?)

1. Notes App
Tier: 1 — Beginner

Description: Create and store your notes for a later purpose!

User Stories
User can create a note
User can edit a note
User can delete a note
When closing the browser window the notes will be stored and when the User returns, the data will be retrieved
Bonus features
User can create and edit a note in Markdown format. On save it will convert Markdown to HTML
User can see the date when he created the note
Useful links and resources
localStorage
Markdown Guide
Marked — A markdown parser
Example project

2. Christmas Lights
Tier: 1 — Beginner

Description: The Christmas Lights application relies on your development talents to create a mesmerizing light display. Your task is to draw seven colored circles in a row and based on a timer change the intensity of each circle. When a circle is brightened its predecessor returns to its normal intensity.

This simulates the effect of a string of rippling lights, similar to the ones displayed during the Christmas Holidays.

User Stories
User can press a button to start and stop the display
User can change the interval of time controlling the change in intensity
Bonus features
User can select the color used to fill each circle
User can specify the intensity value
User can change the size of any circle in the row
User can specify the number of rows to be included in the display. From one to seven rows can be chosen
Useful links and resources
Sample Image
Adafruit LED Matrix
Example project

3. FlipImage
Tier: 1 — Beginner

Description: It’s important for Web Developers to understand the basics of manipulating images since rich web applications rely on images to add value to the user interface and user experience (UI/UX).

FlipImage explores one aspect of image manipulation — image rotation. This app displays a square panel containing a single image presented in a 2x2 matrix. Using a set of up, down, left, and right arrows adjacent to each of the images the user may flip them vertically or horizontally.

You must only use native HTML, CSS, and Javascript to implement this app. Image packages and libraries are not allowed.

User Stories
User can see a pane containing a single image repeated in a 2x2 matrix
User can flip any one of the images vertically or horizontally using a set of up, down, left, and right arrows next to the image
Bonus features
User can change the default image by entering the URL of a different image in an input field
User can display the new image by clicking a ‘Display’ button next to the input field
User can see an error message if the new images URL is not found
Useful links and resources
How to Flip an Image
Create a CSS Flipping Animation
Example project

4. Quiz App
Tier: 1 — Beginner

Description: Practice and test your knowledge by answering questions in a quiz application.

As a developer, you can create a quiz application for testing coding skills of other developers. (HTML, CSS, JavaScript, Python, PHP, etc…)

User Stories
User can start the quiz by pressing a button
User can see a question with 4 possible answers
After selecting an answer, display the next question to the User. Do this until the quiz is finished
In the end, the User can see the following statistics:
Time it took to finish the quiz
How many correct answers did he get
A message showing if he passed or failed the quiz
Bonus features
User can share the result of a quiz on social media
Add multiple quizzes to the application. User can select which one to take
User can create an account and have all the scores saved in his dashboard. User can complete a quiz multiple times
Useful links and resources
Open Trivia Database
Example projects

Quiz app built with React (wait for it to load as it is hosted on Heroku)

5. Roman Numeral to Decimal numbers Converter
Tier: 1 — Beginner

Description: The numeric system represented by Roman numerals originated in ancient Rome and remained the usual way of writing numbers throughout Europe well into the Late Middle Ages. Roman numerals, as used today, employ seven symbols, each with a fixed integer value.

See the below table the Symbol — Value pairs:

I — 1
V — 5
X — 10
L — 50
C — 100
D — 500
M — 1000
User Stories
User should be able to enter one Roman number in an input field
User could see the results in a single output field containing the decimal (base 10) equivalent of the roman number that was entered by pressing a button
If a wrong symbol is entered, the User should see an error
Bonus features
User could see the conversion to be made automatically as I type
User should be able to convert from decimal to Roman (vice-versa)
Useful links and resources
An explanation of Roman Numbers
Example project
Roman Number Converter

6. Book Finder App
Tier: 2 — Intermediate

Description: Create an application that will allow users to search for books by entering a query (Title, Author, etc). Display the resulting books in a list on the page with all the corresponding data.

User Stories
User can enter a search query into an input field
User can submit the query. This will call an API that will return an array of books with the corresponding data (Title, Author, Published Date, Picture, etc)
User can see the list of books appearing on the page
Bonus features
For each item in the list add a link that will send the User to an external site which has more information about the book
Implement a Responsive Design
Add loading animations
Useful links and resources
You can use the Google Books API

Example Project

BookSearch-React

7. Card-Memory-Game
Tier: 2 — Intermediate

Description: Card memory is a game where you have to click on a card to see what image is underneath it and try to find the matching image underneath the other cards.

User Stories
User can see a grid with n x n cards (n is an integer). All the cards are faced down initially (hidden state)
User can click a button to start the game. When this button is clicked, a timer will start
User can click on any card to unveil the image that is underneath it (change it to visible state). The image will be displayed until the user clicks on a 2nd card
When the User clicks on the 2nd card:

If there is a match, the 2 cards will be eliminated from the game (either hide/remove them or leave them in the visible state)
If there isn’t a match, the 2 cards will flip back to their original state (hiddenstate)
When all the matches have been found, the User can see a dialog box showing a Congratulations message with a counter displaying the time it took to finish the game
Bonus features
Use can choose between multiple levels of difficulty (Easy, Medium, Hard). Increased difficulty means: decreasing the time available to complete and/or increasing the number of cards
User can see the game statistics (nr. of times he won / he lost, the best time for each level)
Useful links and resources
Wikipedia
Example projects
Flip — card memory game

SMB3 Memory Card Game

8. Markdown Table Generator
Tier: 2 — Intermediate

Description: Create an application that will convert a regular table with data provided by the User (optionally) into a Markdown formatted table.

User Stories
User can create an HTML table with a given number of Rows and Columns
User can insert text in each cell of the HTML table
User can generate a Markdown formatted table that will contain the data from the HTML table
User can preview the Markdown formatted table
Bonus features
User can copy the Markdown formatted table to the clipboard by pressing a button
User can insert a new Row or Column to a specified location
User can delete a Row or a Column entirely
User can align (to the left, right or center) a cell, a column, a row, or the entire table
Useful links and resources
Markdown Guide
Marked — A markdown parser
How to Copy to Clipboard
Example project
Tables Generator / Markdown Tables

9. String Art
Tier: 2 — Intermediate

Description: The purpose of String Art is to provide the developer with practice creating a simple animated graphic, using geometry in the animation algorithm, and creating something that’s visually pleasant to watch.

String Art draws a single multicolored line which smoothly moves until one end touches a side of the enclosing window. At the point, it touches a “bounce” effect is applied to change its direction.

A ripple effect is created by only retaining 10–20 images of the line as it moves. Older images are progressively faded until they disappear.

Animation libraries are not allowed. Use only Vanilla HTML/CSS/JavaScript.

User Stories
Start by drawing a multicolored line at a random position within the boundary of it’s enclosing window
Each 20 ms draw a new copy of the line at a new position based on a trajectory — the incremental distance from the previous line based on the endpoints
When either endpoint of the line touches the boundary of the enclosing window change it’s direction and randomly alter its angle
Progressively fade the intensity of old lines so that only the most recent 10–20 lines are visible to create the sense of movement or “ripple”
Bonus features
User can specify the length of the line and its velocity
User can specify the multiple lines within the window, all moving along different trajectories and velocities
Useful links and resources
Using Multistep Animations & Transitions
Animation Basics
Example project
This project is very close, but has a small enclosing window and is monochromatic. Daniel Cortes

10. To-Do App
Tier: 2 — Intermediate

Description: The classic To-Do application where a user can write down all the things he wants to accomplish.

User Stories
User can see an input field where he can type in a to-do item
By pressing enter (or a button), the User can submit the to-do item and can see that being added to a list of to-do’s
User can mark a to-do as completed
User can remove a to-do item by pressing on a button (or on the to-do item itself)
Bonus features
User can edit a to-do
User can see a list with all the completed to-do’s
User can see a list with all the active to-do’s
User can see the date when he created the to-do
When closing the browser window the to-do’s will be stored and when the User returns, the data will be retrieved
Useful links and resources
localStorage
Example projects

Todo App built with React

11. Battleship Game Engine
Tier: 3 — Advanced

Description: Battleship Game Engine (BGE) implements the classic turn-based board game as a package that’s separated from any presentation layer. This is a type of architectural pattern that useful in many application since it allows any number of apps to utilize the same service.

The BGE itself is invoked through a series of function calls rather than through directly coupled end-user actions. In this respect using the BGE is similar to using an API or a series of routes exposed by a web server.

This challenge requires that you develop the BGE and a very thin, text-based presentation layer for testing that’s separate from the engine itself. Due to this, the User Stories below are divided two sets — one for the BGE and one for the text-based presentation layer.

BGE is responsible for maintaining the game state.

User Stories
BGE
Caller can invoke a startGame() function to begin a 1-player game. This function will generate an 8x8 game board consisting of 3 ships having a width of one square and a length of:
Destroyer: 2 squares
Cruiser: 3 squares
Battleship: 4 squares
startGame() will randomly place these ships on the board in any direction and will return an array representing ship placement.

Caller can invoke a shoot() function passing the target row and column coordinates of the targeted cell on the game board. shoot() will return indicators representing if the shot resulted in a hit or miss, the number of ships left (i.e. not yet sunk), the ship placement array, and updated hits and misses array.
Cells in the hits and misses array will contain a space if they have yet to be targeted, O if they were targeted but no part of a ship was at that location, or Xif the cell was occupied by part of a ship.

Text-based Presentation Layer
User can see the hits and misses array displayed as a 2-dimensional character representation of the game board returned by the startGame() function.
User can be prompted to enter the coordinates of a target square on the game board.
User can see an updated hits and misses array display after taking a shot.
User can see a message after each shot indicating whether the shot resulted in a hit or miss.
User can see a congratulations message after the shot that sinks the last remaining ship.
User can be prompted to play again at the end of each game. Declining to play again stops the game.
Bonus features
BGE
Caller can specify the number of rows and columns in the game board as a parameter to the startGame() function.
Caller can invoke a gameStats() function that returns a Javascript object containing metrics for the current game. For example, the number of turns played, the current number of hits and misses, etc.
Caller can specify the number of players (1 or 2) when calling startGame()which will generate one board for each player randomly populated with ships.
shoot() will accept the player number the shot is being made for along with the coordinates of the shot. The data it returns will be for that player.

Text-based Presentation Layer
User can see the current game statics at any point by entering the phrase stats in place of target coordinates. (Note that this requires the gameStats()function in the BGE)
User can specify a two-player game is to be played, with each player alternating turns in the same terminal session (Note that this requires corresponding Bonus Features in the BGE)
User can see the player number in prompts associated with the inputs in each turn.
User can see both players board at the end of each turn.
Useful links and resources
Battleship Game (Wikipedia)
Battleship Game Rules (Hasbro)
Example projects
This YouTube video shows how a text-based Battleship Game is played.

The following example is provided as a demonstration of the Battleship game if it is unfamiliar to you. Remember you are to implement a text-based presentation layer for testing. Battleship Game by Chris Brody

12. Chat App
Tier: 3 — Advanced

Description: Real-time chat interface where multiple users can interact with each other by sending messages.

As an MVP(Minimum Viable Product) you can focus on building the Chat interface. Real-time functionality can be added later (the bonus features).

User Stories
User is prompted to enter a username when he visits the chat app. The username will be stored in the application
User can see an input field where he can type a new message
By pressing the enter key or by clicking on the send button the text will be displayed in the chat box alongside his username (e.g. John Doe: Hello World!)
Bonus features
The messages will be visible to all the Users that are in the chat app (using WebSockets)
When a new User joins the chat, a message is displayed to all the existing Users
Messages are saved in a database
User can send images, videos, and links which will be displayed properly
User can select and send an emoji
Users can chat in private
Users can join channels on specific topics
Useful links and resources
Socket.io
How to build a React.js chat app in 10 minutes — article

Example project

Chatty2

13. GitHub Timeline
Tier: 3 — Advanced

Description: API’s and graphical representation of information are hallmarks of modern web applications. GitHub Timeline combines the two to create a visual history of a users GitHub activity.

The goal of GitHub Timeline is to accept a GitHub user name and produce a timeline containing each repo and annotated with the repo names, the date they were created, and their descriptions. The timeline should be one that could be shared with a prospective employer. It should be easy to read and make effective use of color and typography.

Only public GitHub repos should be displayed.

User Stories
User can enter a GitHub user name
User can click a ‘Generate’ button to create and display the named user" '"s repo timeline
User can see a warning message if the GitHub user name is not a valid GitHub user name.
Bonus features
User can see a summary of the number of repos tallied by the year they were created
Useful links and resources
GitHub offers two API’s you may use to access repo data. You may also choose to use an NPM package to access the GitHub API.

Documentation for the GitHub API can be found at:

GitHub REST API V3
GitHub GraphQL API V4
Sample code showing how to use the GitHub API’s are:

You can use this CURL command to see the JSON returned by the V3 REST API for your repos:

curl -u "user-id" https://api.github.com/users/user-id/repos
Example projects


14. Spell-It
Tier: 3 — Advanced

Description: Knowing how to spell is a fundamental part of being fluent in any language. Whether you are a youngster learning how to spell or an individual learning a new language being able to practice helps to solidify your language skills.

The Spell-It app helps users practice their spelling by playing the audio recording of a word the user must then spell using the computer keyboard.

User Stories
User can click the ‘Play’ button to hear the word that’s to be entered
User can see letters displayed in the word input text box as they are entered on the keyboard
User can click the ‘Enter’ button to submit the word that has been typed in the word input text box
User can see a confirmation message when the correct word is typed
User can see a message requesting the word be typed again when it is spelled incorrectly
User can see a tally of the number of correct spellings, the total number of words attempted, and a percentage of successful entries.
Bonus features
User can hear a confirmation sound when the word is correctly spelled
User can hear a warning sound when the word is incorrectly spelled
User can click the ‘Hint’ button to highlight the incorrect letters in the word input text box
User can press the ‘Enter’ key on the keyboard to submit a typed word or click the ‘Enter’ button in the app window
Useful links and resources
Texas Instruments Speak and Spell
Web Audio API
Click and Speak
Example projects
Word Wizard for iOS

Speak N Spell on Google Play

15. Survey App
Tier: 3 — Advanced

Description: Surveys are a valuable part of any developers toolbox. They are useful for getting feedback from your users on a variety of topics including application satisfaction, requirements, upcoming needs, issues, priorities, and just plain aggravations to name a few.

The Survey app gives you the opportunity to learn by developing a full-featured app that will you can add to your toolbox. It provides the ability to define a survey, allow users to respond within a predefined timeframe, and tabulate and present results.

Users of this app are divided into two distinct roles, each having different requirements:

Survey Coordinators define and conduct surveys. This is an administrative function not available to normal users.
Survey Respondents Complete surveys and view results. They have no administrative privileges within the app.
Commercial survey tools include distribution functionality that mass emails surveys to Survey Respondents. For simplicity, this app assumes that surveys open for responses will be accessed from the app’s web page.

User Stories
General
Survey Coordinators and Survey Respondents can define, conduct, and view surveys and survey results from a common website
Survey Coordinators can login to the app to access administrative functions, like defining a survey.
Defining a Survey
Survey Coordinator can define a survey containing 1–10 multiple choice questions.
Survey Coordinator can define 1–5 mutually exclusive selections to each question.
Survey Coordinator can enter a title for the survey.
Survey Coordinator can click a ‘Cancel’ button to return to the home page without saving the survey.
Survey Coordinator can click a ‘Save’ button to save a survey.
Conducting a Survey
Survey Coordinator can open a survey by selecting a survey from a list of previously defined surveys
Survey Coordinators can close a survey by selecting it from a list of open surveys
Survey Respondent can complete a survey by selecting it from a list of open surveys
Survey Respondent can select responses to survey questions by clicking on a checkbox
Survey Respondents can see that a previously selected response will automatically be unchecked if a different response is clicked.
Survey Respondents can click a ‘Cancel’ button to return to the home page without submitting the survey.
Survey Respondents can click a ‘Submit’ button submit their responses to the survey.
Survey Respondents can see an error message if ‘Submit’ is clicked, but not all questions have been responded to.
Viewing Survey Results
Survey Coordinators and Survey Respondents can select the survey to display from a list of closed surveys
Survey Coordinators and Survey Respondents can view survey results as in tabular format showing the number of responses for each of the possible selections to the questions.
Bonus features
Survey Respondents can create a unique account in the app
Survey Respondents can login to the app
Survey Respondents cannot complete the same survey more than once
Survey Coordinators and Survey Respondents can view graphical representations of survey results (e.g. pie, bar, column, etc. charts)
Useful links and resources
Libraries for building surveys: SurveyJS

Some commercial survey services include: Survey Monkey and Typeform',
    'https://cdn-media-1.freecodecamp.org/images/0*v3qXmKe1LTiiW_3H.png',
    false
  ),
  (
    'https://www.smashingmagazine.com/2019/11/exploring-new-ways-manage-content-wordpress/',
    'Exploring New Ways To Manage Content In WordPress',
    'The combination of WordPress"’" versatility for managing data (since its database model supports the creation of different content models, easily extensible through meta attributes) and Gutenberg"’"s rich user interactions provide a powerful mechanism to create, edit and manage content.

In this article, I want to shine some light on these upgraded capabilities, exploring the new tools at our disposition and presenting several new ones to be released sometime in the future.',
    'The combination of WordPress"’" versatility for managing data (since its database model supports the creation of different content models, easily extensible through meta attributes) and Gutenberg"’"s rich user interactions provide a powerful mechanism to create, edit and manage content.

In this article, I want to shine some light on these upgraded capabilities, exploring the new tools at our disposition and presenting several new ones to be released sometime in the future.

Existing Features
The following features are already part of Gutenberg-powered WordPress.

CREATE ONCE, PUBLISH EVERYWHERE
As I have described in my recent article “Create Once, Publish Everywhere” with WordPress, the block-based nature of Gutenberg enables it to enhance how content is organized/architected on the database, making it available on a granular basis (block by block) to any application running on any medium or platform (web, email, iOS/Android apps, VR/AR, home assistants, and so on). Content managed through Gutenberg can then become the single source of truth for all of our applications, allowing us to reduce the cost associated with re-formatting content to make it suitable for each required platform.

COPY/PASTE FROM GOOGLE DOCS WITH (ALMOST) PERFECT FORMATTING
Whenever we need to collaborate with other people to create content, we will quite likely use online tools such as Google Docs, Dropbox Paper, Coda or others. These tools make it easy for different people to edit the content in a document concurrently and provide and incorporate feedback. If we are going to choose a Content Management System to store our content, we need to make sure that it works well with these tools.

The web is full of interfaces that leave people out. We can fix it. Meet Inclusive Components, our new practical book for building accessible and robust interfaces. From accordions, tables and tabs to buttons, notifications and modals — all in one book. Written by Heydon Pickering.

Check table of contents &#8620;
Feature Panel
Gutenberg does the job fairly well: When copying the content from a Google Doc and then pasting it into a Gutenberg blog post, the formatting is preserved, bullet lists are properly transformed to the list block, and images are inserted where they should. There may be a few inconsistencies (for instance different spacing across blocks and in the original document) however, for the most part, the process is fit for use.

Copy/pasting from GDoc to Gutenberg
Copy/pasting from GDoc preserves the format of the document. (Large preview)
CRAFTING ART DIRECTION
Several Gutenberg blocks support creating distinctive and engaging layouts and assisting the art direction of the site, to give it more personality and emphasize its identity. This way, even though we may base the site on a standard, plain-looking WordPress theme, we can customize the content’s appearance to make it stick out from the sea of sameness out there on the web. Let’s explore some of these blocks.

The Shape divider block allows to insert dividers in between two blocks. We can choose one among several basic shapes and customize its width, proportions and colors and then, with a bit of resourcefulness, create more intrinsic patterns from it. For instance, the divider below was created by first creating and customizing a divider, then flipping it both vertically and horizontally to mirror itself, then grouping these 2 halves so we can use it as a single unit (the grouping functionality will be available in core through the release of WordPress 5.3 next week, and is currently available through the Gutenberg plugin), and finally saving the grouped block as a reusable block so it can be used everywhere across the whole site:

Shape divider block
The shape divider block connects, or breaks apart, components. (Large preview)
The Advanced columns and Row layout blocks allow to create row-based layouts, inside of which we can place nested blocks (i.e. any other Gutenberg block). They are highly configurable: They offer to define how many columns the row must have, with what padding, margin and proportion of width for each column, setting an image or custom color in the background, and several other attributes.

Row layout block
The row layout block allows to easily configure the proportion of width among columns. (Large preview)
We can also create grid-based layouts with predefined content. For instance, through the Post grid, Post carousel and Post masonry blocks we can display a list of posts in different ways, defining what attributes from each post to show (title, date, excerpt, author, and so on), and through the Advanced gallery block we can create beautiful image galleries.

Advanced gallery block
Masonry gallery created with Advanced gallery block. (Large preview)
Some other blocks, such as Feature grid, allow to create grid layouts with predefined templates filled with custom content.

Feature grid block
The feature grid block enables to add custom content inside of a grid layout. (Large preview)
These are just a sample of those blocks which can help us fill the content with visually attractive layouts and craft the art direction of our sites. To keep exploring possibilities, we can head to the directory of plugins offering blocks and check these out.

ASSISTING THE USER WHILE EDITING CONTENT
Gutenberg assists the user when creating content through the following features:

Real-Time Preview
The Gutenberg editor gives a relatively accurate preview of how the content will look like in the website.

Error Warnings
Gutenberg makes the content creator be aware of accessibility concerns. For instance, if our content structure jumps from an <h2> header to an <h4> one without adding an <h3> tag in between, Gutenberg provides a warning message about this potential error. Similarly, when setting up the color of some text against its background color, if the contrast between the two colors is not clear enough then Gutenberg provides a warning message and helps fix the problem.

Suggesting/Executing Improvements
Blocks can connect to third-party services to analyze content and enhance it. For instance, a service could suggest how to improve the grammar of the content, provide alternative titles and tags for a better SEO, and even automatically translate the content to another language, as done by this plugin which automatically translates from English to Hindi as the user types.

New Features Under Implementation
The following features will hopefully/eventually be coming to Gutenberg in the future.

SNAP TO GRID WHEN RESIZING IMAGES
Contributors are already working on adding a grid system to Gutenberg which will, among other things, enable to resize images in an assisted manner by snapping it to the grid:

Installing a block from within Gutenberg
Snapping an image to grid (image from the GitHub issue). (Large preview)
INLINE INSTALLATION OF BLOCKS
Sometimes, while we are writing a blog post, we find out that we need some functionality that we don’t have yet installed. Hence, we need to switch to the Plugins screen, search and install the corresponding plugin, and then go back to the blog post. This process adds friction to our content-writing workflow.

Wouldn’t it be nicer if we could install the required functionality right from within the editor itself, whenever we need to use it? Well, this proposal is already being implemented through this pull request (it first depends on blocks being installed on their own, i.e. without depending on being shipped through a plugin). Once merged, our content-writing workflow will not be impaired anymore, as visible in the mockup below.

Installing a block from within Gutenberg
Installing a block from within Gutenberg (image from the GitHub pull request). (Large preview)
Installing blocks directly from the editor could lead to unintended bloat, from making it too easy for the user to install blocks. To address this issue, after installing and using it, the block could be removed! This was not possible before Gutenberg, because if the plugin providing a shortcode (which was the way to render dynamic content inside the blog post before Gutenberg) was disabled, then the invocation of the shortcode would be rendered in the blog post (instead of the shortcode’s output), messing up our content. However, Gutenberg works differently: Blocks only save HTML content inside of the blog post (including HTML comments to store configuration attributes), so, if the block is disabled, its intended HTML output is still part of the blog post’s content. (Even though there may be problems if the block needs to load CSS assets which are not loaded anymore once the block is disabled. I am not aware how this issue will be handled.)

PAGE/SITE BUILDER
Currently Gutenberg can only be used for the creation of content inside a blog post or a page, however it will soon support the creation of any part of the website: Content-block areas can define the header, sidebars, footer or any section needed for our layouts. Automattic (the company behind WordPress.com) is already working on a plugin to add full site editing capabilities to its WordPress.com product, which should eventually be extensible to the open source WordPress software too.

Creating a new page with full site editing enabled
Creating a new page with full site editing allows to select a page template. (Large preview)
REAL-TIME COLLABORATION
Google Docs is incredibly useful to teams because it enables their members to work on the same document at the same time. Sometime in the future, Gutenberg will also incorporate a mechanism for real-time collaboration, allowing different people to work on the same blog post at the same time. This mechanism will (at least initially) be based on giving editing-locks to users on a block-by-block basis, as shown in the mockup image below.

Real-time collaboration through Gutenberg
Real-time collaboration through Gutenberg (image from the GitHub issue). (Large preview)
This feature will be particularly useful to online magazines (such as the New York Times and the like) since they may already have teams collaborating on a story (for instance, designers dealing with images, journalists, proofreaders and editors dealing with content, and others). Having real-time collaboration tools will enable these magazines to speed up their content-creation workflows and publish their articles faster.

TRANSLATION
WordPress core has never added support to translate content (it only supports translation of strings inside of core, plugin and theme files), but instead left this responsibility to plugins. Through Gutenberg, WordPress will finally add native support for this feature.

Translation is not a priority yet, so it has been targeted for Gutenberg phase 4, expected in the year 2020+. Since it is a long way off, there are yet no technical considerations of its implementation or mockups of its intended user experience. So we can only guess how it will be. Since it will be implemented after the real-time collaboration feature (described above), I would expect it will enable different people to translate the same blog post to different languages at the same time, block by block.

INLINE MEDIA EDITING
Through the Media Library, WordPress already provides some image editing capabilities: resizing, cropping, rotating and flipping. These capabilities are very basic, and they are applied on to the image on a different screen, which creates some friction to the process of fitting the image into the blog post.

Through Gutenberg, the media-editing experience could be greatly enhanced: One one side, it could support editing the image in more advanced ways, such as applying effects or filters, altering the contrast, replacing colors, adding text as watermark, adding transparent regions, converting it to different formats, and others (for instance, Cloudinary provides an API to apply many transformations to an image, which could be perfectly accessed by a block). On the other side, the editing could happen inline, right where the image is placed inside the blog post. Then, for instance, if the image was added as an overlay against some background, and we add transparent regions to the image, we can visualize in real-time how the composite result looks like.

(I haven’t found any proposal to tackle this issue in Gutenberg’s GitHub repo, but I learned about this idea talking to some core contributors, who expected to be able to work on it some time in the future.)

Conclusion
Already being the most popular CMS (close to 35% of the web), WordPress has also the chance to offer the most compelling tools to manipulate content. This is because Gutenberg offers an appealing mechanism to create, edit and manage content: A single interface, simple to use, fairly powerful and versatile. With its new content management capabilities, WordPress can become the single source of truth of all our content, to power all our applications (websites, newsletters, apps, and so on) through APIs. Kudos to that!',
    'https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_1600/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/95cc313a-b4d1-49a7-aebf-6f636ba4101c/advanced-gallery-block.jpg',
     true
  )
