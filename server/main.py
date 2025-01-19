from flask import Flask, jsonify, request
# import scripts.controller 
from flask_cors import CORS

app = Flask(__name__) #create app instance 
CORS(app)
app.config['UPLOAD_FOLDER'] = './uploads'

@app.route('/api/users', methods=['GET'])
def users(): 
    return jsonify(
        {
            "wpm": 100, 
            "tips": [
                "Speak clearly", 
                "Eat clearly"
            ],
            "resume": "I think you should use statistics to show your impact"
        }
    )

@app.route('/api/upload-resume', methods=['POST'])
def upload_resume(): 
    if 'file' not in request.files: 
        return jsonify(
            {
                "message": "No file part"
            }
        ), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify(
            {
                "message": "No selected file"
            }
        ), 400
    
    if file:
        filename = file.filename
        path = f"{app.config['UPLOAD_FOLDER']}/{filename}"
        
        try:
            file.save(path)
        except Exception as e:
            return jsonify(
                {
                    "message": f"An error occurred while saving the file: {str(e)}"
                }
            ), 500
        
        return jsonify(
            {
                "message": f"{filename} uploaded successfully"
            }
        ), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)