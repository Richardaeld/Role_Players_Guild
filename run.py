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
        header_img_class="col-7",
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
        header_img="log-img",
        header_title_class="header-title",
        title_header="",
        title_header_p="")


@app.route("/signIn", methods=["GET", "POST"])
def signIn():
    # try and except a test is a pass and redirects
    # use to profile page if already logged in
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

    return render_template(
        "signIn.html",
        header_img_class="col-12 profile-header",
        header_img="log-img",
        header_title_class="header-title",
        title_header="",
        title_header_p="")


@app.route("/signOut")
def signOut():
    # remove session signin session
    flash("You have been logged out")
    session.pop('user')
    return redirect(url_for("signIn"))


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # ------------first hall will not click when
    # ------------resolution width is greater than 980px
    # populates the main categories: home brew, wotc, campaign
    guildHalls = list(mongo.db.guilds.find({"mainIndex": "true"}))
    if session['user']:
        return render_template(
            "profile.html",
            guildHalls=guildHalls,
            username=session['user'],
            header_img_class="col-12 profile-header",
            header_img="log-img",
            header_title_class="header-title-general",
            title_header="Welcome " + session['user'],
            title_header_p="What hall will your adventure take you today?")

    return redirect(url_for("login"))


# searchs for the sub categories on the profile page and
# passes a variable to populate them
@app.route("/searchHalls/<username>/<hall>", methods=["GET", "POST"])
def searchHalls(username, hall):

    # applies a rest to previously visited room
    if session.get('place') is not None:
        session.pop('place')

    testh = False

    # takes user input for guild room search
    searchRoomsQuery = request.form.get("searchRoomsQuery")
    hall = request.form.get("searchRoomQuery")

    # Makes sure second search is only visible after first search has been used
    enterHall = True

    

    # searches for rooms associated to guild hall user selected
    searchForRooms = list(
        mongo.db.guilds.find({"$text": {"$search": searchRoomsQuery}}))

    guildHalls = list(mongo.db.guilds.find({"mainIndex": "true"}))
    return render_template(
        "profile.html",
        hall=hall,
        guildHalls=guildHalls,
        searchForRooms=searchForRooms,
        username=session['user'],
        header_img_class="col-12 profile-header ",
        header_img="log-img",
        header_title_class="header-title-general",
        title_header="Welcome " + session['user'],
        title_header_p="What room will your adventure take you today?",
        enterHall=enterHall)


# sends user to page selected from sub category search
@app.route("/openRoom/<username>/<room>", methods=["GET", "POST"])
def openRoom(username, room):
    # search inputs

    if session.get("place") is not None:
        roomHTMLQuery = session["place"][0]
        roomNameQuery = session["place"][1]
        headerImg = session["place"][2]
        headerText = session["place"][3]
        navTitle = session["place"][4]
    else:
        roomNameQuery = request.form.get("roomNameQuery")
        roomHTMLQuery = request.form.get("roomHTMLQuery")
        headerImg = request.form.get("headerImgQuery")
        headerText = request.form.get("headerTextQuery")
        navTitle = request.form.get("navTitle")

    print(session)
    if session.get("place") is not None:
        print(session)
        roomHTMLQuery = roomHTMLQuery
    else:
        print(session)
        roomHTMLQuery = roomHTMLQuery + ".html"

    # gets categories to populate room with
    totalCategories = list(mongo.db.tableCategories.find())

    # searches if user has admin status
    admin = mongo.db.users.find_one({"username": session['user']})

    # test session
    session['place'] = [roomHTMLQuery, roomNameQuery, headerImg, headerText, navTitle]
    # searches for guild room DB
    pageList = list(mongo.db.guildDiscussion.find({"$text": {"$search": roomNameQuery}}))

    test = pageList[0]
    addidea = roomNameQuery

    return render_template(
        roomHTMLQuery,
        test=test,
        username=session["user"],
        header_img_class="col-12 profile-header",
        header_img=headerImg,
        header_title_class="header-title-general header-title-bump",
        title_header=headerText,
        title_header_p="",
        totalCategories=totalCategories,
        addidea=addidea,
        pageList=pageList,
        admin=admin)



@app.route("/addtask/<username>/<room>/'add '+<topic>", methods=["GET", "POST"])
def addtask(username, room, topic):

    if request.method == "POST":
        addme = {
            "room": request.form.get("room"),
            "category": request.form.get("category"),
            "idea": request.form.get("addtask"),
            "submit": request.form.get("username"),
            "date": ""
        }
        mongo.db.guildDiscussion.insert_one(addme)
        flash("Added to " + request.form.get("category"))
        return redirect(url_for('openRoom', username=session['user'], room=session['place'][1]))

    room = session['place'][1]
    insertInfo = ""
    testy = mongo.db.guildDiscussion.find_one({"room": room})
    return render_template(
        "addtask.html",
        room=session['place'][1],
        topic=topic,
        test=testy,
        add=insertInfo,
        username=session['user'],
        header_img_class="col-12 profile-header",
        header_img="add-entry",
        header_title_class="header-title header-title-form",
        title_header="",
        title_header_p="")

@app.route("/edittask/<username>/<room>/<editme>/'edit '+<topic>", methods=["GET", "POST"])
def edittask(username, room, topic, editme):
    editme = editme
    if request.method == "POST":
        edit = {
            "room": request.form.get("editroom"),
            "category": request.form.get("editcategory"),
            "idea": request.form.get("editIdea"),
            "submit": request.form.get("editsubmit"),
            "date": request.form.get("editdate")
        }

        mongo.db.guildDiscussion.update({"_id": ObjectId(editme)}, edit)
        flash(topic.title() + " updated")
        return redirect(url_for('openRoom', username=session['user'], room=session['place'][1]))

    topic=topic
    tasky = mongo.db.guildDiscussion.find_one({"_id": ObjectId(editme)})
    return render_template(
        "edittask.html",
        room=session['place'][1],
        editme=editme,
        topic=topic,
        edit=tasky,
        username=session["user"],
        header_img_class="col-12 profile-header",
        header_img="add-entry",
        header_title_class="header-title header-title-form",
        title_header="",
        title_header_p="")


@app.route("/removetask/<username>/<room>/<removeme>/'remove '+<topic>", methods=["GET", "POST"])
def removetask(username, room, topic, removeme):
    removeme=removeme
    if request.method == "POST":
        mongo.db.guildDiscussion.remove({"_id": ObjectId(removeme)})
        flash(topic.title() + " removed")
        return redirect(url_for('openRoom', username=session['user'], room=session['place'][1]))
    tasky = mongo.db.guildDiscussion.find_one({"_id": ObjectId(removeme)})
    return render_template(
        "removetask.html",
        room=session['place'][1],
        remove=tasky,
        topic=topic,
        removeme=removeme,
        username=session["user"],
        header_img_class="col-12 profile-header",
        header_img="add-entry",
        header_title_class="header-title header-title-form",
        title_header="",
        title_header_p="")


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