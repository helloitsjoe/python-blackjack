from game.game import Game
from game.cards import Card, Deck
from game.bank import Bank
from game.player import Player, Dealer

# TODO: Multiple players/hands
# TODO: balance, bet, and deck can be persisted in another
# service instead of sending back and forth to client


def play(json):
    validate_body(json)

    type = json["type"]
    print(type, flush=True)

    if type == "DEAL":
        player = Player(bank=Bank(json["balance"]), bet_amount=int(json["bet"]))
        game = Game(player=player)
        game.start_server()
        return make_response(game)

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
        return make_response(game)

    if type == "STAY":
        dealer_cards = game.dealer_go()
        return make_response(game)

    if type == "DOUBLE":
        card = game.player_double_down_remote()
        # Double down should end game
        dealer_cards = game.dealer_go()
        return make_response(game)


def make_response(game):
    return {
        "player_cards": serialize_cards(game.player.cards),
        "dealer_cards": serialize_cards(game.dealer.cards),
        "player_total": game.player.total,
        "dealer_total": game.dealer.total,
        "balance": game.player.balance,
        "status": game.player.status,
        "deck": get_card_nums(game.deck.cards),
    }


def serialize_cards(cards):
    return list(map(lambda c: c.toJSON(), cards))


def deserialize_cards(cards):
    return list(map(lambda c: Card(c["num"]), cards))


def get_card_nums(cards):
    return list(map(lambda c: c.num, cards))


def validate_body(body):
    if not body:
        raise Exception("body is required")

    if "type" not in body:
        raise Exception("type is required")
    if "bet" not in body or "balance" not in body:
        raise Exception("bet and balance are required")

    if body["type"] == "DEAL":
        return

    # TODO: More strict type validation here (check type of cards)
    if "player_cards" not in body or "dealer_cards" not in body:
        raise Exception("player_cards and dealer_cards are required")
    if "deck" not in body or not all(type(card) == int for card in body["deck"]):
        raise Exception("deck is required to be a list of numbers")
