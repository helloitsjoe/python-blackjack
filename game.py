# TODO: 
# Hide cards
# Multiplayer

from cards import Deck, Card
from player import Player, Statuses

class Game:
    # Gotcha: In python, default args are evaluated when the module
    # is evaluated, NOT at runtime. Default args will be mutated!
    def __init__(self, deck=None, player=None, dealer=None):
        self.deck = deck or Deck()
        self.player = player or Player()
        self.dealer = dealer or Player()

    def init_deck(self):
        self.deck.shuffle()

    def start(self):
        # self.player.prompt_name()
        self.init_deck()
        self.deal_player()
        self.deal_dealer()
        self.player_turn()

    def deal_player(self):
        self.player.add_card(self.deck.deal_one())
        self.player.add_card(self.deck.deal_one())

        name = self.player.name or 'Player One'

        print(f'{name}:', str(self.player.get_cards()))
        print('Player total:', self.player.get_total())

    def deal_dealer(self):
        self.dealer.add_card(self.deck.deal_one())
        self.dealer.add_card(self.deck.deal_one())

        print('Dealer:', str(self.dealer.get_cards()))
        print('Dealer total:', self.dealer.get_total())

    def player_turn(self):
        answer = input('Hit or stay? ')
        if answer.lower()[0] == 'h':
            self.player.add_card(self.deck.deal_one())
            print('Player Cards:', str(self.player.get_cards()))
            print('Player total:', self.player.get_total())
            print(f'YOU {self.player.status}')
            if self.player.status == Statuses['PLAYING']:
                return self.player_turn()
            if self.player.status == Statuses['BUST'] or self.player.status == Statuses['BLACKJACK']:
                return self.end_game()
        elif answer.lower()[0] != 's':
            return self.player_turn()
        # self.player.end_turn()
        return self.dealer_turn()

    def dealer_turn(self):
        print('Dealer Cards:', str(self.dealer.get_cards()))
        print('Dealer Total:', self.dealer.get_total())
        if self.dealer.get_total() > 21:
            print('DEALER BUSTS')
        elif self.dealer.get_total() < 17:
            self.dealer.add_card(self.deck.deal_one()) 
            return self.dealer_turn()
        self.end_game()
        # print(f'YOU {self.player.status}')

    def end_game(self):
        if self.player.status == Statuses['BUST']:
            print('YOU LOSE!')
        elif self.player.status == Statuses['BLACKJACK']:
            print('YOU WIN!')
        elif self.dealer.status == Statuses['BUST']:
            print('YOU WIN!')
        elif self.dealer.get_total() > self.player.get_total():
            print('YOU LOSE!')
        elif self.dealer.get_total() < self.player.get_total():
            print('YOU WIN!')
        elif self.dealer.get_total() == self.player.get_total():
            print('YOU TIE!')

if __name__ == '__main__':
    Game().start()
