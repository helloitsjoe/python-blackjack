from cards import Card


def make_cards(nums):
    # Cards pop off the end
    nums.reverse()
    return list(map(lambda num: Card(num), nums))
