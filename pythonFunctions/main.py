from flask import Flask, jsonify

app = Flask(__name__)

# Route to send JSON data
@app.route('/api/data')
def get_data():
    data = {
        'name': 'John Doe',
        'age': 30,
        'email': 'johndoe@example.com'
    }
    return jsonify(data)

# Route to render the HTML page
@app.route('/')
def index():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True)