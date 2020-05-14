from game.game import Game
from game.cards import Deck, Card
from game.player import Player, Statuses
from game.bank import Bank
from .test_helpers import make_cards
import pytest

# helper for map
def get_nums(card):
    return card.num


def test_has_deck():
    game = Game()
    assert isinstance(game.deck, Deck)


def test_deck_shuffled():
    game = Game()
    game.init_deck()

    deck = Deck()
    game_cards = list(map(get_nums, game.deck.cards))
    deck_cards = list(map(get_nums, deck.cards))
    assert game_cards != deck_cards


def test_deal_player():
    game = Game()
    game.init_deck()
    game.deal_player()

    assert len(game.player.cards) == 2
    assert len(game.deck.cards) == 50


def test_deal_dealer():
    game = Game()
    game.init_deck()
    game.deal_dealer()

    assert len(game.dealer.cards) == 2
    assert len(game.deck.cards) == 50


player_turn_test_data = [
    ("HIT", 3),
    ("hit", 3),
    ("H", 3),
    ("h", 3),
    ("STAY", 2),
    ("stay", 2),
    ("S", 2),
    ("s", 2),
    ("x", 2),
]


@pytest.mark.parametrize("input,expected", player_turn_test_data)
def test_player_turn(monkeypatch, input, expected):
    monkeypatch.setattr("builtins.input", lambda x: input)
    game = Game(player=Player(turns_remaining=1))
    game.start()
    assert len(game.player.cards) == expected


class TestBet:
    def test_player_bet(self):
        player = Player(bank=Bank(10))
        game = Game(player=player, deck=Deck(cards=make_cards([10, 10, 10, 10, 10])))
        game.start_server(bet=5)
        assert player.balance == 5
        assert player.total == 20
        game.player_go_remote()
        assert player.total == 30
        assert player.status == Statuses["BUST"]
        assert player.balance == 5

    def test_player_win(self):
        player = Player(bank=Bank(10))
        # TODO: Why is order not deterministic?
        game = Game(player=player, deck=Deck(cards=make_cards([10, 10, 10, 9])))
        game.start_server(bet=5, shuffle=False)
        assert player.balance == 5
        assert player.total == 20
        game.dealer_go()
        assert player.status == Statuses["WIN"]
        assert player.balance == 15

    def test_player_blackjack(self):
        player = Player(bank=Bank(10))
        game = Game(player=player, deck=Deck(cards=make_cards([10, 1, 10, 9])))
        game.start_server(bet=5, shuffle=False)
        assert player.balance == 5
        assert player.total == 21
        game.dealer_go()
        assert player.status == Statuses["BLACKJACK"]
        assert player.balance == 17.5

    def test_tie(self):
        player = Player(bank=Bank(10))
        game = Game(player=player, deck=Deck(cards=make_cards([10, 9, 10, 9])))
        game.start_server(bet=5, shuffle=False)
        assert player.balance == 5
        assert player.total == 19
        game.dealer_go()
        assert player.status == Statuses["TIE"]
        assert player.balance == 10

    def test_double_down(self):
        player = Player(bank=Bank(10))
        deck = Deck(cards=make_cards([5, 5, 10, 9, 10]))
        game = Game(player=player, deck=deck)
        game.start_server(bet=5, shuffle=False)
        assert player.balance == 5
        assert player.total == 10
        player.double_down(deck.deal_one())
        # Should double bet and withdraw
        assert player.balance == 0
        assert player.total == 20
        game.dealer_go()
        assert game.dealer.total == 19
        assert player.status == Statuses["WIN"]
        # Should win double original bet
        assert player.balance == 20

    # def test_split(self):
    #     player = Player(bank=Bank(10))
    #     game = Game(player=player, deck=Deck(cards=make_cards([10, 9, 10, 9])))
    #     game.start_server(bet=5, shuffle=False)
    #     assert player.balance == 5
    #     assert player.total == 19
    #     game.dealer_go()
    #     assert player.status == Statuses["TIE"]
    #     assert player.balance == 10
