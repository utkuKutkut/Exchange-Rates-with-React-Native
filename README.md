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

![](https://wsvincent.com/assets/images/install-node-npm-windows/img1.png) <br><br>
Now, lets create a free account on microsoft azure. To make it fast and easy, we use azure bash<br><br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/react3.png)\
<br>
What we need is an ‘App Service’. First, we need to create a resources in our Azure account. Let’s create it with this command;\
 az  group  create  --name  myResourceUTKU  --location  "South  Central  US"
 <br>
![]( https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/react4.png)
 <br>**We created our resource**
 
Next thing is we need to indicate our service plan to Azure. We need to choose FREE plan.\
Let’s use this command:\
az appservice plan create --name myPlanUTKU --resource-group myResourceUTKU --sku FREE\
<br>
![]( https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/pic5.png)
<br>
**Our service plan output is like this** \
<br>
So that, as Azure knows our service plan now, we can create Web App and give its name:\
az webapp create --resource-group myResourceUTKU --plan myPlanUTKU --name exchange-rates\
<br>
![]( https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/pic6.png)
**We have successfully created our app service** \
<br>
As we created our app service with the host name ‘exchange-rates.azurewebsites.net’, now we can set our Node.js runtime to 10.14.1.\
az webapp config appsettings set --resource-group myResourceUTKU --name exchange-rates --settings WEBSITE_NODE_DEFAULT_VERSION=10.14.1\
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/pic7.png)
<br><br>
Our configuration and settings are done. Now, you can test your new web service if it’s running or not by simply clicking to URL\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/pic9.png)
**We can also manage our resources** \
<br>
Our web service useless right now, we need to add necessary codes to back-end. Without writing any code, let’s see how can we do that. We need to go for deploy part. Select advanced tools\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/react6.png)
<br><br>
As I use KUDU for deployment my files to the server,I choose ZIP push deploy\
<br><br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/react8.png)
<br><br>
From here, we can upload ZIP files with drag and drop OR we can simply add file one by one and edit the content of these files manually just by clicking the ‘pencil’ symbol.
<br><br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/kudu.png)
<br><br>
So let’s start to code our back-end now. Firstly, let’s create a file name ‘Server’ to install all npm and necessary files. I use Visual Studio Code as it allows us to use powershell. So I use ‘NPM init’ command to create package.json file in our Server folder.\
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/react.png)
**Package.json file created** \
<br><br>
We also need express library in our project. So let’s work ‘npm install express –-save’ command in our powershell\
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/express.png)
<br><br>
We also need to install socket.io in our Node.js project.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/socket.io.png)
<br><br>
After we done with all our packages, we can now start coding!\
In my socket server, I have created express and socket IO library configurations, with creating variables express, app, server and io.\
After that I have redirect requests from the home directory to index.html. So let’s see what is going on that index.html \
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/indexhtml.png)
<br><br>
In java script part, I have created necessary variables. Buttons and input variables are just to keep data if button is clicked and input means what we added as a new value. For socket, we are pushing data to our clients with connection to socket server.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/indexjs.png)
<br><br>
updateDolar, updateEuro, updateBitcoin are names of our server-client channel names. As I created these channels in Index.js file, with these way we are communicating between our clients and server via these different channels. Each channel has its own values and sending one specific data. In my case;\
updateDolar channel -> send new DOLAR RATE\
updateEuro channel -> send old DOLAR RATE\
updateBitcoin channel -> send new EURO RATE\
OldDolar channel -> send old EURO RATE\
OldEuro channel -> send new BITCOIN RATE\
OldBitcoin channel -> send old BITCOIN RATE\
The reason why I am taking both new and old both data is, I am checking both of the data and if there is increase in any rate, pushing this data to client IN BLUE color and if there is a decrease in any rate, I am showing them to client IN RED color.\
To clarify everything, this is how my Index.html file looks like.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/website.png)
<br><br>
There is also a ‘comment’ channel, which clients can push data to our server and it will be shown in ‘comments’ window.\
<br>
Now as we are done with this part, we can move to our client side coding.\
**PLEASE NOTE THAT YOU NEED TO HAVE web.config FILE IN YOUR server FOLDER. THIS HANDLES REQUIRED CONFIGURATION. YOU CAN COPY PASTE THE ONE IN THIS REPOSITORY AND TAKE A DETAILED LOOK.** \
<br><br>

