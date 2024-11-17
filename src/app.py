from flask import Flask, request, jsonify
from flask_cors import CORS
import midtransclient
import os
import random
import string
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/app": {"origins": "http://127.0.0.1:5500"}})
CORS(app, resources={r"/get-midtrans-key": {"origins": "http://127.0.0.1:5500"}})

def order_id(length=17):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

@app.route

@app.route('/get-midtrans-key', methods=['GET', 'OPTIONS'])
def get_midtrans_key():
    if request.method == 'OPTIONS':
        return '', 200
    ClientKey = os.getenv('MIDTRANS_CLIENT_KEY')
    return jsonify({'clientKey': ClientKey})

@app.route('/app', methods=['POST', 'OPTIONS'])
def create_transaction():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.json
    client_key = os.getenv("MIDTRANS_CLIENT_KEY")
    server_key = os.getenv("MIDTRANS_SERVER_KEY")
    snap = midtransclient.Snap(
        is_production=False,
        server_key=server_key 
    )
    param = {
        "transaction_details": {
            "order_id": order_id(),
            "gross_amount": data["total"]
        },
        "customer_details": {
            "first_name": data["name"],
            "email": data["email"],
            "phone": data["phone"]
        }
    }
    transaction = snap.create_transaction(param)
    transaction_token = transaction['token']

    return jsonify({"transaction_token": transaction_token})

if __name__ == "__main__":
    app.run(debug=True, port=5501)
