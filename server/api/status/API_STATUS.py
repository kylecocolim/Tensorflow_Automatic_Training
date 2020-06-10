from flask import Blueprint,request
from .isGPUAvailable import status_checker
from .saved_model_Checker import is_exist_saved_Model

blueprint_api_status = Blueprint('api_status',__name__)
statusCache = {}
statusCache['GPU'] = status_checker()
statusCache['Train'] = False
statusCache['SavedModel'] = is_exist_saved_Model()

@blueprint_api_status.route('/api/status/gpustatus',methods=['GET'])
def Sendgpustatus():
    if statusCache['GPU'] == True:
        return 'true'
    else:
        return 'false'
@blueprint_api_status.route('/api/status/iscurrentTraining',methods=['GET'])
def SendTrainingStatus():
    if statusCache['Train'] == True:
        return 'true'
    else:
        return 'false'

@blueprint_api_status.route('/api/status/setTrainingStatus',methods=['POST'])
def SETTrainingStatus():
    data = request.data.decode('utf-8')
    print(data)
    if len(data) != 0:
        if data == 'True':
            statusCache['Train'] = True 
            return 'OK'
        elif data == 'False':
            print('False')
            statusCache['Train'] = False 
            return 'OK'
        else: 
            return 'Type Error'
    else:
        return 'Empty Data'

@blueprint_api_status.route('/api/status/issavedmodelexist',methods=['GET'])
def SendTrainedModel():
    statusCache['SavedModel'] = is_exist_saved_Model()
    if statusCache['SavedModel'] == True:
        return 'true'
    else:
        return 'false'