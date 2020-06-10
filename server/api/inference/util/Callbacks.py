import tensorflow as tf 
import json
import requests
class CustomCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self,epoch,logs=None):
        data = dict()
        data['epoch'] = str(epoch)
        data['loss'] = str(logs['loss'])
      #  data['accuracy'] = str(logs['accuracy'])
        json_data = json.dumps(data)
        requests.post('http://localhost:5000/api/inference/callbacks/set_epoch_loss',json=json_data)
    def on_batch_end(self,batch,logs=None):
        
        if batch % 200 == 0:
            data = dict()
            data['batch'] = str(batch)
            data['loss'] = str(logs['loss'])
      
            json_data = json.dumps(data)
            requests.post('http://localhost:5000/api/inference/callbacks/set_batch_loss',json=json_data)
 