# Import Libraries/Dependencies
import os
import datetime
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


# Name of the app so Flask can see it
app = Flask(__name__)


# how mongoDB can see and function with flask app
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
def index():
    return render_template(
        "index.html",
        header_img_class="col-11 col-md-9 col-lg-7",
        header_img="index-header-img",
        header_title_class="header-title header-title-bump",
        title_header="Role Players Guild",
        title_header_p="")


@app.route("/about_us")
def about_us():
    return render_template(
        "about_us.html",
        header_img_class="general-display-none",
        header_img="",
        header_title_class="",
        title_header="",
        title_header_p="")


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

    return render_template(
        "register.html",
        header_img_class="col-12 profile-header",
        header_img="sign-reg-background",
        header_title_class="header-title",
        title_header="",
        title_header_p="")


@app.route("/signIn", methods=["GET", "POST"])
def signIn():
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

    return render_template(
        "signIn.html",
        header_img_class="col-12 profile-header",
        header_img="sign-reg-background",
        header_title_class="header-title",
        title_header="",
        title_header_p="")


@app.route("/signOut")
def signOut():

    # remove session place if it exists
    flash("You have been logged out")
    if session.get('place') is not None:
        session.pop('place')

    # remove session user for 'logout'
    session.pop('user')
    return redirect(url_for("signIn"))


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):

    admin = mongo.db.users.find_one({"username": session['user']})

    # populates the halls dynamically
    guildHalls = list(mongo.db.halls.find())

    if session['user']:
        return render_template(
            "profile.html",
            guildHalls=guildHalls,
            admin=admin,
            username=session['user'],
            header_img_class="col-12 profile-header",
            header_img="log-img",
            header_title_class="header-title-general",
            title_header="Welcome " + session['user'],
            title_header_p="What hall will your adventure take you today?")

    return redirect(url_for("login"))


# searchs for the guild halls for rooms from the profile page and
# passes a variable to populate them
@app.route("/searchHalls/<username>/<hall>", methods=["GET", "POST"])
def searchHalls(username, hall):

    admin = mongo.db.users.find_one({"username": session['user']})

    # applies a rest to previously visited room
    if session.get('place') is not None:
        session.pop('place')

    userSearch = request.form.get("navSearch")
    if userSearch is not None:
        hall = userSearch

    # populates halls of guildhalls
    guildHalls = list(mongo.db.halls.find())

    # Makes sure second search is only visible after first search has been used
    seeRooms = True

    # searches for rooms associated to guild hall user selected
    searchForRooms = list(
        mongo.db.rooms.find({"$text": {"$search": hall}}))

    return render_template(
        "profile.html",
        admin=admin,
        guildHalls=guildHalls,
        searchForRooms=searchForRooms,
        username=session['user'],
        header_img_class="col-12 profile-header ",
        header_img="log-img",
        header_title_class="header-title-general",
        title_header="Welcome " + session['user'],
        title_header_p="What room will your adventure take you today?",
        seeRooms=seeRooms)


# sends user to page selected from sub category search
@app.route("/openRoom/<username>/<roomName>", methods=["GET", "POST"])
def openRoom(username, roomName):

    # search db for the rooms basic information
    opendoor = mongo.db.rooms.find_one({"$text": {"$search": roomName}})

    if session.get("place") is not None:
        roomName = session["place"][0]
        headerImg = session["place"][1]
        headerText = session["place"][2]

    else:
        headerImg = opendoor['img']
        roomName = opendoor['room']
        headerText = opendoor['header']

    # searches if user has admin status
    admin = mongo.db.users.find_one({"username": session['user']})

    # test session
    session['place'] = [roomName, headerImg, headerText]

    # matches roomName to pull commit list
    topicCommits = list(mongo.db.guildDiscussion.find({"$text": {"$search": session['place'][0]}}))

    # pulls topic commits info into a variable and turns it into a usable list
    roomInfo = mongo.db.rooms.find_one({"$text": {"$search": roomName}})
    roomInfo = roomInfo['topic'].split(", ")

    return render_template(
        "room.html",
        roomInfo=roomInfo,
        opendoor=opendoor,
        username=session["user"],
        header_img_class="col-12 profile-header",
        header_img=headerImg,
        header_title_class="header-title-general header-title-bump",
        title_header=headerText,
        title_header_p="",
        topicCommits=topicCommits,
        admin=admin)


@app.route("/room_form/<username>/<roomName>/<topicName>", methods=["GET", "POST"])
def room_form(username, roomName, topicName):
    admin = mongo.db.users.find_one({"username": session['user']})
    topicCommits = list(mongo.db.guildDiscussion.find({"$text": {"$search": session['place'][0]}}))
    roomInfo = mongo.db.rooms.find_one({"$text": {"$search": session['place'][0]}})
    roomInfo = roomInfo['topic'].split(", ")

    return render_template(
        "room_form.html",
        roomInfo=roomInfo,
        topicName=topicName,
        username=session['user'],
        header_img_class="col-12 profile-header",
        header_img=session['place'][1],
        header_title_class="header-title-general header-title-bump",
        title_header=session['place'][2],
        title_header_p="",
        topicCommits=topicCommits,
        admin=admin)


