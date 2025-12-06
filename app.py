from flask import Flask, render_template, request
from rembg import remove
from PIL import Image
import os

app = Flask(__name__)

UPLOAD_FOLDER = "static"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/", methods=["GET", "POST"])
def index():
    input_img = None
    output_img = None

    if request.method == "POST":
        file = request.files["file"]

        if file:
            input_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(input_path)

            output_path = os.path.join(UPLOAD_FOLDER, "output.png")

            inp = Image.open(input_path)
            output = remove(inp)
            output.save(output_path)

            input_img = file.filename
            output_img = "output.png"

    return render_template("index.html", input_img=input_img, output_img=output_img)

if __name__ == "__main__":
    app.run(debug=True)
