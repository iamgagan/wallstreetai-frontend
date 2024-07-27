# How to start the app

## Create a venv folder
Create a venv folder within `pythonFunctions` folder to enable a local virtual environment to be activated. 
```
python3.12 -m venv venv
```

## Activate the local virtual environment
```
source venv/bin/activate
```

## Select Python interpreter
* Press `Command + Shift + P` to open VSCode menu and then select `Python: Select Interpreter`
* VSCode will detect the Python version from the local venv as the first option, so select this option.

## Install all the packages in `requirements.txt`
```
pip install -r requirements.txt
```

## Start the server (you may specify `python3.12` to be specific)
```
python3.12 main.py
```
The app will start at `http://127.0.0.1:5000/` by default. 

***************************************

## To save all relevant packages to `requirements.txt`
```
pip freeze > requirements.txt
```