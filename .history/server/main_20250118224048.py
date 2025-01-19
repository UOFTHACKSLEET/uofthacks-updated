from flask import Flask, jsonify, request
import scripts.controller 
from flask_cors import CORS

app = Flask(__name__) #create app instance 
cors = CORS(app, origins='*')
app.config['UPLOAD_FOLDER'] = './uploads'

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

@app.route('api/upload-resume', methods=['POST'])
def upload_resume(): 
    if 'file' not in request.files: 
        return jsonify(
            {
                "message": "No file part"
            }
        )
    file = request.files['file']
    
    if file: 
        filename = file.filename
        path = f"{app.config['UPLOAD_FOLDER']}/{filename}"
        file.save(path)
        
        return jsonify(
            {
                "message": f"{filename} uploaded successfully"
            }
        )

if __name__ == '__main__':
    app.run(debug=True, port=8000)