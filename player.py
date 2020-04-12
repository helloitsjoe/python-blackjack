class Player:
    def __init__(self):
        self.name = ''
        self.cards = []
        self.total = 0

    def prompt_name(self):
        self.name = input('Enter your name: ')

    def get_cards(self):
        return self.cards

    def get_total(self):
        return self.total

    def add_card(self, card):
        self.cards.append(card)
        self.total += card.value
