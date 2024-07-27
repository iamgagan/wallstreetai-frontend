import urllib.parse
from flask import Flask, jsonify, request
from resume_utils.extract_resume import main as extract_resume

app = Flask(__name__)

# Route to send JSON data
@app.route('/resume')
def get_resume_data():
    encoded_url = request.args.get('resume_url')
    if encoded_url:
        decoded_url = urllib.parse.unquote(encoded_url)
        data = extract_resume(decoded_url)
        return jsonify(data), 200 if data is not None else jsonify({'error': 'Failed to parse resume'}), 400
    else:
        return jsonify({'error': 'No resume url provided'}), 400


# Route to render the HTML page
@app.route('/')
def index():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True)