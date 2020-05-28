from game.game import Game
from game.cards import Card, Deck
from game.bank import Bank
from game.player import Player, Dealer

# TODO: Multiple players/hands
# TODO: balance, bet can be persisted in another
# service instead of sending back and forth to client


def play(json=None, deck_nums=None):
    validate_body(json)

    type = json["type"]
    print(type, flush=True)

    if type == "DEAL":
        player = Player(bank=Bank(json["balance"]), bet_amount=int(json["bet"]))
        deck = (
            Deck(card_nums=deck_nums, shuffle=True) if deck_nums else Deck(shuffle=True)
        )
        game = Game(player=player, deck=deck)
        game.start()
        return make_response(game)

    validate_deck_input(deck_nums)

    player_cards = deserialize_cards(json["player_cards"])
    dealer_cards = deserialize_cards(json["dealer_cards"])
    deck = Deck(card_nums=deck_nums)
    player = Player(
        bank=Bank(json["balance"]), bet_amount=json["bet"], cards=player_cards
    )
    dealer = Dealer(cards=dealer_cards)
    game = Game(player=player, dealer=dealer, deck=deck)

    if type == "HIT":
        card = game.player_go()

    if type == "STAY":
        dealer_cards = game.dealer_go()

    if type == "DOUBLE":
        card = game.player_double_down()
        # Double down should end game
        dealer_cards = game.dealer_go()

    return make_response(game)


def make_response(game):
    return {
        "player_cards": serialize_cards(game.player.cards),
        "dealer_cards": serialize_cards(game.dealer.cards),
        "player_total": game.player.total,
        "dealer_total": game.dealer.total,
        # TODO: balance in redis?
        "balance": game.player.balance,
        "status": game.player.status,
        "deck": game.deck.to_nums(),
    }


def serialize_cards(cards):
    return list(map(lambda c: c.toJSON(), cards))


def deserialize_cards(cards):
    return list(map(lambda c: Card(c["num"]), cards))


# Validation
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


def validate_deck_input(deck_nums):
    for num in deck_nums:
        if type(num) != int:
            raise Exception("deck is required to be a list of numbers")
