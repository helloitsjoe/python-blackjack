# TODO: 
# Hide cards
# Multiplayer

from card import Deck, Card
from player import Player

class Game:
    def __init__(self, deck=Deck(), player=Player(), dealer=Player()):
        self.deck = deck
        self.player = player
        self.dealer = dealer

    def start(self):
        # self.player.prompt_name()
        self.deal_player()
        self.deal_dealer()
        self.prompt()

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

    def prompt(self):
        # TODO: Hit/stay functionality
        # TODO: Bust logic
        # TODO: Dealer AI
        answer = input('Hit or stay? ')
        print(answer)

Game().start()
