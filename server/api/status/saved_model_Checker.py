import os 
import glob
def is_exist_saved_Model():
    lists = glob.glob('server/results/*.h5')
    if len(lists) > 0:
        return True
    else:
        return False