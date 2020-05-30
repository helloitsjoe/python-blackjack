import random
import json


def make_cards(nums):
    return list(map(lambda num: Card(num), nums))


class Card:
    def __init__(self, num):
        suits = ["clubs", "diamonds", "hearts", "spades"]
        self.num = num

        suit_num = num % 13 or 13

        self.suit = suits[num % 4]
        self.value = suit_num
        self.face = suit_num

    def __repr__(self):
        return f"""{self.face} of {self.suit}"""

    # This is an example of setters/getters.
    # Not really necessary, but a useful example.
    @property
    def value(self):
        return self.__value

    @value.setter
    def value(self, num):
        self.__value = min(num, 10) if num != 1 else 11

    @property
    def face(self):
        return self.__face

    @face.setter
    def face(self, num):
        faces = {
            1: "A",
            11: "J",
            12: "Q",
            13: "K",
        }
        self.__face = faces.get(num, num)

    # Note: This is only necessary because of the setters/getters
    # If those were normal properties this could just be `self.__dict__`
    def toJSON(self):
        return {
            "num": self.num,
            "value": self.value,
            "face": self.face,
            "suit": self.suit,
        }


class Deck:
    def __init__(self, card_nums=None, shuffle=False):
        self.cards = self.create_deck(card_nums=card_nums, shuffle=shuffle)

    def create_deck(self, card_nums=None, shuffle=False):
        self.cards = (
            [Card(num) for num in card_nums]
            if card_nums
            else [Card(n) for n in range(1, 53)]
        )
        if shuffle:
            self.cards = random.sample(self.cards, len(self.cards))
        return self.cards

    def deal_one(self):
        if len(self.cards) == 0:
            self.cards = self.create_deck(shuffle=True)
        return self.cards.pop()

    def to_nums(self):
        return [c.num for c in self.cards]
