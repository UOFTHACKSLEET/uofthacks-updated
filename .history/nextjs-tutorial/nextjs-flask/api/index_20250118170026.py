from flask import Flask
import math 
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return f"<p>Hello, World! {math.sqrt(4)}</p>"