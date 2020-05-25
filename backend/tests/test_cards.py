from game.cards import Deck, Card

from .test_game import get_nums


def test_has_cards():
    deck = Deck()
    deck.create_deck()
    assert len(deck.cards) == 52
    for card in deck.cards:
        assert isinstance(card, Card)


def test_deck_makes_cards_from_nums():
    deck = Deck(card_nums=[1, 2, 3])
    assert len(deck.cards) == 3
    for card in deck.cards:
        assert isinstance(card, Card)



def test_Card_toJSON():
    json = Card(5).toJSON()
    print(json)
    assert json["num"] == 5
    assert json["face"] == 5
    assert json["value"] == 5
    assert "suit" in json


def test_shuffle():
    deck = Deck()
    deck_shuffled = Deck(shuffle=True)

    nums = list(map(get_nums, deck.cards))
    assert nums == list(range(1, 53))

    nums_shuffled = list(map(get_nums, deck_shuffled.cards))
    assert len(nums_shuffled) == 52
    assert nums != nums_shuffled
