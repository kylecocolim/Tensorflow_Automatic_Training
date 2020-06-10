from flask import Blueprint, request
import requests
import json
import glob
from .model import inference_load
from .trained_eval import eval
blueprint_api_inference = Blueprint('api_inference',__name__)

cache = {}
cache['TotalEpochs'] = 0
cache['currentEpochs'] = 0
cache['trainfinishStatus'] = True
cache['trainStat'] = []
cache['defaultcsvPath'] = "../server/dataset/dataset.csv"



@blueprint_api_inference.route('/api/inference/evaluate',methods=['GET'])
def evaluate_Trained_Model():
    eval_model = eval(modelPath=glob.glob('server/results/*.h5')[-1])
    result = eval_model.run()
    if len(data) > 0:
        data = json.dumps(result)
        return data 
    else:
        return 'None'


@blueprint_api_inference.route('/api/inference/startTrain',methods=['POST'])
def trainStart():
    if request.method == 'POST':
        json_data = request.get_json()
        if len(json_data) >= 1:        
            cache['TotalEpochs'] = 0
            cache['currentEpochs'] = 0
            cache['trainStat'] = []
            model = inference_load(json_data['payload'],cache['defaultcsvPath'])
            cache['TotalEpochs'] = json_data['payload']['epochs']
            requests.post('http://localhost:5000/api/status/setTrainingStatus',data='True')
            cache['currentEpochs'] = 1
            cache['trainfinishStatus'] = True
            error = model.run()
            cache['trainfinishStatus'] = False
            if error == -1:
                return 'Empty Dataset'
        return 'Finish'


@blueprint_api_inference.route('/api/inference/callbacks/set_epoch_loss', methods=['POST'])
def train_status():
    json_data = request.get_json()
    json_data = json.loads(json_data)
    if cache['currentEpochs'] != cache['TotalEpochs']:
        cache['currentEpochs'] +=1
    #cache['trainStat'].append({
    #    'epoch' : int(json_data['epoch']),
    #    'loss' : float(json_data['loss'])
    #})
    return 'ok'
@blueprint_api_inference.route('/api/inference/callbacks/set_batch_loss', methods=['POST'])
def train_batch_status():
    json_data = request.get_json()
    json_data = json.loads(json_data)
    cache['trainStat'].append({
        'batch' : int(json_data['batch']),
        'loss' : float(json_data['loss'])
    })
    return 'ok'
@blueprint_api_inference.route('/api/inference/callback/train_stat',methods=['GET'])
def train_stat():
    if len(cache['trainStat']) > 0:
        stat = dict()
        stat['trainStat'] = cache['trainStat']
        stat['TotalEpoch'] = cache['TotalEpochs']
        stat['currentEpoch'] = cache['currentEpochs']
        stat['trainfinishStatus'] = cache['trainfinishStatus']
        data = json.dumps(stat)
        return data
    else:
        stat = dict()
        stat['trainfinishStatus'] = cache['trainfinishStatus']
        stat['TotalEpoch'] = cache['TotalEpochs']
        stat['currentEpoch'] = cache['currentEpochs']
        data = json.dumps(stat)
        return data
    