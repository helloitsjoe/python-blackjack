Statuses = {
    'PLAYING': 'PLAYING',
    'BLACKJACK': 'BLACKJACK',
    'BUST': 'BUST',
    'LOSE': 'LOSE',
    'WIN': 'WIN',
}

class Player:

    def __init__(self):
        self.name = ''
        self.cards = []
        self.total = 0
        self.status = Statuses['PLAYING']

    def prompt_name(self):
        self.name = input('Enter your name: ')

    def get_cards(self):
        return self.cards

    def get_total(self):
        return self.total

    def add_card(self, card):
        self.cards.append(card)
        self.total += card.value

        self.check_score()

    def check_score(self):
        if self.total == 21:
            self.status = Statuses['BLACKJACK']
        elif self.total > 21:
            self.status = Statuses['BUST']
        self.end_turn()

    def end_turn(self):
        pass
