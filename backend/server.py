from flask import Flask, jsonify, request, logging
from flask_cors import CORS
import sys

from game.game import Game
from game.bank import Bank
from game.player import Player

app = Flask(__name__)
CORS(app)


def serialize_card(c):
    return {"value": c.value, "face": c.face, "suit": c.suit}


def serialize_cards(cards):
    return list(map(serialize_card, cards))


# TODO: Multiple concurrent games
# FIXME: Global game breaks in kubernetes because sessions aren't sticky.
# Either make sticky sessions or pass game data to remove state.
game = None


@app.route("/game", methods=["POST"])
def index():
    json = request.get_json()
    type = json["type"]

    if type == "DEAL":
        global game
        balance = json["balance"]
        player = Player(bank=Bank(balance))
        print("Player:", player.total, flush=True)
        game = Game(player=player)
        print("Game:", game.player.total, flush=True)
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

    if type == "HIT":
        card = game.player_go_remote()
        print("Player total:", game.player.total, flush=True)
        data = {
            "card": serialize_card(card),
            "player_total": game.player.total,
            "status": game.player.status,
        }
        return jsonify(data=data)

    if type == "STAY":
        dealer_cards = game.dealer_go()
        data = {
            "dealer_cards": serialize_cards(dealer_cards),
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
        }
        return jsonify(data=data)

    if type == "DOUBLE":
        card = game.player_double_down_remote()
        # Double down should end game
        dealer_cards = game.dealer_go()
        data = {
            "card": serialize_card(card),
            "dealer_cards": serialize_cards(dealer_cards),
            "player_total": game.player.total,
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
        }
        return jsonify(data=data)


if __name__ == "__main__":
    # debug=True will reload on change
    app.run(host="0.0.0.0", port=5000, debug=True)
