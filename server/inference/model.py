import tensorflow as tf 
from dataset import dataset , filelength
from tensorflow.keras.applications import VGG16,VGG19 ,Inception

class inference_load():
    def __init__(self,csvPath,model,inputShape,include_top ,epochs,loss,optimizer,batch_size,metrics,n_classes,modelOutputPath):
        self.csvPath = csvPath
        self.model = model 
        self.inputShape = (int(inputShape),int(inputShape),3)
        self.include_top = include_top
        self.loss = loss
        self.optimizer = optimizer
        self.batch_size = batch_size
        self.metrics = [metric for metric in metrics]
        self.n_classes = n_classes
        self.modelOutputPath = modelOutputPath
        self.epochs = epochs
    def load(self,x):
        print("model : {}, InputShape : {}".format(self.model,self.inputShape))
        
        if(self.model.lower() == 'vgg16'):
            model = VGG16(include_top=self.include_top,input_shape = self.inputShape)
        elif(self.model.lower() == 'vgg19'):
            model = VGG19(include_top=self.include_top,input_shape = self.inputShape)
        elif(self.mdoel.lower() == 'inception'):
            model = Inception(include_top=self.include_top,input_shape=self.inputShape)

        return model

    def run(self):

        trainDataset , testDataset = dataset(self.csvPath,self.batch_size)
        filelength = filelength(self.csvPath)

        x = tf.keras.Input(shape=self.inputShape)
        model = self.load(x)
        flat_layer = tf.keras.layers.Flatten()(model.layers[-1].output)
        fc = tf.keras.layers.Dense(n_classes,activation='softmax')(flat_layer)
        step_per_epoch = int(len(filelength)/ self.batch_size )
        model = tf.keras.Model(inputs=x,outputs=fc)
        model.compile(loss=self.loss,metrics=self.metrics,optimizer=self.optimizer)
        model.summary()
        model.fit_generator(trainDataset,validation_data=testDataset,validation_steps=5,epochs=self.epochs,steps_per_epoch=steps_per_epoch)
