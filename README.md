# dragdrop

This was a test project to take a look at some angular functionality. For a drag drop feature.

Served from node. Non-component based file structure. Just a little play test.

The angular stuff is in `/public/javascripts`.

# How to use

`npm install; bower install;`

`mondgod`

In a separate terminal populate the database:

`mongo`, in mongo do:

`db.createCollection('pages')`
`db.pages.insert({fields: [], page_number: 1})` (note: you can give a background image if you'd like, add `background: <some url>` to that query)

Once populated do:

`nodemon`

open browser on `localhost:3000`

TODO:

+ clear up console.logs and update this.
