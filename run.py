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
        header_img_class="header-img",
        header_img="index-header-img",
        header_title_class="header-title",
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


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):

    # populates the main categories: home brew, wotc, campaign
    tasks = list(mongo.db.guilds.find({"mainIndex": "true"}))

    if session["user"]:
        return render_template(
            "profile.html",
            tasks=tasks,
            username=session["user"],
            header_img_class="profile-image-size header-img",
            header_img="log-img",
            header_title_class="header-title",
            title_header="Welcome " + session['user'],
            title_header_p="Where will your adventure take you today?")

    return redirect(url_for("login"))


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
        header_img_class="profile-img-size header-img",
        header_img="log-img",
        header_title_class="header-title",
        title_header="",
        title_header_p="")


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

    return render_template(
        "register.html",
        header_img_class="profile-img-size header-img",
        header_img="log-img",
        header_title_class="header-title",
        title_header="",
        title_header_p="")


# main search for users
@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    listz = list(mongo.db.guilds.find({"$text": {"$search": query}}))
    tasks = (mongo.db.guilds.find({"mainIndex": "true"}))
    return render_template("profile.html", tasks=tasks, listz=listz, username=session["user"], header_img="log-img", profile_class="profile-image-size")


@app.route("/addtask/<test0>/'add'+<test1>", methods=["GET", "POST"])
def addtask(test0, test1):

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
        return redirect(url_for('openRoom', username=session['user'], testh='True'))

    insertInfo=""
    testy = mongo.db.guildDiscussion.find_one({"room": test0})
    test0 = test0
    return render_template(
        "addtask.html",
        test1=test1,
        test0=test0,
        test=testy,
        add=insertInfo,
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
        return redirect(url_for('openRoom', username=session['user'], testh='True'))

    tasky = mongo.db.guildDiscussion.find_one({"_id": ObjectId(editme)})
    return render_template(
        "edittask.html",
        username=session["user"],
        profile_class="profile-image-size",
        edit=tasky,
        header_img="log-img")


@app.route("/removetask/<removeme>", methods=["GET", "POST"])
def removetask(removeme):
    #editme1 = mongo.db.guildDiscussion.find_one({"$text" : {"$search": editme}})
#    edit = mongo.db.guildDiscussion.find_one({"submit": "form"})

    if request.method == "POST":
        mongo.db.guildDiscussion.remove({"_id": ObjectId(removeme)})
        flash("Insult removed")
        return redirect(url_for('openRoom', username=session['user'], testh='True'))

    tasky = mongo.db.guildDiscussion.find_one({"_id": ObjectId(removeme)})
    return render_template(
        "removetask.html",
        username=session["user"],
        profile_class="profile-image-size",
        edit=tasky,
        header_img="log-img")


# searchs for the sub categories on the profile page and
# passes a variable to populate them
@app.route("/searchHalls", methods=["GET", "POST"])
def searchHalls():

    testh = False

    # takes user input for guild room search
    searchRoomsQuery = request.form.get("searchRoomsQuery")

    # searches for rooms associated to guild hall user selected
    listz = list(
        mongo.db.guilds.find({"$text": {"$search": searchRoomsQuery}}))
    tasks = (mongo.db.guilds.find({"mainIndex": "true"}))
    return render_template(
        "profile.html",
        tasks=tasks,
        listz=listz,
        testh=testh,
        username=session["user"],
        header_img="log-img",
        profile_class="profile-image-size",
        searchroom=True)


# sends user to page selected from sub category search
@app.route("/openRoom/<testh>", methods=["GET", "POST"])
def openRoom(testh):
    # search inputs
    if testh == "False":
        roomNameQuery = request.form.get("roomNameQuery")
        roomHTMLQuery = request.form.get("roomHTMLQuery")
        headerImg = request.form.get("headerImgQuery")
        headerText = request.form.get("headerTextQuery")
    if testh == "True":
        roomNameQuery = session["place"][1]
        roomHTMLQuery = session["place"][0]
        headerImg = session["place"][2]
        headerText = session["place"][3]

    # combines search with suffix(.html) if needed
    if testh == "False":
        roomHTMLQuery = roomHTMLQuery + ".html"
    else:
        roomHTMLQuery=roomHTMLQuery
    # gets categories to populate room with
    totalCategories = list(mongo.db.tableCategories.find())

    # searches if user has admin status
    admin = mongo.db.users.find_one({"username": session["user"]})


    #test session
    session["place"] = [roomHTMLQuery, roomNameQuery, headerImg, headerText]


    # searches for guild room DB
    pageList = list(mongo.db.guildDiscussion.find({"$text": {"$search": roomNameQuery}}))
    test = pageList[0]
    addidea = roomNameQuery
    return render_template(
        roomHTMLQuery,
        testh=testh,
        test=test,
        title_header=headerText,
        username=session["user"],
        header_img=headerImg,
        profile_class="profile-image-size",
        pageList=pageList,
        totalCategories=totalCategories,
        addidea=addidea,
        admin=admin)





if __name__ == "__main__":
    app.run(
        host=os.environ.get("IP", "0.0.0.0"),
        port=int(os.environ.get("PORT", "5000")),
        debug=True
    )