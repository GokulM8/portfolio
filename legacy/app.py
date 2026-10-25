from flask import Flask, redirect, render_template, url_for

app = Flask(__name__)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")

# About Page
@app.route("/about")
def about():
    return redirect(f"{url_for('home')}#about")

# Skills Page
@app.route("/skills")
def skills():
    return redirect(f"{url_for('home')}#skills")

# Projects Page
@app.route("/projects")
def projects():
    return redirect(f"{url_for('home')}#projects")


if __name__ == "__main__":
    app.run(debug=True)
