from flask import Flask, jsonify, request, logging
from flask_cors import CORS
from redis_client import RedisClient
import sys
import os

from routes import index


def make_server(redis_client=None):
    app = Flask(__name__)
    CORS(app)

    if not redis_client:
        redis_client = RedisClient(host="redis")

    @app.route("/game", methods=["POST"])
    def play():
        # TODO: Maybe move redis_client to middleware
        deck_nums = redis_client.get_list("deck")
        response_data = index.play(json=request.get_json(), deck_nums=deck_nums)
        redis_client.set_list("deck", response_data["deck"])
        del response_data["deck"]
        return jsonify(data=response_data)

    @app.errorhandler(Exception)
    def handle_invalid_usage(err):
        message = getattr(err, "message", str(err))
        print("ERROR MESSAGE:", message, flush=True)
        return jsonify({"message": message, "status_code": 400})
        # Is jsonify is the best thing to use here? I'm unclear how it differs from:
        # return message, 400

    return app


if __name__ == "__main__":
    app = make_server()
    # debug=True will reload on change
    app.run(host="0.0.0.0", port=5000, debug=True)
