# act-as-user

A React sample for creating an application that acts on behalf of a user using the Watson Work Services.

The Watson Work platform provides **spaces** for people to exchange
**messages** in conversations. This sample app shows how to create an application that acts on behalf of a user. It also demonstrates how to authenticate an application and obtain the OAuth token needed to make Watson Work API calls.


## Try it out

To try the sample app do the following:

### Registering the app

In your Web browser, go to [Watson Work Services - Apps](https://workspace.ibm.com/developer/apps), add a new app and add the url of the server you will be running this application from https://www.example.com/callback. Make sure the /callback is included in this url. Next write down its app id and app secret.

### Building the app

Install Node.js 6+.

In a terminal window, do the following:
```sh

# Get the code
git clone https://github.ibm.com/gilesk/act-as-user.git

# Install dependencies
npm install


# run server
HTTPS=true npm start
```

### Using the app
Once you start the server you will be presented with a form that will step you through the process of authenticating you and the application and at the end will allow you to create a messasge using this application that will then post to a space of your choice.

### Application Flow
* Give application access to your account so it can act on your behalf.
* Use the *Code* attribute that is return from server to create a token request that will authenticate your application.
* Select a space to post you message.
* Enter message
* Submit message to space.
