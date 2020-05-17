# TODO:
# Restart deck if all cards are dealt
# Betting (non-server)
# split
# Multiplayer

from game.cards import Deck, Card
from game.player import Player, Dealer, Statuses


class Game:
    # Gotcha: In python, default args are evaluated when the module
    # is evaluated, NOT at runtime. Default args will be mutated!
    def __init__(self, deck=None, player=None, dealer=None):
        self.deck = deck or Deck(shuffle=True)
        self.player = player or Player()
        self.dealer = dealer or Dealer()

    def start(self):
        # self.player.prompt_name()
        self.deal_player()
        self.deal_dealer()
        self.player_go()
        self.dealer_go()

    def start_server(self):
        self.deal_player()
        self.deal_dealer()

    def player_go(self):
        self.player.play_turn(self.deck)

    def player_go_remote(self):
        card = self.player.play_remote(self.deck)
        return card

    def player_double_down_remote(self):
        card = self.player.double_down(self.deck.deal_one())
        return card

    def dealer_go(self):
        if self.player.status == Statuses["PLAYING"]:
            self.dealer.cards = self.dealer.play_turn(self.deck)
        self.end_game()
        return self.dealer.cards

    def deal_player(self):
        self.player.bet()
        self.player.add_card(self.deck.deal_one())
        self.player.add_card(self.deck.deal_one())

        name = self.player.name or "Player"
        print(f"{name}:", self.player.total, str(self.player.cards))

    def deal_dealer(self):
        self.dealer.add_card(self.deck.deal_one())
        self.dealer.add_card(self.deck.deal_one())

        print("Dealer:", self.dealer.total, str(self.dealer.cards))

    def end_game(self):
        if self.player.status == Statuses["BUST"]:
            print("BUST... YOU LOSE!")
        elif self.player.status == Statuses["BLACKJACK"]:
            self.player.win(self.player.bet_amount * 2.5)
            print("BLACKJACK! YOU WIN!")
        elif self.dealer.status == Statuses["BUST"]:
            self.player.status = Statuses["WIN"]
            self.player.win(self.player.bet_amount * 2)
            print("DEALER BUSTS, YOU WIN!")
        elif self.dealer.total > self.player.total:
            self.player.status = Statuses["LOSE"]
            print("YOU LOSE!")
        elif self.dealer.total < self.player.total:
            self.player.status = Statuses["WIN"]
            self.player.win(self.player.bet_amount * 2)
            print("YOU WIN!")
        elif self.dealer.total == self.player.total:
            self.player.status = Statuses["TIE"]
            self.player.win(self.player.bet_amount)
            print("YOU TIE!")
        print("Balance:", self.player.balance, flush=True)


if __name__ == "__main__":
    game = Game()
    game.start()
