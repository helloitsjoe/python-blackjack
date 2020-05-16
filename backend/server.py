from flask import Flask, jsonify, request, logging
from flask_cors import CORS
import sys

from game.game import Game
from game.cards import Card
from game.bank import Bank
from game.player import Player

app = Flask(__name__)
CORS(app)


def serialize_card(c):
    # TODO: just call toJSON directly. also, jsonify?
    return c.toJSON()


def serialize_cards(cards):
    return list(map(serialize_card, cards))


def get_card_nums(cards):
    return list(map(lambda c: c.num, cards))


def deserialize_card(c):
    return Card(c["num"])


def deserialize_cards(cards):
    return list(map(deserialize_card, cards))


def validate_body(body):
    """
    All types should have:
        type
        bet
        balance
    Non-deal types should have:
        player_cards
        dealer_cards
        deck
            Eventually move deck to redis

        player_total
            These two can probably be derived from cards
        dealer_total
            These two can probably be derived from cards
        status
            Should this be derived in game?
    """
    if not body:
        raise Exception("Body is required")
    if "type" not in body:
        raise Exception("Type is required")
    if "bet" not in body:
        raise Exception("Bet is required")
    if "balance" not in body:
        raise Exception("Balance is required")

    if body["type"] == "DEAL":
        return

    # TODO: More strict type validation here
    if "player_cards" not in body:
        raise Exception("player_cards is required")
    if "dealer_cards" not in body:
        raise Exception("dealer_cards is required")
    # if "deck" not in body:
    #     raise Exception("deck is required")


# TODO: Multiple concurrent games
# FIXME: Global game breaks in kubernetes because pods don't share state.
# Either use persistent state (e.g. Redis) or pass game data between client/server.
game = None


@app.route("/game", methods=["POST"])
def index():
    json = request.get_json()

    validate_body(json)

    type = json["type"]

    if type == "DEAL":
        player = Player(bank=Bank(json["balance"]))
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
            "deck": get_card_nums(game.deck.cards),
        }
        return jsonify(data=data)

    if type == "HIT":
        player_cards = deserialize_cards(json["player_cards"])
        player = Player(bank=Bank(json["balance"]), cards=player_cards)
        # TODO: pass deck to client
        game = Game(player=player)
        card = game.player_go_remote()
        print("Player total:", game.player.total, flush=True)
        data = {
            "card": serialize_card(card),
            "player_total": game.player.total,
            "status": game.player.status,
        }
        return jsonify(data=data)

    if type == "STAY":
        player = Player(bank=Bank(json["balance"]))
        game = Game(player=player)
        dealer_cards = game.dealer_go()
        data = {
            "dealer_cards": serialize_cards(dealer_cards),
            "player_cards": serialize_cards(game.player.cards),
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
        }
        return jsonify(data=data)

    if type == "DOUBLE":
        player = Player(bank=Bank(json["balance"]))
        game = Game(player=player)
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


@app.errorhandler(Exception)
def handle_invalid_usage(err):
    message = getattr(err, "message", str(err))
    # Not sure jsonify is the best thing to use here
    return jsonify({"message": message, "status_code": 400})
    # return message, 400


if __name__ == "__main__":
    # debug=True will reload on change
    app.run(host="0.0.0.0", port=5000, debug=True)
