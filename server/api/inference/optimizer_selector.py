import tensorflow as tf 

def optimizerSelector(optimizerType, leraningRate):
    if optimizerType == 'Adam':
            return tf.keras.optimizers.Adam(learning_rate=learning_rate)
    elif optimizerType == 'SGD':
            return tf.keras.optimizers.SGD(learning_rate=learning_rate)
    elif optimizerType == 'RMSProp':
            return tf.keras.optimizers.RMSprop(learning_rate=learning_rate)
    elif optimizerType == 'Adadelta':
            return tf.keras.optimizers.Adadelta(learning_rate=learning_rate)
    elif optimizerType == 'Adagrad':
            return tf.keras.optimizers.Adagrad(learning_rate=learning_rate)
    elif optimizerType == 'Nadam':
            return tf.keras.optimizers.Nadam(learning_rate=learning_rate)
    elif optimizerType == 'AdaMax':
            return tf.keras.optimizers.AdaMax(learning_rate=learning_rate)