import datetime
import os
import sqlite3

from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_mongoengine import MongoEngine

app = Flask(__name__)
cors = CORS(app, resource={r"/api": {"origins": "*"}})
app.config.from_pyfile('config.py')

db = MongoEngine()
db.init_app(app)

class ServiceAreaApiResult(db.Document):
    date = db.DateTimeField(default=datetime.datetime.now)
    success = db.IntField(required=True)

def insert_service_area_result(result):
    document = ServiceAreaApiResult(success=result)
    print(document)
    document.save()

@app.route("/api", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.json)
        success = request.json["result"]
        print('Are we succesful?')
        print(success)
        insert_service_area_result(success)
    
    # Get a count of all records, success and failures
    count = ServiceAreaApiResult.objects().count()

    # Return a JSON object containing the count for POST and GET requests
    return jsonify({'count': count})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
