import pytest
import os
from redis_client import RedisClient


# Simple redis mock for now - no mset or hset
# since we're only using it for the stringified deck
class MockRedis:
    def set(self, key, value):
        pass

    def get(self, key):
        return "1,2,3"


def test_set_list(mocker):
    mock_redis = MockRedis()
    set_spy = mocker.spy(mock_redis, "set")
    r = RedisClient(redis=mock_redis)
    r.set_list("foo", [1, 2, 3])
    set_spy.assert_called_with("foo", "1,2,3")


def test_get_list():
    mock_redis = MockRedis()
    r = RedisClient(redis=mock_redis)
    list = r.get_list("foo")
    assert list == [1, 2, 3]


def test_local_client(mocker):
    mocker.patch.dict(os.environ, {"LOCAL": "true"})
    r = RedisClient()
    r.set_list("bar", [4, 5, 6])
    assert r.get_list("bar") == [4, 5, 6]
