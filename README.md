# GA_Project4

WhatsThat - image visual recognition app - WDI PROJECT 4

- This app utilizes IBM Watsons visual recognition service that uses deep learning algorithms to analyze images for scenes, objects, faces, text, and other subjects that can give you insignts into your visual content. 

## How to use this application

- [Sign up][sign_up] in Bluemix, or use an existing account and create a visual recognition service in Bluemix to obtain api key
- Create a file named .env in the root directory of the project with the following content:

    ```none
    VISUAL_RECOGNITION_API_KEY=<api_key>
    ```
- Install [Node.js][node_js]. Installing Node JS will also install [npm][npm].
- Go to the project folder in a terminal and run
    ```sh
    $ npm install
    ```
- In the project folder run 
	```sh
	$ ionic build ios
	```
- Open project in xcode and run on device

## User Stories

HOME PAGE 
- As a end user I want to be able to take photos of scences, objects,faces, and other subjects.
- As a end user I want to be able to adjust camera settings.
- As a end user I want to be able to be to preview the picture before I process it.
- As a end user I want to be able to retake the picture if needed.

Detail PAGE
- As a end user I want to be see results for what I captured.
- As a end user I want to see how accurate the analyst of the image was.
- As a end user I want to be able to read more information on what I captured. 

Browser 
- As a end user I want to read relevant information on the subject capture. 

## Wireframes

1. [Imgur](http://i.imgur.com/9RJ4XP5.jpg)

## Development Workflow

- Trello Board - https://trello.com/b/xGc69RfM/ga-project-4

## Technologies Used

- HTML 5
- Sass
- Typescript
- Angular 4
- Ionic 2
- Xcode

## What Is Unfinished?

1. remove imgur api
2. camera focus options

[sign_up]: https://console.ng.bluemix.net/registration/
[npm]: https://www.npmjs.com
[node_js]: http://nodejs.org/

