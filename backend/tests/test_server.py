from server import make_server
import pytest
from routes import index
from game.cards import Deck, Card, make_cards


@pytest.fixture
def client():
    class MockRedisClient:
        def set_list(self, key, value):
            pass

        def get_list(self, key):
            return [9, 10]

    with make_server(redis_client=MockRedisClient()).test_client() as client:
        yield client


# A few basic integration tests. See test_index.py for the real tests
def test_deal(client):
    result = client.post("/game", json={"type": "DEAL", "bet": 5, "balance": 100})
    data = result.get_json()["data"]
    assert "status" in data
    assert "balance" in data
    assert "player_cards" in data
    assert "player_total" in data
    assert "dealer_cards" in data
    assert "dealer_total" in data
    assert "deck" not in data


def test_hit(client):
    player_cards = index.serialize_cards(make_cards([4, 5]))
    dealer_cards = index.serialize_cards(make_cards([6, 7]))

    result = client.post(
        "/game",
        json={
            "type": "HIT",
            "bet": 5,
            "balance": 95,
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
        },
    )
    data = result.get_json()["data"]

    assert "status" in data
    assert "balance" in data
    assert "player_cards" in data
    assert "player_total" in data
    assert "dealer_cards" in data
    assert "dealer_total" in data
    assert "deck" not in data


def test_validate_integration(client):
    result = client.post("/game")
    json = result.get_json()

    assert json["status_code"] == 400
    assert json["message"] == "body is required"
