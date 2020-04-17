from flask import Flask, jsonify, request
from flask_cors import CORS
from game import Game

app = Flask(__name__)
CORS(app)

def serialize_cards(cards):
    return list(map(lambda c: {'value': c.value, 'face': c.face, 'suit': c.suit}, cards));

# global.game = None

@app.route('/game', methods=['POST'])
def index():
    if request.get_json()['type'] == 'DEAL':
        game = Game()
        game.start_server()
        player_cards = serialize_cards(game.player.cards)
        dealer_cards = serialize_cards(game.dealer.cards)
        return jsonify(data={'player': player_cards, 'dealer': dealer_cards})
    if request.get_json()['type'] == 'HIT':
        # global game.player_go()
        player_cards = serialize_cards(game.player.cards)
        dealer_cards = serialize_cards(game.dealer.cards)
        return jsonify(data={'player': player_cards, 'dealer': dealer_cards})

if __name__ == '__main__':
    # debug=True will reload on change
    app.run(host='0.0.0.0', port=5000, debug=True)
