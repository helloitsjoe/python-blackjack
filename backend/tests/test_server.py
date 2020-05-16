import server
import pytest
from .test_helpers import make_cards


@pytest.fixture
def client():
    with server.app.test_client() as client:
        yield client


def test_validate_body_request(client):
    result = client.post("/game")
    json = result.get_json()
    assert json["status_code"] == 400
    assert json["message"] == "Body is required"


# TODO: Move this test to the end, hit/stay/double should work without having dealt
def test_deal(client):
    result = client.post("/game", json={"type": "DEAL", "bet": 5, "balance": 100})
    data = result.get_json()["data"]
    assert "player_cards" in data
    assert "dealer_cards" in data
    assert len(data["deck"]) > 0
    assert all(type(num) == int for num in data["deck"])


def test_hit(client):
    player_cards = server.serialize_cards(make_cards([4, 5]))
    dealer_cards = server.serialize_cards(make_cards([6, 7]))
    result = client.post(
        "/game",
        json={
            "type": "HIT",
            "player_cards": player_cards,
            "dealer_cards": dealer_cards,
            # "deck": deck,
            "bet": 5,
            "balance": 95,
        },
    )
    data = result.get_json()["data"]
    assert "card" in data
    assert "player_total" in data
    assert "status" in data
    # assert data["cards"] == [1, 2, 3]


# def test_stay(client):
#     result = client.post("/game", json={"type": "STAY"})
#     data = result.get_json()["data"]
#     assert len(data["player_cards"]) == 2
#     assert "dealer_cards" in data
#     assert "dealer_total" in data
#     assert "balance" in data
#     assert "status" in data


# def test_double_down(client):
#     result = client.post("/game", json={"type": "DOUBLE"})
#     data = result.get_json()["data"]
#     assert "dealer_cards" in data
#     assert "dealer_total" in data
#     assert "balance" in data
#     assert "status" in data


class TestValidation:
    def test_complete_body(self):
        with pytest.raises(Exception, match="Type is required"):
            server.validate_body({"foo": "bar"})
        with pytest.raises(Exception, match="Bet is required"):
            server.validate_body({"type": "DEAL"})
        with pytest.raises(Exception, match="Balance is required"):
            server.validate_body({"type": "DEAL", "bet": 5})

        assert server.validate_body({"type": "DEAL", "bet": 5, "balance": 100}) is None

        with pytest.raises(Exception, match="player_cards is required"):
            server.validate_body({"type": "HIT", "bet": 5, "balance": 100})
        with pytest.raises(Exception, match="dealer_cards is required"):
            server.validate_body(
                {"type": "HIT", "bet": 5, "balance": 100, "player_cards": []}
            )
