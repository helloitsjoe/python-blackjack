from player import Player, Statuses
from cards import Card

def test_status_blackjack():
    player = Player()
    assert player.total == 0
    assert player.status == Statuses['PLAYING']
    player.add_card(Card(13))
    player.add_card(Card(10))
    assert player.total == 20
    assert player.status == Statuses['PLAYING']
    player.add_card(Card(1))
    assert player.total == 21
    assert player.status == Statuses['BLACKJACK']

def test_status_bust():
    player = Player()
    player.add_card(Card(10))
    player.add_card(Card(10))
    player.add_card(Card(2))
    assert player.total == 22
    assert player.status == Statuses['BUST']
