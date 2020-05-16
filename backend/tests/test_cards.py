from game.cards import Deck, Card

from .test_game import get_nums


def test_has_cards():
    deck = Deck()
    deck.create_deck()
    assert len(deck.cards) == 52


def test_cards_are_Cards():
    for card in Deck().cards:
        assert isinstance(card, Card)


def test_toJSON():
    json = Card(5).toJSON()
    print(json)
    assert json["num"] == 5
    assert json["face"] == 5
    assert json["value"] == 5
    assert "suit" in json


def test_shuffle():
    deck = Deck()
    deck.create_deck()

    nums = list(map(get_nums, deck.cards))
    assert nums == list(range(1, 14)) * 4

    deck.shuffle()

    nums_shuffled = list(map(get_nums, deck.cards))
    assert len(deck.cards) == 52
    assert nums != nums_shuffled