## React Native
React native is an open source mobile application framework created by Facebook. It enables many different useful features for developers, open source, free and supports both Android and IOs systems.\
So I have used react native to develop my client side mobile application as my company requested. So it’s time to explain how did I accomplished this with steps.\
First we need to create an empty react native project with command ‘react-native init {ProjectName}’.\
Let’s say our project name is ‘Client’. All react-native components will be installed in this folder.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/reactinit.png)
**We can see our project is being created**\
<br><br>
As we created the project, we can see our necessary react native components came in to our Client folder.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/reactinit2.png)
<br><br>
Before we test if our react native project will work, first we need to have an emulator to test our mobile application. To do that, we will use Android Studio as I designed my project for Android.\
**Android Studio**\
Android Studio, the official integrated development environment for Android. It is free and user-friendly. That’s why I decided to download android studio. However, I didn’t create emulator, instead, I connected my mobile phone and configured it with android studio to make it testable for my react-native project.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/android.png)
**Here my mobile device (Huawei fig-lx1) has been detected by android studio.** \
<br><br>
Now as device is ready, we can test our device if it’s working or not by just writing ‘react-native run-android’\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/runadnro%C4%B1d.png)
**A screenshot of my mobile device what occurred after the loading operation ** \
 <br><br>
 ## Client Side
As we successfully configured our mobile device with react native project, now, we can start coding our client.\
Firstly, we need to install socket IO application’s client library as we need clients:\
npm i socket.io-client\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/clientSocke.png)
As I added to some table component to my application in order to make it looking good, you can add this library if you wish by this command: \
npm install react-native-table-component\
<br><br>
**App.js**\
Now let’s look at our App.js file in Client folder and modify it with our design. First, we import every component we need, such as Table, Row, Image, Textinput, TouchableOpacity etc …\
After that, we initialize our default Dollar, Euro and Bit coin rates. I put symobolic values, you can change them; (Dolar:5.13, Euro:612, bitcoin:9000)\
Then, we simply create a connection with our web server in order to get data\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/apjs.png)
**Here we see our connection with socket IO server** \
<br>
Then, we define channels to get which data from which. As we discussed before, each exchange rate has its own channel to get data. We also have ‘comment’ channel to send comments to our server web page.\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/re16.png)
**We can see our functions will be working when there is a new data coming from server** \
<br><br>
Finally, we need to render our data and show it to users …\
Before every return function, I put 4 very simple ‘IF’ statement to control if our data will be shown in ‘RED’ (decrease) or in ‘BLUE’ (increase). In order to do that, I simply compared ‘old’ values and ‘new’ values that we just received from the server. In my all tests, it worked fine.\
In render functions, I put the same code except the colors. At the beginning of render, I put an image from a website (logo of
the company) to have a beautiful design which is required. Then I put table and show exchange rates in these data tables. At the
end, I put ‘touchable area’ and text input area in order to get comments from user. Logic is, users can write comment easily
in this area and then just touch to ‘send comment’ button and function will be triggered and comments will be received to our server via the channel.\
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/reactson.png)
<br><br><br>
## Test
That is pretty much we could do. Now, let’s move to the fun part! We should test if our application is working or not!\
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/mobil1.jpg)
**Initial page when we open the app for the first time. (react-native run-android)** \
<br><br>
Now let’s modify our values from our Index.html web page\
(https://exchange-rates.azurewebsites.net/) \
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/updateValues.png)
<br><br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/mobil2.jpg)
<br>
**We received. As euro decreases, it shows in red color. We can also try if our comment will receive to server. Lets send a comment 'this app sucks'** \
<br>
![](https://github.com/utkuKutkut/Exchange-Rates-with-React-Native/blob/master/Images/web3.png)
**Our mobile application works successfully.** \
<br><br>
### You can find all the working files in this repository and use freely. Notice that The Microsoft Azure websites I use may be expired, but you can create your own resources for freely

















 
