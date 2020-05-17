import server
import pytest
from .test_helpers import make_cards
from game.cards import Deck


@pytest.fixture
def client():
    with server.app.test_client() as client:
        yield client


# TODO: Move this test to the end, hit/stay/double should work without having dealt
def test_deal(client):
    result = client.post("/game", json={"type": "DEAL", "bet": 5, "balance": 100})
    data = result.get_json()["data"]
    assert "player_cards" in data
    assert "dealer_cards" in data
    assert "status" in data
    assert "balance" in data
    assert len(data["deck"]) > 0
    assert type(data["player_total"]) == int
    assert type(data["dealer_total"]) == int
    assert all(type(num) == int for num in data["deck"])


def test_hit(client):
    player_cards = server.serialize_cards(make_cards([4, 5]))
    dealer_cards = server.serialize_cards(make_cards([6, 7]))
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
    assert data["player_cards"] == server.serialize_cards(make_cards([4, 5, 8]))
    assert data["dealer_cards"] == dealer_cards
    assert data["player_total"] == 17
    assert data["dealer_total"] == 13
    # TODO: Not sure balance/bet is needed
    # assert "balance" in data
    # assert "bet" in data


def test_stay(client):
    player_cards = server.serialize_cards(make_cards([4, 5]))
    dealer_cards = server.serialize_cards(make_cards([6, 7]))
    deck = [9, 8]

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

    assert data["deck"] == [9]
    assert data["status"] == "LOSE"
    assert data["player_cards"] == player_cards
    assert data["dealer_cards"] == server.serialize_cards(make_cards([6, 7, 8]))
    assert data["player_total"] == 9
    assert data["dealer_total"] == 21
    assert data["balance"] == 90
    # TODO: Not sure balance/bet is needed
    # assert "balance" in data
    # assert "bet" in data


def test_double_down(client):
    player_cards = server.serialize_cards(make_cards([4, 5]))
    dealer_cards = server.serialize_cards(make_cards([6, 7]))
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
    assert data["player_cards"] == server.serialize_cards(make_cards([4, 5, 8]))
    assert data["dealer_cards"] == server.serialize_cards(make_cards([6, 7, 9]))
    assert data["player_total"] == 17
    assert data["dealer_total"] == 22
    assert data["balance"] == 105


def test_validate_integration(client):
    result = client.post("/game")
    json = result.get_json()
    assert json["status_code"] == 400
    assert json["message"] == "body is required"


# TODO: parameterize


class TestValidation:
    def test_complete_body(self):
        with pytest.raises(Exception, match="type is required"):
            server.validate_body({"foo": "bar"})
        with pytest.raises(Exception, match="bet is required"):
            server.validate_body({"type": "DEAL"})
        with pytest.raises(Exception, match="balance is required"):
            server.validate_body({"type": "DEAL", "bet": 5})

        assert server.validate_body({"type": "DEAL", "bet": 5, "balance": 100}) is None

        with pytest.raises(Exception, match="player_cards is required"):
            server.validate_body({"type": "HIT", "bet": 5, "balance": 100})
        with pytest.raises(Exception, match="dealer_cards is required"):
            server.validate_body(
                {"type": "HIT", "bet": 5, "balance": 100, "player_cards": []}
            )
        with pytest.raises(Exception, match="deck is required to be a list of numbers"):
            server.validate_body(
                {
                    "type": "HIT",
                    "bet": 5,
                    "balance": 100,
                    "player_cards": [],
                    "dealer_cards": [],
                }
            )
        with pytest.raises(Exception, match="deck is required to be a list of numbers"):
            server.validate_body(
                {
                    "type": "HIT",
                    "bet": 5,
                    "balance": 100,
                    "player_cards": [],
                    "dealer_cards": [],
                    "deck": "foo",
                }
            )

        assert (
            server.validate_body(
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
