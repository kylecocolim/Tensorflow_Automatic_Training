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
curr_loss = float()
curr_batch = int()
epochs = int()
accuracy = float()
modelName = str()
training_status = False

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
            modelName = json_data['payload']['model']      
            model = inference_load(json_data['payload'],csvPath)
            training_status = True 
            error = model.run()
            if error == -1:
                return 'Empty Dataset'
        return 'Done'
@app.route('/api/gpu_status', methods=['GET'])
def GPUstatus(): 
    status = status_checker()
    print(status)
    return status

@app.route('/api/callback/training_status',methods =['GET'])
def isTraining():
    return training_status

@app.route('/api/callback/train_stat',methods=['GET'])
def train_stat():
    if training_status == True:
        stat = dict()
        stat['epochs'] = epochs
        stat['curr_loss'] = curr_loss
        stat['curr_batch'] = curr_batch
        
        data = json.dumps(stat)
        return data
    else:
        return 'Not Started'

@app.route('/api/callbacks/set_loss', methods=['POST'])
def train_status():
    json_data = request.get_json()
    json_data = json.loads(json_data)
    loss = float(json_data['loss'])
    batch = float(json_data['batch'])
    return 'ok'
@app.route('/api/callbacks/set_epoch', methods=['POST'])
def set_epoch():
    json_data = request.get_json()
    json_data = json.loads(json_data)
    epochs = int(json_data['epochs'])
    accuracy = float(json_data['accuracy'])
    return 'ok'
if __name__ == "__main__":
    app.run(debug=True,port=5000)