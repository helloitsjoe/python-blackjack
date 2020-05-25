from flask import Flask, jsonify, request, logging
from flask_cors import CORS
import sys

from routes import index

app = Flask(__name__)
CORS(app)


@app.route("/game", methods=["POST"])
def play():
    json = request.get_json()
    deck_nums = json.get("deck") if json else None
    responseData = index.play(json=json, deck_nums=deck_nums)
    return jsonify(data=responseData)


@app.errorhandler(Exception)
def handle_invalid_usage(err):
    message = getattr(err, "message", str(err))
    print("ERROR MESSAGE:", message, flush=True)
    return jsonify({"message": message, "status_code": 400})
    # Is jsonify is the best thing to use here? I'm unclear how it differs from:
    # return message, 400


if __name__ == "__main__":
    # debug=True will reload on change
    app.run(host="0.0.0.0", port=5000, debug=True)
