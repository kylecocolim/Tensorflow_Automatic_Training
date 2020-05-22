from flask import Flask ,send_from_directory, request
from flask_cors import CORS
from inference.model import inference_load
from inference.isGPUAvailable import status_checker
import os 
app = Flask(__name__,static_folder='../client/build') 
# Apply CORS
csvPath = str()
CORS(app)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
@app.route('/api', methods=['POST','GET'])
def train():
    if request.method == 'POST':
        json_data = request.get_json()
        if len(json_data) >= 1:           
            model = inference_load(json_data['payload'],csvPath)
            model.run()
        return 'Start'
@app.route('/api/gpu_status', methods=['GET'])
def GPUstatus(): 
    status = status_checker()
    return status
@app.route('/api/train_status', methods=['POST'])
def print():
    print(request)
    

if __name__ == "__main__":
    app.run(debug=True,port=5000)