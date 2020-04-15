from player import Player, Dealer, Statuses
from cards import Card, Deck

deck_bust = [10, 6, 6]
deck_stay = [10, 10, 2]
deck_hit = [10, 6]

def make_cards(nums):
    # Cards pop off the end
    nums.reverse()
    return list(map(lambda num: Card(num), nums))

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

def test_dealer_bust():
    dealer = Dealer()
    cards = make_cards(deck_bust)
    dealer.play_turn(Deck(cards=cards))
    assert dealer.status == Statuses['BUST']
    assert dealer.total == 22

def test_dealer_stay():
    dealer = Dealer()
    cards = make_cards(deck_stay)
    dealer.play_turn(Deck(cards=cards))
    assert dealer.status == Statuses['PLAYING']
    assert dealer.total == 20

