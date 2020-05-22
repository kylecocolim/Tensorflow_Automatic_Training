import tensorflow as tf 
import pandas as pd 
import cv2 

class eval():
    def __init__(self,modelPath):
        self.modelPath = modelPath 

    def restore_model(self):
        return tf.keras.models.load_model(self.modelPath)
    
    def run(self):
        model = self.restore_model()
        imgPath = 'E:/Foto/Tensorflow_Train_Tool/server/dataset/chest-xray-pneumonia/chest_xray/train/NORMAL/IM-0115-0001.jpeg'
        image = tf.expand_dims(cv2.resize(cv2.imread(imgPath) /255,(150,150)),axis=0)
        print(model.predict(image))
eval('../results/saved_model.h5').run()