@app.route("/alter_form/<username>/<room>/<topic>/<topicId>/<type_edit>", methods=["GET", "POST"])
def alter_form(username, room, topic, type_edit, topicId):
    # pulls topic commits info into a variable and turns it into a usable list
    roomInfo = mongo.db.rooms.find_one({"$text": {"$search": session['place'][0]}})
    roomInfo = roomInfo['topic'].split(", ")

    if request.method == "POST":
        change = {
            "room": session['place'][0],
            "category": request.form.get("topic"),
            "idea": request.form.get("text_area"),
            "submit": session['user'],
            "date": ""
        }

        if type_edit == 'add':
            form = mongo.db.guildDiscussion.insert_one(change)
        elif type_edit == 'edit':
            form = mongo.db.guildDiscussion.update({"_id": ObjectId(topicId)}, change)
        elif type_edit == 'remove':
            form = mongo.db.guildDiscussion.remove({"_id": ObjectId(topicId)}, change)
        else:
            form = ""

        form
        return redirect(url_for('openRoom', username=session['user'], roomName=session['place'][0]))

    if type_edit == 'add':
        text_area_description = "Describe your addition:"
    elif type_edit == 'edit':
        text_area_description = "Make your changes to this entry:"
    elif type_edit == 'remove':
        text_area_description = "This is the entry you will delete:"
    else:
        text_area_description = ""

    if topicId != 'no':
        findId = mongo.db.guildDiscussion.find_one({"_id": ObjectId(topicId)})
    else:
        findId = ""

    return render_template(
        "alter_form.html",
        selected_topic=topic,
        findId=findId,
        type_edit=type_edit,
        text_label=text_area_description,
        form_header=type_edit,
        roomInfo=roomInfo,
        username=session['user'],
        header_img_class="col-12 profile-header",
        header_img="log-img",
        header_title_class="header-title header-title-form",
        title_header="",
        title_header_p="")


@app.route("/createHall/<username>", methods=["GET", "POST"])
def createHall(username):
    if request.method == "POST":
        createHall = {
            "hall": request.form.get("hall"),
            "description": request.form.get("description"),
            "submit": session['user'],
            "date": ""
        }
        flash("hall constructed")
        mongo.db.halls.insert_one(createHall)
        return redirect(url_for('profile', username=session['user']))

    return render_template(
        "createHall.html",
        username=session['user'],
        header_img_class="col-12 profile-header",
        header_img="log-img",
        header_title_class="header-title header-title-form",
        title_header="",
        titleheader_p="")


@app.route("/createRoom/<username>", methods=["GET", "POST"])
def createRoom(username):
    topicMaxCount = range(1, 11)
    guildHalls = list(mongo.db.halls.find())
    if request.method == "POST":
        topicCombined = ""
        # iterates over 'topicCount' which is the
        # user selectable number for total topics
        topicCount = int(request.form.get("topicCount"))
        for topic in range(1, topicCount + 1):
            topicCombined = topicCombined + ", " + request.form.get(
                "topic" + str(topic))

        topicCombinedLength = len(topicCombined)
        topicCombinedSlice = slice(2, topicCombinedLength)
        topicCombined = topicCombined[topicCombinedSlice]
        createRoom = {
            "hall": request.form.get("hallName").lower(),
            "room": request.form.get("roomName").lower(),
            "description": request.form.get("description"),
            "header": request.form.get("header").lower(),
            "img": "tomb-img",
            "topic": topicCombined.lower(),
            "submit": session['user'],
            "date": ""
        }
        print(topicCombined)
        mongo.db.rooms.insert_one(createRoom)
        flash("room constructed")
        return redirect(url_for('profile', username=session['user']))

    return render_template(
        "createRoom.html",
        guildHalls=guildHalls,
        topicMaxCount=topicMaxCount,
        username=session['user'],
        header_img_class="col-12 profile-header",
        header_img="log-img",
        header_title_class="header-title header-title-form",
        title_header="",
        title_header_p=""
        )


# Search in Nav Bar
## ---------------------------------BROKEN AFTER PROFILE SEARCH IMPROVEMENT!!!---------------------
@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("navQuery")
    listz = list(mongo.db.guilds.find({"$text": {"$search": query}}))
    tasks = (mongo.db.guilds.find({"mainIndex": "true"}))
    return render_template("profile.html", tasks=tasks, listz=listz, username=session["user"], header_img="log-img", profile_class="profile-image-size")


if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True
    )