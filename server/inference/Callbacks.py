import tensorflow as tf 
import json
import requests
class CustomCallback(tf.keras.callbacks.Callback):
    def on_epoch_start(self,epoch,logs=None):
        data = dict()
        data['epoch'] = str(epoch)
        data['loss'] = str(logs['loss'])
        json_data = json.dumps(data)
        requests.post('http://localhost:5000/api/callbacks/set_loss',json=json_data)

    def on_epoch_end(self,epoch,logs=None):
        data = dict()
        data['epoch'] = str(epoch)
        data['loss'] = str(logs['loss'])
        json_data = json.dumps(data)
        requests.post('http://localhost:5000/api/callbacks/set_loss',json=json_data)
