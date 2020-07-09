import tensorflow as tf 
import json
import requests
class CustomCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self,epoch,logs=None):
        data = dict()
        data['epoch'] = str(epoch)
        data['loss'] = str(logs['loss'])
        data['accuracy'] = str(logs['acc'])
        data['val_loss'] = str(logs['val_loss'])
        data['val_acc'] = str(logs['val_acc'])
        json_data = json.dumps(data)
        requests.post('http://localhost:5000/api/inference/callbacks/set_epoch_loss',json=json_data)
  