import pandas as pd 
import os 
def Makelabelmap(labellist):
    labelmap = str()
    for key,values in labellist.items():
        labelmap += '{\n'
        labelmap += ' id:{key}\n name:{values}\n'.format(key=key,values=values)
        labelmap += '}\n'
    return labelmap
def Makecsv(rootdir,OutputPath):
    dataset = []
    labelmap = dict()
    idx = 0
    for subdir in os.listdir(rootdir):
        for img in os.listdir(rootdir+'/'+subdir):
            labelmap[idx] = subdir
            imgPath = os.getcwd()[0:-7] + rootdir[3:] + '/' + subdir + '/' + img
            dataset.append([imgPath,idx])
        idx+=1
    
    dataset = pd.DataFrame(columns=['filename','label'],data=dataset)
    dataset.to_csv(OutputPath+'/dataset.csv')
    labelmapOutput = open(OutputPath+'/labelmap.pbtxt','w')
    labelmapOutput.write(Makelabelmap(labelmap))
    
if __name__ == "__main__":
    rootdir = '../server/dataset/lfw'
    OutputPath = '../server/dataset'
    Makecsv(rootdir,OutputPath)