from game.player import AbstractPlayer, Player, Dealer, Statuses
from game.cards import Card, Deck
from game.bank import Bank
import server
from .test_helpers import make_cards
import pytest


deck_bust = [6, 6, 10]
deck_stay = [2, 10, 10]
deck_hit = [6, 10]


def test_abstract_player():
    with pytest.raises(BaseException, match="overridden"):
        player = AbstractPlayer()
        player.play_turn()


class TestBank:
    def test_bet_withdraws(self):
        player = Player()
        assert player.balance == 1000
        player2 = Player(bet=25)
        assert player2.balance == 975

    def test_win_deposits(self):
        player = Player(bank=Bank(10))
        player.win(5)
        assert player.balance == 15


def test_card_validation():
    with pytest.raises(Exception, match="Cards must be a list of type Card"):
        Player(cards=[1])
    with pytest.raises(Exception, match="Cards must be a list of type Card"):
        cards = server.serialize_cards(make_cards([1, 2]))
        Player(cards=cards)
    with pytest.raises(Exception, match="Cards must be a list of type Card"):
        Player(cards=Card(1))


def test_cards():
    # No cards should make empty list
    assert Player().cards == []
    assert Dealer().cards == []

    # Provided cards should be set on player
    actual_cards = make_cards([4, 5])
    player = Player(cards=actual_cards)
    dealer = Dealer(cards=actual_cards)
    assert player.cards == actual_cards
    assert dealer.cards == actual_cards


def test_status_playing():
    player = Player()
    assert player.total == 0
    assert player.status == Statuses["PLAYING"]
    player.add_card(Card(13))
    player.add_card(Card(10))
    assert player.total == 20
    assert player.status == Statuses["PLAYING"]
    player.add_card(Card(1))
    assert player.total == 21
    assert player.status == Statuses["PLAYING"]


def test_status_blackjack():
    player = Player()
    assert player.total == 0
    assert player.status == Statuses["PLAYING"]
    player.add_card(Card(1))
    player.add_card(Card(10))
    assert player.total == 21
    assert player.status == Statuses["BLACKJACK"]


def test_status_bust():
    player = Player()
    player.add_card(Card(10))
    player.add_card(Card(10))
    player.add_card(Card(2))
    assert player.total == 22
    assert player.status == Statuses["BUST"]


def test_dealer_bust():
    dealer = Dealer()
    # cards = make_cards(deck_bust)
    dealer.play_turn(Deck(card_nums=deck_bust))
    assert dealer.status == Statuses["BUST"]
    assert dealer.total == 22


def test_dealer_stay():
    dealer = Dealer()
    # cards = make_cards(deck_stay)
    dealer.play_turn(Deck(card_nums=deck_stay))
    assert dealer.status == Statuses["PLAYING"]
    assert dealer.total == 20


class TestAces:
    def test_two_aces(self):
        player = Player()
        player.add_card(Card(1))
        player.add_card(Card(1))
        assert player.total == 12
        player.add_card(Card(9))
        assert player.status == Statuses["PLAYING"]

    def test_two_aces_no_bust(self):
        player = Player()
        player.add_card(Card(1))
        player.add_card(Card(1))
        assert player.total == 12
        player.add_card(Card(8))
        assert player.total == 20
        player.add_card(Card(2))
        assert player.total == 12
        assert player.status == Statuses["PLAYING"]

    def test_one_ace(self):
        player = Player()
        player.add_card(Card(10))
        player.add_card(Card(1))
        assert player.total == 21
        assert player.status == Statuses["BLACKJACK"]

    def test_add_ace(self):
        player = Player()
        player.add_card(Card(4))
        player.add_card(Card(10))
        player.add_card(Card(1))
        assert player.total == 15
        assert player.status == Statuses["PLAYING"]
        player.add_card(Card(10))
        assert player.total == 25
        assert player.status == Statuses["BUST"]

    def test_six(self):
        player = Player()
        player.add_card(Card(1))
        player.add_card(Card(5))
        assert player.total == 16
