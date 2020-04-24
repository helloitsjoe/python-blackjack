import random


class Card:
    def __init__(self, num):
        suits = ["clubs", "diamonds", "hearts", "spades"]
        self.num = num % 13 or 13
        self.suit = suits[num % 4]
        self.value = self.num
        self.face = self.num

    def __repr__(self):
        return f"""{self.face} of {self.suit}"""

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
        # TODO: Account for Ace being 11 and refactor face cards
        faces = {
            1: "A",
            11: "J",
            12: "Q",
            13: "K",
        }
        self.__face = faces.get(num, num)


class Deck:
    def __init__(self, cards=None):
        if not cards:
            cards = self.create_deck()

        self.cards = cards

    def create_deck(self):
        cards = []
        for n in range(1, 53):
            cards.append(Card(n))
        return cards

    def deal_one(self):
        card = self.cards.pop()
        return card

    def shuffle(self):
        self.cards = random.sample(self.cards, len(self.cards))
