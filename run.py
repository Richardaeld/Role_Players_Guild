import os
from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", title_header="Role Players Guild")


@app.route("/temple")
def temple():
    return render_template("temple.html", title_header="Temple of Steve")


@app.route("/hallow")
def hallow():
    return render_template("hallow.html", title_header="Hallow Herd")


@app.route("/tomb")
def tomb():
    return render_template("tomb.html", title_header="Tomb of Annihilation")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True
    )