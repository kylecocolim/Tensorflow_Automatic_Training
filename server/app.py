from flask import Flask ,send_from_directory, request
from flask_cors import CORS
from inference.model import inference_load
from inference.isGPUAvailable import status_checker
import json
import os 
app = Flask(__name__,static_folder='../client/build') 
# Apply CORS

# Params 
# Will be Updated by Funcation and Dictionary
csvPath = str()
cache = {}
cache['frontCurrEpochs'] = int()
cache['training_status'] = False
cache['loss'] = []
cache['epochs'] = []
cache['accuracy'] = []
CORS(app)

# Static Folder Serve
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api', methods=['POST','GET'])
def trainStart():
    if request.method == 'POST':
        json_data = request.get_json()
        if len(json_data) >= 1:  
            modelName = json_data['payload']['model']      
            model = inference_load(json_data['payload'],csvPath)
            cache['training_status'] = True 
            error = model.run()
            if error == -1:
                return 'Empty Dataset'
        return 'Done'

@app.route('/api/gpu_status', methods=['GET'])
def GPUstatus(): 
    status = status_checker()
    if status == 'True':
        return 'true'
    elif status == 'False':
        return 'false'
    else:
        return 'None'
@app.route('/api/training_status',methods=['GET'])
def getTrainingStatus():
    if cache['training_status'] == True:
        return 'true'
    elif cache['training_status'] == False:
        return 'false'
    else:
        return 'None'
        
@app.route('/api/callback/train_stat',methods=['GET'])
def train_stat():
    if cache['training_status'] == True:
        stat = dict()
        stat['epoch'] = cache['epochs']
        stat['loss'] = cache['loss']
        stat['accuracy'] = cache['accuracy']
        data = json.dumps(stat)
        return data
    else:
        return 'Not Started'

@app.route('/api/callbacks/set_loss', methods=['POST'])
def train_status():
    json_data = request.get_json()
    json_data = json.loads(json_data)
    cache['loss'].extend([float(json_data['loss'])])
    return 'ok'
@app.route('/api/callbacks/set_epoch', methods=['POST'])
def set_epoch():
    json_data = request.get_json()
    json_data = json.loads(json_data)
    cache['epochs'].extend([int(json_data['epochs'])])
    cache['loss'].extend([float(json_data['loss'])])
    cache['accuracy'].extend([float(json_data['accuracy'])])
    return 'ok'
@app.route('/api/set_frontepochs',methods=['POST'])
def set_frontepochs():
    json_data = request.get_json()
    json_data = json.load(json_data)
    cache['frontCurrEpochs'] = json_data['epoch']
    return 'Done'

if __name__ == "__main__":
    app.run(debug=True,port=5000)