from flask import Flask, jsonify, request, logging
from flask_cors import CORS
from game import Game
from bank import Bank
from player import Player

app = Flask(__name__)
CORS(app)


def serialize_card(c):
    return {"value": c.value, "face": c.face, "suit": c.suit}


def serialize_cards(cards):
    return list(map(serialize_card, cards))


# TODO: Multiple concurrent games
game = None


@app.route("/game", methods=["POST"])
def index():
    json = request.get_json()

    if json["type"] == "DEAL":
        global game
        balance = json["balance"]
        player = Player(bank=Bank(balance))
        game = Game(player=player)
        game.start_server(bet=int(json["bet"]))
        player_cards = serialize_cards(game.player.cards)
        dealer_cards = serialize_cards(game.dealer.cards)
        data = {
            "player_cards": player_cards,
            "player_total": player.total,
            # "dealer_total": game.dealer.total,
            "dealer_cards": dealer_cards,
        }
        return jsonify(data=data)
    if json["type"] == "HIT":
        card = game.player_go_remote()
        data = {
            "card": serialize_card(card),
            "total": game.player.total,
            "status": game.player.status,
        }
        return jsonify(data=data)
    if json["type"] == "STAY":
        dealer_cards = game.dealer_go()
        data = {
            "dealer_cards": serialize_cards(dealer_cards),
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
        }
        return jsonify(data=data)


if __name__ == "__main__":
    # debug=True will reload on change
    app.run(host="0.0.0.0", port=5000, debug=True)
