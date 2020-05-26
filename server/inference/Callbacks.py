import tensorflow as tf 
import json
import requests
class CustomCallback(tf.keras.callbacks.Callback):
    def on_batch_end(self,batch,logs=None):
        data = dict()
        data['batch'] = str(batch)
        data['loss'] = str(logs['loss'])
        json_data = json.dumps(data)

        requests.post('http://localhost:5000/api/callbacks/set_loss',json=json_data)
