# React-Native Mobile App Showing Current Exchange Rates

## Server Side
We are going to test the application with an online server and make it work for both client and server side. So I decided to use Microsoft Azure in order to have free online test environment.

**Node.js**\
Node.js is an open source, server-side, and runtime environment for
networked applications. I had to use Node.js in order to create Azure
node.js server. 

**NPM**\
Npm is a package management system developed for the JavaScript. It
mostly used with Node.js in order to improve it and NPMs enables new
features in its packages.
As I mentioned before, developing this mobile application, we need to
create a online service in order to update ‘exchange rates’ that user
have. First thing, as we will be communicating with our
clients, we need to download and install all necessary ‘Node.js’ files.\
We can download Node.js easily with its website.
![](https://wsvincent.com/assets/images/install-node-npm-windows/img1.png)

What we need is an ‘App Service’. First, we need to create a resources in our Azure account. Let’s create it with this command;\
 az  group  create  --name  myResourceUTKU  --location  "South  Central  US"  
 ----image----
 We created our resource
 
Next thing is we need to indicate our service plan to Azure. We need to choose FREE plan.\
Let’s use this command:\
az appservice plan create --name myPlanUTKU --resource-group myResourceUTKU --sku FREE\
--image--
Our service plan output is like this

So that, as Azure knows our service plan now, we can create Web App and give its name:\
az webapp create --resource-group myResourceUTKU --plan myPlanUTKU --name AlternatifbankServer\
--image--
We have successfully created our app service

As we created our app service with the host name ‘AlternatifbankServer.azurewebsites.net’, now we can set our Node.js runtime to 10.14.1.\
az webapp config appsettings set --resource-group myResourceUTKU --name AlternatifbankServer --settings WEBSITE_NODE_DEFAULT_VERSION=10.14.1\
--image--

Our configuration and settings are done. Now, you can test your new web service if it’s running or not by simply clicking to URL\,
--image--
We can also manage our resources

Our web service useless right now, we need to add necessary codes to back-end. Without writing any code, let’s see how can we do that. We need to go for deploy part.\
--image--
Then choose deploy zip
--image--

From here, we can upload ZIP files with drag and drop OR we can
simply add file one by one and edit the content of these files manually
just by clicking the ‘pencil’ symbol.

So let’s start to code our back-end now. Firstly, let’s create a file to name
‘Server’ to install all npm and necessary files. Visual Studio Code's allows us to use powershell. So I use ‘NPM init’ command to create package.json file in our Server folder.\
--image--
Package.json file created

We also need express library in our project. So let’s work ‘npm install express –save’ command in our powershell\
--image--
We also need to install socket.io in our Node.js project.
--image--

After we done with all our packages, we can now start coding!\
In my socket server, I have created express and socket IO library configurations, with creating variables express, app, server and io.\
After that I have redirect requests from the home directory to index.html. So let’s see what is going on that index.html 
--image--

In java script part, I have created necessary variables. Buttons and input variables are just to keep data if button is clicked and input means what we added as a new value. For socket, we are pushing data to our clients with connection to socket server.
--image--

‘updateDolar, updateEuro, updateBitcoin are names of our server-client channel names. As I created these channels in Index.js file, with these way we are communicating between our clients and server via these different channels. Each channel has its own values and sending one specific data. In my case;\
updateDolar channel -> send new DOLAR RATE\
updateEuro channel -> send old DOLAR RATE\
updateBitcoin channel -> send new EURO RATE\
OldDolar channel -> send old EURO RATE\
OldEuro channel -> send new BITCOIN RATE\
OldBitcoin channel -> send old BITCOIN RATE\
The reason why I am taking both new and old both data is, I am checking both of the data and if there is increase in any rate, pushing this data to client IN BLUE color and if there is a decrease in any rate, I am showing them to client IN RED color.\
To clarify everything, this is my Index.html file.\
There is also a ‘yorum’ channel, which clients can push data to our server and it will be shown in ‘comments’ window.\
Now as we are done with this part, we can move to our client side coding.\

**React Native**
React native is an open source mobile application framework created by Facebook. It enables many different useful features for developers, open source, free and supports both Android and IOs systems.\
So I have used react native to develop my client side mobile application as my company requested. So it’s time to explain how did I accomplished this with steps.\
First we need to create an empty react native project with command ‘react-native init {ProjectName}’.\
Let’s say our project name is ‘ClientSide’. All react-native components will be installed in this folder.\
--image--
We can see our project is being created
--image--
As we created the project, we can see our necessary react native components came in to our ClientSide folder.\

Before we test if our react native project will work, first we need to have an emulator to test our mobile application. To do that, we will use Android Studio as I designed my project for Android.\
**Android Studio**
Android Studio, the official integrated development environment for Android. It is free and user-friendly. That’s why I decided to download android studio. However, I didn’t create emulator, instead, I connected my mobile phone and configured it with android studio to make it testable for my react-native project.\
--image--
Here my mobile device (Huawei fig-lx1) has been detected by android studio.\

Now as device is ready, we can test our device if it’s working or not by just writing ‘react-native run-android’\
--image--
 A screenshot of my mobile device what occurred after the loading operation\
 
 **Client Side**
 As we successfully configured our mobile device with react native project, now, we can start coding our client.\
Firstly, we need to install socket IO application’s client library as we need clients:\
npm i socket.io-client\
As I added to some table component to my application in order to make it looking good, you can add this library if you wish by this command: \
npm install react-native-table-component\

**App.js**
Now let’s look at our App.js file in Client folder and modify it with our design. First, we import every component we need, such as Table, Row, Image, Textinput, TouchableOpacity etc …\
After that, we initialize our default Dollar, Euro and Bit coin rates. I put symobolic values, you can change them; (Dolar:5.13, Euro:612, bitcoin:9000)\
Then, we simply create a connection with our web server in order to get data\
--image--
Here we see our connection with socket IO server\
Then, we define channels to get which data from which. As we discussed before, each exchange rate has its own channel to get data. We also have ‘comment’ channel to send comments to our server web page.\
--image--
We can see our functions will be working when there is a new data coming from server\

Finally, we need to render our data and show it to users …\
Before every return function, I put 4 very simple ‘IF’ statement to control if our data will be shown in ‘RED’ (decrease) or in ‘BLUE’ (increase). In order to do that, I simply compared ‘old’ values and ‘new’ values that we just received from the server. In my all tests, it worked fine.\
In render functions, I put the same code except the colors. At the beginning of render, I put an image from a website (logo of
the company) to have a beautiful design which is required. Then I put table and show exchange rates in these data tables. At the
end, I put ‘touchable area’ and text input area in order to get comments from user. Logic is, users can write comment easily
in this area and then just touch to ‘send comment’ button and function will be triggered and comments will be received to our server via the channel.\
--image--
**Test**
That is pretty much we could do. Now, let’s move to the fun part! We should test if our application is working or not!\
--image--
Initial page when we open the app for the first time.\

Now let’s modify our values from our Index.html web page\
(https://alternatifbankserver.azurewebsites.net/)
--image--
--image--
We received. As euro decreases, it shows in red color. We can also try if our comment will receive to server. Lets send a comment 'this app sucks'\
--image--
Our mobile application works successfully.\

## You can find all the working files in this repository and use freely.

















 
