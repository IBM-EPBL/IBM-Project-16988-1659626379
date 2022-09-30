from flask import Flask, request, redirect
from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate

app = Flask(__name__)
app.debug = True

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

# Settings for migrations
migrate = Migrate(app, db)

# Models
class Profile(db.Model):
	# Id : Field which stores unique id for every row in
	# database table.
	# first_name: Used to store the first name if the user
	# last_name: Used to store last name of the user
	# Age: Used to store the age of the user
	id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.String(20), unique=False, nullable=False)
	last_name = db.Column(db.String(20), unique=False, nullable=False)
    email_id = db.Column(db.String(50), unique=False, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
	age = db.Column(db.Integer, nullable=False)

	# repr method represents how one object of this datatable
	# will look like
	def __repr__(self):
		return f"Name : {self.first_name}, Age: {self.age}"

# function to render index page
@app.route('/')
def index():
	profiles = Profile.query.all()
	return render_template('index.html', profiles=profiles)

@app.route('/add_data')
def add_data():
	return render_template('add_profile.html')

# function to add profiles
@app.route('/add', methods=["POST"])
def profile():
	# In this function we will input data from the
	# form page and store it in our database. Remember
	# that inside the get the name should exactly be the same
	# as that in the html input fields
	first_name = request.form.get("first_name")
	last_name = request.form.get("last_name")
    email_id = request.form.get("email_id")
    password = request.form.get("password")
	age = request.form.get("age")

	# create an object of the Profile class of models and
	# store data as a row in our datatable
	if first_name != '' and last_name != '' and age is not None:
		p = Profile(first_name=first_name, last_name=last_name, age=age)
		db.session.add(p)
		db.session.commit()
		return redirect('/')
	else:
		return redirect('/')

@app.route('/delete/<int:id>')
def erase(id):
	
	# deletes the data on the basis of unique id and
	# directs to home page
	data = Profile.query.get(id)
	db.session.delete(data)
	db.session.commit()
	return redirect('/')

if __name__ == '__main__':
	app.run()
