from flask import Flask, jsonify, request
from flask_cors import CORS
from game import Game

app = Flask(__name__)
CORS(app)


def serialize_card(c):
    return {"value": c.value, "face": c.face, "suit": c.suit}


def serialize_cards(cards):
    return list(map(serialize_card, cards))


game = None


@app.route("/game", methods=["POST"])
def index():
    if request.get_json()["type"] == "DEAL":
        global game
        game = Game()
        game.start_server()
        player_cards = serialize_cards(game.player.cards)
        dealer_cards = serialize_cards(game.dealer.cards)
        data = {"player": player_cards, "dealer": dealer_cards}
        return jsonify(data=data)
    if request.get_json()["type"] == "HIT":
        card = game.player_go_remote()
        data = {"card": serialize_card(card), "status": game.player.status}
        return jsonify(data=data)
        # TODO: If player busts, deal dealer and finish game
        # dealer_cards = serialize_cards(game.dealer.cards)
    if request.get_json()["type"] == "STAY":
        dealer_cards = game.dealer_go()
        data = {
            "dealer_cards": serialize_cards(dealer_cards),
            "status": game.player.status,
        }
        return jsonify(data=data)


if __name__ == "__main__":
    # debug=True will reload on change
    app.run(host="0.0.0.0", port=5000, debug=True)
