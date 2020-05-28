import pytest
from routes import index
from game.cards import Deck, Card, make_cards


def test_deal_new_deck():
    response = index.play(json={"type": "DEAL", "bet": 5, "balance": 100})
    assert "player_cards" in response
    assert "dealer_cards" in response
    assert "status" in response
    # If gameplay is updated to win on BLACKJACK after deal, this test
    # becomes nondeterministic. One solution is include Deck in deal
    assert response["balance"] == 95
    assert type(response["player_total"]) == int
    assert type(response["dealer_total"]) == int
    assert len(response["deck"]) == 48
    for num in response["deck"]:
        assert type(num) == int


def test_deal_existing_deck():
    response = index.play(
        json={"type": "DEAL", "bet": 5, "balance": 100}, deck_nums=[1, 2, 3, 4, 5]
    )
    assert "player_cards" in response
    assert "dealer_cards" in response
    assert "status" in response
    assert "balance" in response
    assert "player_total" in response
    assert "dealer_total" in response
    assert len(response["deck"]) == 1


def test_deal_end_of_deck():
    # TODO Empty deck should shuffle and create new deck
    pass


def test_hit():
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))

    response = index.play(
        json={
            "type": "HIT",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
        },
        deck_nums=[9, 10],
    )

    # original cards should be in hand, plus one removed from deck
    assert response["deck"] == [9]
    assert response["status"] == "PLAYING"
    assert response["player_cards"] == index.serialize_cards(make_cards([4, 5, 10]))
    assert response["dealer_cards"] == dealer_cards
    assert response["player_total"] == 19
    assert response["dealer_total"] == 13
    assert response["balance"] == 95


def test_stay():
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))

    response = index.play(
        json={
            "type": "STAY",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
        },
        deck_nums=[9, 10],
    )

    assert response["deck"] == [9]
    assert response["status"] == "WIN"
    assert response["player_cards"] == player_cards
    assert response["dealer_cards"] == index.serialize_cards(make_cards([6, 7, 10]))
    assert response["player_total"] == 9
    assert response["dealer_total"] == 23
    # should win double original bet
    assert response["balance"] == 105


def test_double_down():
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))

    response = index.play(
        json={
            "type": "DOUBLE",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
        },
        deck_nums=[9, 10],
    )

    assert response["deck"] == []
    assert response["status"] == "WIN"
    assert response["player_cards"] == index.serialize_cards(make_cards([4, 5, 10]))
    assert response["dealer_cards"] == index.serialize_cards(make_cards([6, 7, 9]))
    assert response["player_total"] == 19
    assert response["dealer_total"] == 22
    assert response["balance"] == 110


body_data = [
    ("type is required", {"foo": "bar"}),
    ("bet and balance are required", {"type": "deal"}),
    ("bet and balance are required", {"type": "deal", "bet": 5}),
    ("bet and balance are required", {"type": "deal", "balance": 100}),
    (
        "player_cards and dealer_cards are required",
        {"type": "hit", "bet": 5, "balance": 100},
    ),
    (
        "player_cards and dealer_cards are required",
        {"type": "hit", "bet": 5, "balance": 100, "player_cards": []},
    ),
    (
        "player_cards and dealer_cards are required",
        {"type": "hit", "bet": 5, "balance": 100, "dealer_cards": []},
    ),
]


@pytest.mark.parametrize("match, body", body_data)
def test_validate_body(match, body):
    with pytest.raises(Exception, match=match):
        index.validate_body(body)


class TestValidation:
    def test_complete_body_deal(self):
        assert index.validate_body({"type": "DEAL", "bet": 5, "balance": 100}) is None

    def test_complete_body_non_deal(self):
        assert (
            index.validate_body(
                {
                    "type": "HIT",
                    "bet": 5,
                    "balance": 100,
                    "player_cards": [],
                    "dealer_cards": [],
                    "deck": [1, 2, 3],
                }
            )
            is None
        )

    def test_valid_deck_input(self):
        assert index.validate_deck_input([1, 2, 3]) is None

    def test_invalid_deck_input(self):
        with pytest.raises(Exception, match="list of numbers"):
            index.validate_deck_input("1,2,3")
