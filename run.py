# Import Libraries/Dependencies
import os
from flask import (
    Flask, flash, render_template, 
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


#Name of the app so Flask can see it
app = Flask(__name__)


#how mongoDB can see and function with flask app
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
def index():
    # gets info for guild cards
    guildInfo = mongo.db.guildDetails.find()

    return render_template(
        "index.html", 
        title_header="Role Players Guild", 
        header_img="index-header-img", 
        guildInfo=guildInfo, 
        title_data="Role Players Guild")

@app.route("/about_us")
def about_us():
    # gets info for guild cards
    guildInfo = mongo.db.guildDetails.find()

    return render_template(
        "about_us.html",
        title_header="About Our Guild",
        header_img="index-header-img",
        guildInfo=guildInfo,
        title_data="")

@app.route("/temple", methods=["GET", "POST"])
def temple():
    tasks = mongo.db.templeOfSteve.find()
    tenets = list(mongo.db.templeOfSteve.find())

    return render_template(
        "temple.html",
        title_header="Welcome to the Temple of Steve",
        header_img="steve-header-img",
        templeOfSteve=tasks,
        title_data="Temple of Steve",
        profile_class="profile-image-size",
        tenets=tenets)


@app.route("/hallow")
def hallow():
    return render_template("hallow.html", title_header="In the Shadow of the Hallow Herd", header_img="hallow-header-img", title_data="")


@app.route("/tomb")
def tomb():
    return render_template("tomb.html", title_header="Tomb of Annihilation", header_img="tomb-header-img", title_data="")




@app.route("/signIn", methods=["GET", "POST"])
def signIn():
    #try and except a test is a pass and redirects use to profile page if already logged in
    try:
        if session["user"]:
            flash("Already Signed In")
            return redirect(url_for("profile", username=session["user"]))
    except:
        print("")

    if request.method == "POST":
        # check if user name exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # check hashed password matches user
            if check_password_hash(existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome {}".format(request.form.get("username")))
                return redirect(url_for("profile", username=session["user"]))

            else:
                # invalid password
                flash("Incorrect username and/or password")
                return redirect(url_for("signIn"))

        else:
            # username doesnt exist
            flash("Incorrect username and/or password")
            return redirect(url_for("signIn"))

    return render_template("signIn.html", header_img="log-img", title_data="", profile_class="profile-image-size")


@app.route("/signOut")
def signOut():
    # remove session signin session
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("signIn"))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check for existing user name
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("User name already exists")
            return redirect(url_for("register"))

        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(register)

        # put user into cookie for session
        session["user"] = request.form.get("username").lower()
        flash("Resistration successful")
        return redirect(url_for("profile", username=session["user"]))

    return render_template("register.html", header_img="log-img", title_data="", profile_class="profile-image-size")


# main search for users
@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    listz = list(mongo.db.guilds.find({"$text": {"$search": query}}))
    tasks = (mongo.db.guilds.find({"mainIndex": "true"}))
    return render_template("profile.html", tasks=tasks, listz=listz, username=session["user"], header_img="log-img", profile_class="profile-image-size")


# searchs for the sub categories on the profile page and
# passes a variable to populate them
@app.route("/searchHalls", methods=["GET", "POST"])
def searchHalls():
    searchRoomsQuery = request.form.get("searchRoomsQuery")
    listz = list(mongo.db.guilds.find({"$text": {"$search": searchRoomsQuery}}))
    # a successful test for combining template
    # location into a callable variable
    # query = query + ".html"
    tasks = (mongo.db.guilds.find({"mainIndex": "true"}))
    return render_template(
        "profile.html",
        tasks=tasks,
        listz=listz,
        username=session["user"],
        header_img="log-img",
        profile_class="profile-image-size")


@app.route("/addtask", methods=["GET", "POST"])
def addtask():

    if request.method == "POST":
        addtask = {
            "room": "templeOfSteve",
            "category": "insults",
            "idea": request.form.get("addtask"),
            "submit": "form",
            "date": ""
        }

        mongo.db.guildDiscussion.insert_one(addtask)
        flash("Insult added")

    return render_template(
        "addtask.html",
        username=session["user"],
        profile_class="profile-image-size",
        header_img="log-img")

@app.route("/edittask/<editme>", methods=["GET", "POST"])
def edittask(editme):
    #editme1 = mongo.db.guildDiscussion.find_one({"$text" : {"$search": editme}})
#    edit = mongo.db.guildDiscussion.find_one({"submit": "form"})

    if request.method == "POST":
        edit = {
            "room": request.form.get("editroom"),
            "category": request.form.get("editcategory"),
            "idea": request.form.get("editIdea"),
            "submit": request.form.get("editsubmit"),
            "date": request.form.get("editdate")
        }

        mongo.db.guildDiscussion.update({"_id": ObjectId(editme)}, edit)
        flash("Insult updated")

    tasky = mongo.db.guildDiscussion.find_one({"_id": ObjectId(editme)})
    return render_template(
        "edittask.html",
        username=session["user"],
        profile_class="profile-image-size",
        edit=tasky,
        header_img="log-img")


# sends user to page selected from sub category search
@app.route("/openRoom", methods=["GET", "POST"])
def openRoom():
    # search inputs
    roomHTMLQuery = request.form.get("roomHTMLQuery")
    roomNameQuery = request.form.get("roomNameQuery")
    headerImg = request.form.get("headerImgQuery")
    headerText = request.form.get("headerTextQuery")

    # combines search with suffix
    roomHTMLQuery = roomHTMLQuery + ".html"

    # searches for guild halls
    # (mongo.db.guilds.find({"mainIndex": "true"}))
    # Doesnt need to have actual search, "" will suffice
    # hall search
    tasks = ""
    # rooms search
    listz = ""


    # searches for guild room DB
    pageList = mongo.db.guildDiscussion.find({"$text": {"$search": roomNameQuery}})

    return render_template(
        roomHTMLQuery,
        title_header=headerText,
        tasks=tasks,
        listz=listz,
        username=session["user"],
        header_img=headerImg,
        profile_class="profile-image-size",
        pageList=pageList)


# main category population ie, WOTC
@app.route("/profile<username>", methods=["GET", "POST"])
def profile(username):

    # populates the main categories: home brew, wotc, campaign
    tasks = list(mongo.db.guilds.find({"mainIndex": "true"}))

    # empty until passed information from search
    listz = ""

    if session["user"]:
        return render_template(
            "profile.html",
            listz=listz,
            tasks=tasks,
            username=session["user"],
            header_img="log-img",
            title_data="",
            profile_class="profile-image-size")


    return redirect(url_for("login"))



if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True
    )