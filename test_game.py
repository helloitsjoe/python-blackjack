from game import Game
from cards import Deck
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
    ('HIT', 3),
    ('hit', 3),
    ('H', 3),
    ('h', 3),
    ('STAY', 2),
    ('stay', 2),
    ('S', 2),
    ('s', 2),
    # how to test this? ('x', 2),
]

# @pytest.mark.parametrize('input,expected', player_turn_test_data)
# def test_player_turn(monkeypatch, input, expected):
#     monkeypatch.setattr('builtins.input', lambda x: input)
#     game = Game()
#     game.init_deck()
#     game.deal_player()
#     game.player_turn()
#     assert len(game.player.cards) == expected

