# Carter.Chat Character Creation Task
A prototype for the Carter Chat character creation form, developed using React (with Mantine UI) for the frontend and Python's FastAPI for the backend. Demonstrates form validation, interaction between frontend and backend, and effective use of modern web development practices.

## Prerequisites
Node.js and npm: Download and install [Node.js](https://nodejs.org/en).  
Python 3: Download and install [Python](https://www.python.org/downloads/).  
(Optional) Virtual environment: Install using pip: `pip install virtualenv`.  

## Setup
1.  **Clone the repository**  
`$ git clone git@github.com:ArslanAftab/carter-character.git`  
`$ cd git@github.com:ArslanAftab/carter-character.git`   
  
2. **Install Node dependencies**  
`$ npm install`

3. **Set up a virtual environment** _(Optional but recommended)_   
`$ virtualenv myenv`  

4. **Start virtual environment**  
*For Mac users*  
`$ source myenv/bin/activate`  
*For Windows users*  
`$ .\myenv\Scripts\activate`

5. **Install python requirements**  
`$ pip install -r requirements.txt`  

## Running the application(s)
1. **Start the FastAPI server**  
`$ uvicorn main:app --reload`  
This will start the FastAPI server, usually on http://localhost:8000.

2. **Start the React frontend**  
`$ npm start`  
Open your browser and navigate to http://localhost:3000 to view the application.  

## More Information
For more advanced topics on React, such as code splitting, analyzing bundle size, making a progressive web app, and more, refer to the [Create React App](https://create-react-app.dev/docs/getting-started/) documentation.

For FastAPI documentation, you can refer to the official [FastAPI](https://fastapi.tiangolo.com) documentation.

For MantineUI documentation, you can refer to the official [Mantine](https://mantine.dev) documentation
