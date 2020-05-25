import server
import pytest
from routes import index
from game.cards import Deck, Card, make_cards


@pytest.fixture
def client():
    with server.app.test_client() as client:
        yield client


def test_deal(client):
    result = client.post("/game", json={"type": "DEAL", "bet": 5, "balance": 100})
    data = result.get_json()["data"]
    assert "player_cards" in data
    assert "dealer_cards" in data
    assert "status" in data
    # If gameplay is updated to win on BLACKJACK after deal, this test
    # becomes nondeterministic. One solution is include Deck in deal
    assert data["balance"] == 95
    assert len(data["deck"]) > 0
    assert type(data["player_total"]) == int
    assert type(data["dealer_total"]) == int
    for num in data["deck"]:
        assert type(num) == int


def test_hit(client):
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))
    deck = [9, 8]

    result = client.post(
        "/game",
        json={
            "type": "HIT",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
            "deck": deck,
        },
    )
    data = result.get_json()["data"]

    # Original cards should be in hand, plus one removed from deck
    assert data["deck"] == [9]
    assert data["status"] == "PLAYING"
    assert data["player_cards"] == index.serialize_cards(make_cards([4, 5, 8]))
    assert data["dealer_cards"] == dealer_cards
    assert data["player_total"] == 17
    assert data["dealer_total"] == 13
    assert data["balance"] == 95


def test_stay(client):
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))
    deck = [8, 9]

    result = client.post(
        "/game",
        json={
            "type": "STAY",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
            "deck": deck,
        },
    )
    data = result.get_json()["data"]

    assert data["deck"] == [8]
    assert data["status"] == "WIN"
    assert data["player_cards"] == player_cards
    assert data["dealer_cards"] == index.serialize_cards(make_cards([6, 7, 9]))
    assert data["player_total"] == 9
    assert data["dealer_total"] == 22
    # Should win double original bet
    assert data["balance"] == 105


def test_double_down(client):
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))
    deck = [9, 8]

    result = client.post(
        "/game",
        json={
            "type": "DOUBLE",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
            "deck": deck,
        },
    )
    data = result.get_json()["data"]

    assert data["deck"] == []
    assert data["status"] == "WIN"
    assert data["player_cards"] == index.serialize_cards(make_cards([4, 5, 8]))
    assert data["dealer_cards"] == index.serialize_cards(make_cards([6, 7, 9]))
    assert data["player_total"] == 17
    assert data["dealer_total"] == 22
    assert data["balance"] == 110


def test_validate_integration(client):
    result = client.post("/game")
    json = result.get_json()

    assert json["status_code"] == 400
    assert json["message"] == "body is required"


body_data = [
    ("type is required", {"foo": "bar"}),
    ("bet and balance are required", {"type": "DEAL"}),
    ("bet and balance are required", {"type": "DEAL", "bet": 5}),
    ("bet and balance are required", {"type": "DEAL", "balance": 100}),
    (
        "player_cards and dealer_cards are required",
        {"type": "HIT", "bet": 5, "balance": 100},
    ),
    (
        "player_cards and dealer_cards are required",
        {"type": "HIT", "bet": 5, "balance": 100, "player_cards": []},
    ),
    (
        "player_cards and dealer_cards are required",
        {"type": "HIT", "bet": 5, "balance": 100, "dealer_cards": []},
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
