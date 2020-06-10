import tensorflow as tf 

def status_checker():
    return tf.test.is_gpu_available()
   

