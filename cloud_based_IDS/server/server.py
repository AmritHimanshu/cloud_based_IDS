from flask import Flask, request, jsonify

app = Flask(__name__)

# Members API Route
@app.route("/members",methods=['POST'])
def members():
    try:
        # Get the JSON data from the request
        input_data = request.get_json()
        print(input_data)

        return jsonify({"members": ["Member1", "Member2", "Member3"]})

    except Exception as e:
        # Handle exceptions appropriately
        return jsonify({"error": str(e)})




if __name__ == "__main__":
    app.run(debug=True)

# print("This is the backend server")