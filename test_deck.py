from cards import Deck, Card

from test_game import get_nums

def test_has_cards():
    assert len(Deck().cards) == 52

def test_cards_are_Cards():
    for card in Deck().cards:
        assert isinstance(card, Card)

def test_shuffle():
    deck = Deck()

    nums = list(map(get_nums, deck.cards))
    assert nums == list(range(1, 14)) * 4

    deck.shuffle()

    nums_shuffled = list(map(get_nums, deck.cards))
    assert len(deck.cards) == 52
    assert nums != nums_shuffled

