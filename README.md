## ∙Full stack note tacking app∙

the Front end is written in **TypeScript** using **React**.
the Back end is written in **JavaScript** using **NodeJs** and **ExpressJs**.

#### Live links:

https://rznotes.netlify.app/ <-front end
https://rnotesserver.in/ <-back end reroute to an AWS server

#### To run the front end locally :<br  />

```
npm install
npm start
```

inside the root directory. Requires NodeJs 14 or higher.

#### To run the back end locally :<br  />

```
npm install
npm start
```

inside the serverapp directory. Requires NodeJs 14 or higher.
The server will not run without a 'credentials.env',<br  /> which should have the following structure

```javascript
USRNM = "yourusername";
PSWD = "yourpassword";
```

To actually work, it also needs a proper MongoDb cluster,
referenced on line 12 in the 'server.js' file. Editing that line and the .env file should be enough to get the back end to work.
MongoDb setup is outisde the scope of this readme file.

#### About:

The Front end app and a NodeJs server, for storing note data on MongoDb grouped by category.
Live version of the front end hosted on Netlify, back end hosted on AWS, MongoDb hosted on Atlas.
