import urllib.parse
import os
from flask import Flask, jsonify, request
from resume_utils.extract_resume import main as extract_resume

app = Flask(__name__)


# Route to send encoded resume url and extract resume data, including personal details, work experience, education,
# and qualifications
@app.route('/resume', methods=['GET'])
def get_resume_data():
    encoded_url = request.args.get('url')
    if encoded_url:
        decoded_url = urllib.parse.unquote(encoded_url)
        data = extract_resume(decoded_url)
        if data is not None:
            return jsonify(data), 200
        else:
            return jsonify({'error': 'Failed to parse resume'}), 400
    else:
        return jsonify({'error': 'No resume url provided'}), 400


# Route to render the HTML page
@app.route('/')
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT",8080)))
