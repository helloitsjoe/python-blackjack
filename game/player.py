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
    def __init__(self, turns_remaining=10):
        self.name = ""
        self.cards = []
        self.total = 0
        self.status = Statuses["PLAYING"]
        self.turns_remaining = turns_remaining

    def prompt_name(self):
        self.name = input("Enter your name: ")

    def add_card(self, card):
        self.cards.append(card)
        self.total += card.value

        self.check_score()
        return card

    def check_score(self):
        if self.total == 21:
            self.status = Statuses["BLACKJACK"]
        elif self.total > 21:
            self.status = Statuses["BUST"]

    def play_turn(self):
        raise BaseException("play_turn is abstract, must be overridden")


class Player(AbstractPlayer):
    def play_remote(self, deck):
        self.turns_remaining -= 1
        if self.turns_remaining == 0:
            self.status = "DONE"

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
