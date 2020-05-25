from redis import Redis
import os


class LocalRedis:
    def __init__(self):
        self.cache = {}

    def set(self, key, value):
        self.cache[key] = value

    def get(self, key):
        return self.cache.get(key, None)


class RedisClient:
    def __init__(self, host=None, redis=None):
        if os.environ.get("LOCAL"):
            print("Using local cache instead of Redis...", flush=True)
            self.redis = LocalRedis()
        else:
            self.redis = redis or Redis(host=host, decode_responses=True)

    def set_list(self, key, list):
        string_list = ",".join(map(str, list))
        self.redis.set(key, string_list)

    def get_list(self, key):
        string_list = self.redis.get(key)
        if not string_list:
            return None
        return list(map(int, string_list.split(",")))
