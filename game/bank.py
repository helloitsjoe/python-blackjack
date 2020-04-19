class Bank:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        # TODO: Handle negative balance
        self.balance -= amount
        return amount

    def deposit(self, amount):
        self.balance += amount
