from bank import Bank
import pytest


def test_init():
    bank = Bank()
    assert bank.balance == 0


def test_withdraw():
    bank = Bank(10)
    bank.withdraw(5)
    assert bank.balance == 5
    bank.withdraw(5)
    assert bank.balance == 0
    bank.withdraw(5)
    assert bank.balance == -5


def test_deposit():
    bank = Bank()
    bank.deposit(5)
    assert bank.balance == 5
