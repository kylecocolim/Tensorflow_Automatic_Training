from flask import Flask ,send_from_directory
from flask_cors import CORS
from api.status.API_STATUS import blueprint_api_status
from api.inference.API_inference import blueprint_api_inference

# Main Flask APP 
app = Flask(__name__,static_folder='../client/build') 

# <- Router -> 
# Status API
app.register_blueprint(blueprint_api_status)
# Inference API
app.register_blueprint(blueprint_api_inference)

# <- Setting ->
# Apply CORS
CORS(app)

# Static Folder Serve
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
 
if __name__ == "__main__":
    app.run(debug=True,port=5000)