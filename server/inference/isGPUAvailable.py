import tensorflow as tf 

def status_checker():
    status = tf.test.is_gpu_available()
    if status == True:
        return "True"
    else:
        return "False"

