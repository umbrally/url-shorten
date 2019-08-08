# Restaurant Pocket List

URL shorten app

# Snapshot

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Install node.js by nvm
    * download nvm-setup.zip from nvm-windows on github and then unzip it
    * install LTS version of node.js 
```
$ nvm install 10.16.0
```
2. MongoDB  

### Installing

1. Download this project 
```
$ git clone https://github.com/umbrally/url-shorten.git
```

2. Install packages used in this project
```
$ npm install
```

3. [http://localhost:3000](http://localhost:3000) execution on your browser
```
$ npm run dev
```
4. heroku
* https://pure-ocean-86993.herokuapp.com/

## Features

* User can input an url to get shortened url.
* User can press "複製" button to copy the shortened url.
* User can visit origin website through shortened url if server is working.
* If user input abnormal url format or null, user will get alert of it.

## Authors

* [Zoey Liu](https://github.com/umbrally) 
