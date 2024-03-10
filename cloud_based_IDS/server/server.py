from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Members API Route
@app.route("/detectAttack",methods=['POST'])
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

        # Define possible classes for each feature
        protocol_type_classes = ['tcp', 'udp', 'icmp']
        service_classes = ['private', 'public', 'other']  # Replace with actual classes
        flag_classes = ['REJ', 'SF', 'OTH', 'RSTO','SO','RSTR']  # Replace with actual classes

        # Initialize LabelEncoders with predefined classes
        label_encoder_protocol_type = LabelEncoder()
        label_encoder_protocol_type.classes_ = protocol_type_classes

        label_encoder_service = LabelEncoder()
        label_encoder_service.classes_ = service_classes

        label_encoder_flag = LabelEncoder()
        label_encoder_flag.classes_ = flag_classes

        # Training phase
        X = activity_data.drop(columns=['duration','land','wrong_fragment','urgent','hot','num_failed_logins','num_compromised','root_shell','su_attempted','num_root','num_file_creations','num_shells','num_access_files','num_outbound_cmds','is_host_login','is_guest_login','serror_rate','srv_serror_rate','rerror_rate','srv_rerror_rate','srv_diff_host_rate','class'], axis=1)
        X['protocol_type'] = label_encoder_protocol_type.fit_transform(X['protocol_type'])
        X['service'] = label_encoder_service.fit_transform(X['service'])
        X['flag'] = label_encoder_flag.fit_transform(X['flag'])

        Y = activity_data['class']

        X_train, X_test, Y_train, Y_test = train_test_split(X,Y,test_size=0.2,stratify=Y,random_state=2)
        # print(X.shape,X_train.shape,X_test.shape)

        model = LogisticRegression(max_iter=5000)

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


        # Get the JSON data from the request
        input_data_request = request.get_json()
        # print(input_data_request.get('inputData', {}))

        input_data_dict = input_data_request.get('inputData', {})

        # Define keys for non-numeric values
        non_numeric_keys = ['protocol_type', 'service', 'flag']

        # Create a tuple with numeric values (converted to float) and non-numeric values
        input_data = tuple(
            float(input_data_dict[key]) if key not in non_numeric_keys else input_data_dict[key]
            for key in [
                'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes', 'logged_in',
                'count', 'srv_count', 'same_srv_rate', 'diff_srv_rate', 'dst_host_count',
                'dst_host_srv_count', 'dst_host_same_srv_rate', 'dst_host_diff_srv_rate',
                'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate',
                'dst_host_serror_rate', 'dst_host_srv_serror_rate', 'dst_host_rerror_rate',
                'dst_host_srv_rerror_rate'
            ]
        )

        print(input_data)

        # Transform the string values to numeric labels using the same label encoder instances
        protocol_type_label = label_encoder_protocol_type.transform([input_data[0]])[0]
        service_label = label_encoder_service.transform([input_data[1]])[0]
        flag_label = label_encoder_flag.transform([input_data[2]])[0]

        # Replace string values with numeric labels in the input_data
        input_data_transformed = (
            protocol_type_label, service_label, flag_label,
            *input_data[3:]
        )

        print(input_data_transformed)

        #change the input data to a numpy array
        input_data_as_numpy_array = np.asanyarray(input_data_transformed)

        # reshape the numpy array as we are predicting for only on instance
        input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

        prediction = model.predict(input_data_reshaped)
        print(prediction)

        return jsonify({'prediction': prediction.tolist()})

        # return jsonify({"members": ["Member1", "Member2", "Member3"]})

    except Exception as e:
        # Handle exceptions appropriately
        return jsonify({"error": str(e)})




if __name__ == "__main__":
    app.run(debug=True)

# print("This is the backend server")