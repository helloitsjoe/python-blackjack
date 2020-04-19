from player import AbstractPlayer, Player, Dealer, Statuses
from cards import Card, Deck
from bank import Bank
from test_helpers import make_cards
import pytest

deck_bust = [10, 6, 6]
deck_stay = [10, 10, 2]
deck_hit = [10, 6]


def test_abstract_player():
    with pytest.raises(BaseException, match="overridden"):
        player = AbstractPlayer()
        player.play_turn()


class TestBank:
    def test_bet_withdraws(self):
        player = Player()
        assert player.balance == 1000
        player.bet(25)
        assert player.balance == 975

    def test_win_deposits(self):
        player = Player(bank=Bank(10))
        player.win(5)
        assert player.balance == 15


def test_status_blackjack():
    player = Player()
    assert player.total == 0
    assert player.status == Statuses["PLAYING"]
    player.add_card(Card(13))
    player.add_card(Card(10))
    assert player.total == 20
    assert player.status == Statuses["PLAYING"]
    player.add_card(Card(1))
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
    cards = make_cards(deck_bust)
    dealer.play_turn(Deck(cards=cards))
    assert dealer.status == Statuses["BUST"]
    assert dealer.total == 22


def test_dealer_stay():
    dealer = Dealer()
    cards = make_cards(deck_stay)
    dealer.play_turn(Deck(cards=cards))
    assert dealer.status == Statuses["PLAYING"]
    assert dealer.total == 20


def test_aces_1_or_11():
    player = Player()
    player.add_card(Card(1))
    player.add_card(Card(1))
    assert player.total == 12
    player.add_card(Card(9))
    assert player.status == Statuses["BLACKJACK"]
