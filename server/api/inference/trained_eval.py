import tensorflow as tf 
import pandas as pd 
import random
import cv2 

class eval():
    def __init__(self,modelPath=None):
        self.modelPath = modelPath 
        self.csvPath = 'dataset/dataset.csv'
    def setModel(self,modelPath):
        self.modelPath = modelPath
    def restore_model(self):
        return tf.keras.models.load_model(self.modelPath)
    def load_label_map(self):
        label_map = open('dataset/labelmap.pbtxt')
        label = {}
        idx = 0
        for line in label_map.readlines():
            line = line.replace(' ','').replace('\n','')
            if line[:4] == 'name':
                label[idx] = line[5:]
                idx +=1
        return label
    def readCSV(self):
        filelist = pd.read_csv(self.csvPath)
        return filelist['filename']
    def run(self):
        model = self.restore_model()
        filelist = self.readCSV()
        randImg = filelist.iloc[random.randint(0,len(filelist)-1)]
        image = tf.expand_dims(cv2.resize(cv2.imread(randImg) /255,(150,150)),axis=0)
        predict = model.predict(image)
        result = tf.argmax(predict,1)
        acc = predict[0][result.numpy()]
        labelMap = self.load_label_map()
        result = {
            'predict' : acc,
            'result' : labelMap[result.numpy()[0]],
            'filepath': randImg 
        }
        return result
