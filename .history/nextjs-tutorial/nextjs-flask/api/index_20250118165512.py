from flask import Flask
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    import math 
    return f"<p>Hello, World! {math.sqrt(4)}</p>"