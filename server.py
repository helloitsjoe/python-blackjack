from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/game', methods=['POST'])
def index():
    return jsonify(data="Hello there")

if __name__ == '__main__':
    # debug=True will reload on change
    app.run(host='0.0.0.0', port=5000, debug=True)
