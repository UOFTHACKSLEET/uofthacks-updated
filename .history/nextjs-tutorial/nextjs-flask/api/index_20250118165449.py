from flask import Flask
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    import math 
    return "<p>Hello, World!</p>"