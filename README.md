# README
- Go to your project folder
* Database creation
  - Run `rake db:create` and `rake db:migrate`
  After creating DB run `yarn install` to install all packages
  
* To run server
  - Run `rails server -p 3000` to run rails Server
  - Run `./bin/webpack-dev-server` to run react server
  - Goto `http://localhost:3000` on your web browser

Heroku URL: https://seating-manager.herokuapp.com/


Code challenge

Best Available Seat

Write a solution to return the best seat (closest to the front & middle) given a list of open seats. Rows follow alphabetical order with "a" being the first row. Columns follow numerical order from left to right.

The list of open seats, number of rows and columns (seats) is based on a JSON input.

{

    "venue": {

        "layout": {

            "rows": 10,

            "columns": 50

        }

    },

    "seats": {

        "a1": {

            "id": "a1",

            "row": "a",

            "column": 1,

            "status": "AVAILABLE"

        },

        "b5": {

            "id": "b5",

            "row": "b",

            "column": 5,

            "status": "AVAILABLE"

        },

        "h7": {

            "id": "h7",

            "row": "h",

            "column": 7,

            "status": "AVAILABLE"

        }

    }

}

The solution should find the best open seat (closest to the front & middle) given the input JSON and number of requested seats. Imagine a concert, people want to be as close as possible to the stage.

For example, for a venue with 10 rows and 12 columns with all seats open, the best seat would be A6.

If a group of seats is requested, the algorithm needs to find the best open group of seats together. In the example above, for 3 seats, it would be A5, A6, and A7.

For 5 columns and 2 requested seats the best open seats - assuming the first row A is fully occupied and the second row B is fully open, would be B2 and B3.

Start by a single seat request (not a group of seats together)
The app should have automated tests
The app needs a README.md explaining the app and steps to run it locally
Script or Rails app (see Bonus) for manual testing the implementation
Bonus

Rails app for testing out the solution
React for the interface
Movie catalog

CRUD using Ruby on Rails
I movie must have a title, summary, year and genre, with optional IMDb link.
The app must allow inserting movies and listing movies. Optional: edit/remove.
There's no login requirement
The app must be in GitHub with a README.md explaining the app and steps to run it locally
Bonus point: deploy the app to Heroku