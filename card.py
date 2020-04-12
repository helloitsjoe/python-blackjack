class Card:
    def __init__(self, num):
        suits = ['clubs', 'diamonds', 'hearts', 'spades']
        self.num = num % 13 + 1
        self.suit = suits[num % 4]
        self.value = num
        self.face = self.num
    
    def __repr__(self):
        return f'''{self.face} of {self.suit}'''

    @property
    def value(self):
        return self.__value

    @value.setter
    def value(self, num):
        # TODO: Account for Ace being 11
        self.__value = min(num, 10)

    @property
    def face(self):
        return self.__face

    @face.setter
    def face(self, num):
        # TODO: Account for Ace being 11 and refactor face cards
        faces = {
            1: 'A',
            11: 'J',
            12: 'Q',
            13: 'K',
        }
        self.__face = faces.get(num, num)

class Deck:
    def __init__(self):
        self.cards = [];
        self.create_deck()

    def create_deck(self):
        for n in range(52):
            self.cards.append(Card(n))
        # print('cards:', list(self.cards))

    def deal_one(self):
        card = self.cards.pop()
        return card
