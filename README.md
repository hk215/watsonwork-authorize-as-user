# Run-as-user

A React sample for creating an application that acts on behalf of a user using the Watson Work Services.

The Watson Work Services platform provides **spaces** for people to exchange
**messages** in conversations. This sample app shows how to create an application that acts on behalf of a user. It also demonstrates how to authenticate an application and obtain the OAuth token needed to make Watson Work API calls.

See [Prepare your App to run](https://developer.watsonwork.ibm.com/docs#prepare-your-app-to-run) for more details.


## Try it out

To try the sample app do the following:

### Registering the app

In your Web browser, go to [Watson Work Services - Apps](https://workspace.ibm.com/developer/apps), add a new app and add the url of the server you will be running this application from https://www.example.com/callback. Make sure the /callback is included in this url. Next write down its app id and app secret.


### Building the app

Install Node.js 6+.

In a terminal window, do the following:
```sh

# Get the code
git clone https://github.ibm.com/gilesk/run-as-user.git

# Install dependencies
npm install


# run server
HTTPS=true npm start
```

### Using the app
Once you start the server you will be presented with a form that will step you through the process of authenticating you and the application and at the end will allow you to create a messasge using this application that will then post to a space of your choice.

### Apps acting on behalf of a user
An app wishing to request access to act on behalf of a user will be able to do so if the app is published, shared with the user or if the user accessing the app is the owner of the app. Otherwise, the app will not be able to authenticate as the user

### Application Flow
* Give application access to your account so it can act on your behalf.
* Use the *Code* attribute that is return from server to create a token request that will authenticate your application.
* Select a space to post you message.
* Enter message
* Submit message to space.
