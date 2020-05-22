import tensorflow as tf 
from .datasetUtil import dataset , filelength
from tensorflow.keras.applications import VGG16,VGG19 ,InceptionV3
class inference_load():
    def __init__(self,params,csvPath):
        self.csvPath = 'E:\Foto\Tensorflow_Train_Tool\server\dataset\dataset.csv'
        self.model = params['model'] 
        self.inputShape = (int(params['inputShape']),int(params['inputShape']),3)
        self.include_top = False
        self.loss = params['loss']
        self.optimizer = params['optimizer']
        self.batch_size = int(params['batch_size'])
        #self.metrics = [metric for metric in params['metrics']]
        self.metrics = ['acc']
        self.n_classes = params['n_classes']
        self.modelOutputPath = 'results/saved_model.h5'
        self.learning_rate = 0.001
        self.epochs = int(params['epochs'])
        
    def load(self,x):        
        if(self.model.lower() == 'vgg16'):
            model = VGG16(include_top=self.include_top,input_shape = self.inputShape,input_tensor=x)
            return model 
        elif(self.model.lower() == 'vgg19'):
            model = VGG19(include_top=self.include_top,input_shape = self.inputShape,input_tensor=x)
            return model
        elif(self.model.lower() == 'inception'):
            model = InceptionV3(include_top=self.include_top,input_shape=self.inputShape,input_tensor=x)
            return model
    def lossParser(self):
        if self.loss == 'Categorical Cross Entropy':
            return 'categorical_crossentropy'
        elif self.loss == 'Binary Cross Entropy':
            return 'binary_crossentropy'
        elif self.loss == 'Hinge':
            return 'categorical_hinge'
        elif self.loss == 'Mean Square Error':
            return 'mean_squared_error'
    def OptimizerSelector(self):
        if self.optimizer == 'Adam':
            return tf.keras.optimizers.Adam(learning_rate=self.learning_rate)
        elif self.optimizer == 'SGD':
            return tf.keras.optimizers.SGD(learning_rate=self.learning_rate)
        elif self.optimizer == 'RMSProp':
            return tf.keras.optimizers.RMSprop(learning_rate=self.learning_rate)
        elif self.optimizer == 'Adadelta':
            return tf.keras.optimizers.Adadelta(learning_rate=self.learning_rate)
        elif self.optimizer == 'Adagrad':
            return tf.keras.optimizers.Adagrad(learning_rate=self.learning_rate)
        elif self.optimizer == 'Nadam':
            return tf.keras.optimizers.Nadam(learning_rate=self.learning_rate)
        elif self.optimizer == 'AdaMax':
            return tf.keras.optimizers.AdaMax(learning_rate=self.learning_rate)
    def run(self):
        trainDataset , testDataset = dataset(self.csvPath,self.batch_size,self.inputShape[:2])
        file_length = filelength(self.csvPath)

        x = tf.keras.Input(shape=self.inputShape)
        model = self.load(x)
        flat_layer = tf.keras.layers.Flatten()(model.layers[-1].output)
        fc = tf.keras.layers.Dense(int(self.n_classes),activation='softmax')(flat_layer)
        steps_per_epoch = int(file_length/ int(self.batch_size ))
        model = tf.keras.Model(inputs=x,outputs=fc)
        model.compile(loss=self.lossParser(),metrics=self.metrics,optimizer=self.OptimizerSelector())
        model.summary()
        model.fit_generator(
            trainDataset,
            validation_data=testDataset,
            validation_steps=5,
            epochs=self.epochs,
            steps_per_epoch=steps_per_epoch,
            callbacks= [callback]
            )
        model.save(self.modelOutputPath)    