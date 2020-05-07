import tensorflow as tf 
from tensorflow.keras.layers import Conv2D, MaxPool2D, Dense, Flatten, Input 

class CustomModel():
    def __init__(self,inputShape,layerSeq):
        self.inputShape = inputShape
        self.layerSequence = layerSeq 

    # Custom Layer
    def InputLayer(self):
        return Input(self.inputShape)
    def ConvolutionLayer(self,x,filterSize,kernel_size,strides,padding,nameScope,activation):
        return Conv2D(
            filter=filterSize,
            kernel_size=kernel_size,
            strides=strides,
            padding=padding,
            name=nameScope,
            activation=activation)(x)

    def MaximumPoolingLayer(self,x,pool_size,strides,padding,nameScope):
        return Maxpool2D(
            pool_size=pool_size,
            strides=strides,
            padding=padding,
            nameScope=nameScope)(x)
    
    def FlattenLayer(self,x):
        return Flatten()(x)

    def DenseLayer(self,x,filterSize,activation):
        return Dense(filter=filterSize,activation=activation)(x)
    
   

if __name__ =="__main__":
    inputShape =(300,300,3)
    modelName = ['input','Conv','MaxPool','Conv']
    filterSize = [256,0,256]
    padding = ["SAME","SAME","SAME"]
    strides = [1,2,1]
    activation = ["relu",None,"relu"]
    seq = []
    for i in range(len(filterSize)):
        seq.append([modelName[i+1],filterSize[i],padding[i],strides[i],activation[i]])
    model_Constructor = CustomModel(300,seq)
    model_Constructor.ConstructModel()