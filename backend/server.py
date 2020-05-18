from flask import Flask, jsonify, request, logging
from flask_cors import CORS
import sys

from game.game import Game
from game.cards import Card, Deck
from game.bank import Bank
from game.player import Player, Dealer

app = Flask(__name__)
CORS(app)


def serialize_card(c):
    # TODO: just call toJSON directly. also, jsonify?
    return c.toJSON()


def serialize_cards(cards):
    return list(map(serialize_card, cards))


def deserialize_card(c):
    return Card(c["num"])


def deserialize_cards(cards):
    return list(map(deserialize_card, cards))


def get_card_nums(cards):
    return list(map(lambda c: c.num, cards))


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
        raise Exception("body is required")
    if "type" not in body:
        raise Exception("type is required")
    if "bet" not in body:
        raise Exception("bet is required")
    if "balance" not in body:
        raise Exception("balance is required")

    if body["type"] == "DEAL":
        return

    # TODO: More strict type validation here
    if "player_cards" not in body:
        raise Exception("player_cards is required")
    if "dealer_cards" not in body:
        raise Exception("dealer_cards is required")
    if "deck" not in body or not all(type(card) == int for card in body["deck"]):
        raise Exception("deck is required to be a list of numbers")


# TODO: Multiple players/hands
# TODO: balance, bet, and deck can be persisted in another
# service instead of sending back and forth to client


@app.route("/game", methods=["POST"])
def index():
    json = request.get_json()

    validate_body(json)

    type = json["type"]
    print(type, flush=True)

    if type == "DEAL":
        player = Player(bank=Bank(json["balance"]), bet_amount=int(json["bet"]))
        game = Game(player=player)
        game.start_server()
        player_cards = serialize_cards(game.player.cards)
        dealer_cards = serialize_cards(game.dealer.cards)
        print("Player total:", game.player.total, flush=True)
        data = {
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
            "player_total": game.player.total,
            "dealer_total": game.dealer.total,
            "status": game.player.status,
            "balance": game.player.balance,
            "deck": get_card_nums(game.deck.cards),
        }
        return jsonify(data=data)

    player_cards = deserialize_cards(json["player_cards"])
    dealer_cards = deserialize_cards(json["dealer_cards"])
    deck = Deck(json["deck"])
    player = Player(
        bank=Bank(json["balance"]), bet_amount=json["bet"], cards=player_cards
    )
    dealer = Dealer(cards=dealer_cards)
    game = Game(player=player, dealer=dealer, deck=deck)

    if type == "HIT":
        card = game.player_go_remote()

        # print("Player total:", game.player.total, flush=True)
        print("dealer cards", game.dealer.cards)

        data = {
            # "card": serialize_card(card),
            "player_cards": serialize_cards(game.player.cards),
            "dealer_cards": serialize_cards(game.dealer.cards),
            "player_total": game.player.total,
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
            "deck": get_card_nums(game.deck.cards),
        }
        return jsonify(data=data)

    if type == "STAY":
        dealer_cards = game.dealer_go()
        data = {
            "dealer_cards": serialize_cards(dealer_cards),
            "player_cards": serialize_cards(game.player.cards),
            "player_total": game.player.total,
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
            "deck": get_card_nums(game.deck.cards),
        }
        return jsonify(data=data)

    if type == "DOUBLE":
        card = game.player_double_down_remote()
        # Double down should end game
        dealer_cards = game.dealer_go()
        data = {
            # "card": serialize_card(card),
            "player_cards": serialize_cards(player_cards),
            "dealer_cards": serialize_cards(dealer_cards),
            "player_total": game.player.total,
            "dealer_total": game.dealer.total,
            "balance": game.player.balance,
            "status": game.player.status,
            "deck": get_card_nums(game.deck.cards),
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
