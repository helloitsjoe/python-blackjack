import random
import json


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
    # Not necessary, but a useful example.
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

    def toJSON(self):
        return {
            "num": self.num,
            "value": self.value,
            "face": self.face,
            "suit": self.suit,
        }


class Deck:
    def __init__(self, card_nums=None, shuffle=False):

        self.cards = (
            list(map(lambda num: Card(num), card_nums))
            if card_nums
            else self.create_deck()
        )

        if shuffle:
            self.cards = random.sample(self.cards, len(self.cards))

        print("cards:", self.cards)
        # self.cards = cards

    def create_deck(self):
        cards = []
        for n in range(1, 53):
            cards.append(Card(n))
        return cards

    def deal_one(self):
        card = self.cards.pop()
        return card

    # def toJSON(self):
