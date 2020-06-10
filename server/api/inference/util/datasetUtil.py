import tensorflow as tf 
import numpy as np 
import pandas as pd 
from PIL import Image
import os 
import cv2
import random
def dataset(csvPath,evalPath,batch_size,inputShape):
    filelist = pd.read_csv(csvPath,dtype=str)
    n_classes = pd.read_csv(csvPath)['class'].max() + 1
    TestSliceIndex = int(len(filelist)*0.1)

    if(evalPath != None):
        test = pd.read_csv(evalPath,dtype=str)       
    else: 
        test = filelist.sample(TestSliceIndex)
    # Rescale = Normalize /.255 
    image_gen = tf.keras.preprocessing.image.ImageDataGenerator(rescale= 1./255)
    trainDataset = image_gen.flow_from_dataframe(filelist,batch_size=batch_size ,target_size=inputShape,shuffle=True)
    testDataset = image_gen.flow_from_dataframe(test,target_size=inputShape)
    
    return trainDataset,testDataset
def filelength(csvPath):
    return len(pd.read_csv(csvPath))
# Test Code
if __name__ == "__main__":
    csvPath = "../dataset/dataset.csv"
    print(filelength(csvPath))
