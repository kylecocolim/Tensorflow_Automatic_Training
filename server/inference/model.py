import tensorflow as tf 
from tensorflow.keras.applications import VGG16,VGG19 

class inference_load():
    def __init__(self,model,inputShape):
        self.model = model 
        self.inputShape = (int(inputShape),int(inputShape),3)
    
    def load(self):
        print("model : {}, InputShape : {}".format(self.model,self.inputShape))
        
        if(self.model.lower() == 'vgg16'):
            model = VGG16(include_top=False,input_shape = self.inputShape)
            model.summary()
        elif(self.model.lower() == 'vgg19'):
            model = VGG19(include_top=False,input_shape = self.inputShape)
            model.summary() 
    
        return model
