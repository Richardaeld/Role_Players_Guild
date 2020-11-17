import os
from flask import (
    Flask, flash, render_template, 
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)


app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
def index():
    return render_template("index.html", title_header="Role Players Guild", header_img="index-header-img")


@app.route("/temple")
def temple():
    tasks = mongo.db.templeOfSteve.find()
    return render_template("temple.html", title_header="Welcome to the Temple of Steve", header_img="steve-header-img", templeOfSteve=tasks)


@app.route("/hallow")
def hallow():
    return render_template("hallow.html", title_header="In the Shadow of the Hallow Herd", header_img="hallow-header-img")


@app.route("/tomb")
def tomb():
    return render_template("tomb.html", title_header="Tomb of Annihilation", header_img="tomb-header-img")


@app.route("/signIn")
def signIn():
    return render_template("signIn.html", header_img="log-img")


@app.route("/signOut")
def signOut():
    return render_template("signOut.html", title_header="Sign Out", header_img="log-img")


@app.route("/register", methods=["get", "post"])
def register():
    return render_template("register.html", title_header="Register", header_img="log-img")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True
    )