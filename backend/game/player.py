from game.bank import Bank

Statuses = {
    "PLAYING": "PLAYING",
    "BLACKJACK": "BLACKJACK",
    "BUST": "BUST",
    "LOSE": "LOSE",
    "WIN": "WIN",
    "TIE": "TIE",
    "DONE": "DONE",
}


class AbstractPlayer:
    def __init__(self, turns_remaining=10, bank=None, cards=None):
        print("Initializing player...")
        self.name = ""
        self.cards = cards or []
        self.total = 0
        self.status = Statuses["PLAYING"]
        self.turns_remaining = turns_remaining
        self._bank = bank or Bank(1000)
        self.bet_amount = 0

    @property
    def balance(self):
        return self._bank.balance

    def prompt_name(self):
        self.name = input("Enter your name: ")

    def bet(self, amount):
        self.bet_amount += self._bank.withdraw(amount)

    def win(self, amount):
        self._bank.deposit(amount)

    def add_card(self, card):
        self.cards.append(card)
        self.total = 0
        for card in self.cards:
            self.total += card.value

        # Handle aces
        for card in self.cards:
            if self.total > 21 and card.value == 11:
                card.value = 1
                self.total -= 10

        self.check_score()
        return card

    def double_down(self, card):
        self.bet(self.bet_amount)
        return self.add_card(card)

    def check_score(self):
        if len(self.cards) == 2 and self.total == 21:
            self.status = Statuses["BLACKJACK"]
        elif self.total > 21:
            # This ends the game on the frontend
            self.status = Statuses["BUST"]

    def play_turn(self):
        raise BaseException("play_turn is abstract, must be overridden")


class Player(AbstractPlayer):
    def play_remote(self, deck):
        card = self.add_card(deck.deal_one())
        print("Player:", self.total, str(self.cards))
        print("status", self.status)
        return card

    def play_turn(self, deck):
        answer = input("Hit or stay? ")

        self.turns_remaining -= 1
        if self.turns_remaining == 0:
            self.status = "DONE"

        if answer.lower()[0] == "h":
            self.add_card(deck.deal_one())
            print("Player:", self.total, str(self.cards))
            if self.status == Statuses["PLAYING"]:
                return self.play_turn(deck)
            if self.status == Statuses["BUST"] or self.status == Statuses["BLACKJACK"]:
                return self.status
        # Anything other than 'hit' or 'stay', repeat question
        elif answer.lower()[0] != "s":
            if self.status == Statuses["PLAYING"]:
                return self.play_turn(deck)
        return self.status


class Dealer(Player):
    def play_turn(self, deck):
        print("Dealer:", self.total, str(self.cards))
        if self.total < 17:
            self.add_card(deck.deal_one())
            return self.play_turn(deck)
        return self.cards
