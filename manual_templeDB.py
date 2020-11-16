import os
import pymongo
if os.path.exists("env.py"):
    import env


MONGO_URI = os.environ.get("MONGO_URI")
DATABASE = "rolePlayersGuild"
COLLECTION = "templeOfSteve"


def mongo_connect(url):
    try:
        conn = pymongo.MongoClient(url)
        return conn
    except pymongo.errors.ConnectionFailure as e:
        print("Could not connect to MongoDB: %s") % e


def manual_db():
    print("")
    print("1. Add a entry")
    print("2. Find a entry by name")
    print("3. Edit a entry")
    print("4. Delete a entry")
    print("5. Exit")

    option = input("Enter choice: ")
    return option


def get_entry():
    print("")
    category = input("Enter category: ")

    try:
        doc = coll.find_one({"category": category})
    except:
        print("error accessing the database")

    if not doc:
        print("")
        print("Error! Nothing found!")

    return doc


def add_entry():
    print("")
    category = input("Enter category: ")
    idea = input("Enter idea: ")
    submit = input("Enter submit: ")
    date = input("Enter date: ")

    new_doc = {
        "category": category.lower(),
        "idea": idea,
        "submit": submit.lower(),
        "date": date
    }

    try:
        coll.insert(new_doc)
        print("")
        print("DB entry added")
    except:
        print("Error accessing DB")


def find_entry():
    doc = get_entry()
    if doc:
        print("")
        for k, v in doc.items():
            if k != "_id":
                print(k.capitalize() + ": " + v.capitalize())


def edit_entry():
    doc = get_entry()
    if doc:
        update_doc = {}
        print("")
        for k, v in doc.items():
            if k != "_id":
                update_doc[k] = input(k.capitalize() + "[" + v + "] : ")

                if update_doc[k] == "":
                    update_doc[k] = v

        try:
            coll.update_one(doc, {"$set": update_doc})
            print("")
            print("Entry updated")
        except:
            print("Error accessing the database")


def delete_entry():
    doc = get_entry()
    if doc:
        print("")
        for k, v in doc.items():
            if k != "_id":
                print(k.capitalize() + ": " + v.capitalize())

        print("")
        confirmation = input("Is this the entry you want to delete?\nY or N: ")
        print("")

        if confirmation.lower() == "y":
            try:
                coll.remove(doc)
                print("Entry has been erased")
            except:
                print("Error accessing the database")
        else:
            print("document not deleted")


def mod_loop():
    while True:
        option = manual_db()
        if option == "1":
            add_entry()
        elif option == "2":
            find_entry()
        elif option == "3":
            edit_entry()
        elif option == "4":
            delete_entry()
        elif option == "5":
            conn.close()
            break
        else:
            print("Invalid choice, Bad user")
        print("")


conn = mongo_connect(MONGO_URI)
coll = conn[DATABASE][COLLECTION]
mod_loop()
