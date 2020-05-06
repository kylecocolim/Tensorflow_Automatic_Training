from flask import Flask ,send_from_directory, request
from flask_cors import CORS
import os 
app = Flask(__name__,static_folder='../client/build') 
# Apply CORS
CORS(app)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
@app.route('/api', methods=['POST','GET'])
def receivetest():
    if request.method == 'POST':
        print('Connected')
        json_data = request.get_json()
        print(json_data['payload'])
        return 'OK'
if __name__ == "__main__":
    app.run(debug=True,port=3000)