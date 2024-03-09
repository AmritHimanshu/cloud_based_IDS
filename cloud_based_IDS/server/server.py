from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

app = Flask(__name__)

# Members API Route
@app.route("/members",methods=['POST'])
def members():
    try:
        # loading the csv data to a pandas DataFrame
        activity_data = pd.read_csv('NetworkIntrusionDetection_Train_data.csv')
        activity_data_test = pd.read_csv('NetworkIntrusionDetection_Test_data.csv')

        # # print first 5 rows of the dataset
        # print(activity_data.head())
        
        # # print last 5 rows of the dataset
        # print(activity_data.tail())
        
        # # numbers of rows and columns in the dataset
        # print(activity_data.shape)
        
        # # getting some info about the data
        # print(activity_data.info())
        
        # # checking for missing values
        # print(activity_data.isnull().sum())
        
        # # statistical measures about the data
        # print(activity_data.describe())
        
        # # checking the distribution of class variable
        # print(activity_data['class'].value_counts())
        
        X = activity_data[['duration', 'src_bytes', 'dst_bytes', 'count', 'srv_count']]
        Y = activity_data['class']
        # print(X)
        # print(Y)
        
        X_train, X_test, Y_train, Y_test = train_test_split(X,Y,test_size=0.2,stratify=Y,random_state=2)
        # print(X.shape,X_train.shape,X_test.shape)
        
        model = LogisticRegression(max_iter=2000)
        
        #training the LogisticRegression model with the Training data
        model.fit(X_train,Y_train)
        
        # accuracy on training data
        X_train_prediction = model.predict(X_train)
        training_data_accuracy = accuracy_score(X_train_prediction,Y_train)
        # print('Accuracy on training data: ',training_data_accuracy)
        
        # accuracy on training data
        X_test_prediction = model.predict(X_test)
        test_data_accuracy = accuracy_score(X_test_prediction,Y_test)
        # print('Accuracy on test data: ',test_data_accuracy)
        
        # input_data=(0,491,0,2,2)
        # # input_data=(0,0,0,229,10)
        
        # #change the input data to a numpy array
        # input_data_as_numpy_array = np.asanyarray(input_data)
        
        # # reshape the numpy array as we are predicting for only on instance
        # input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)
        
        # prediction = model.predict(input_data_reshaped)
        # print(prediction)
        
        # input_data=(0,491,0,2,2)
        input_data=(0,0,0,229,10)
        
        #change the input data to a numpy array
        input_data_as_numpy_array = np.asanyarray(input_data)
        
        # reshape the numpy array as we are predicting for only on instance
        input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)
        
        prediction = model.predict(input_data_reshaped)
        print(prediction)







        # Get the JSON data from the request
        input_data = request.get_json()
        # print(input_data)

        return jsonify({"members": ["Member1", "Member2", "Member3"]})

    except Exception as e:
        # Handle exceptions appropriately
        return jsonify({"error": str(e)})




if __name__ == "__main__":
    app.run(debug=True)

# print("This is the backend server")