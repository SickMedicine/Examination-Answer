from flask import Flask, request, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/<method>', methods=['POST'])
def api_method(method):
    id_instance = request.json.get('idInstance')
    api_token_instance = request.json.get('ApiTokenInstance')
    url = f'https://api.green-api.com/{id_instance}/{method}'

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_token_instance}'
    }

    if method in ['getSettings', 'getStateInstance']:
        response = requests.get(url, headers=headers)
    elif method in ['sendMessage', 'sendFileByUrl']:
        response = requests.post(url, headers=headers, json=request.json.get('body'))
    else:
        return jsonify({'error': 'Invalid method'}), 400

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
