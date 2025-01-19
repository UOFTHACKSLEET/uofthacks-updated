from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__) #create app instance 
cors = CORS(app, origins='*')

@app.route('/api/users', methods=['GET'])
def users(): 
    return jsonify(
        {
            "users": [
                'zach', 
                'william', 
                'brian'
            ]
        }
    )

if __name__ == '__main__':
    app.run(debug=True, port=8000)