from game.cards import Card


def make_cards(nums):
    return list(map(lambda num: Card(num), nums))
