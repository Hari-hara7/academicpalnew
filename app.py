from flask import Flask, render_template, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the dataset
data = pd.DataFrame([
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'New Physics', 'Keywords': 'physics, science, mechanics', 'Notes Link': 'https://drive.google.com/drive/folders/1e-LQMg0B7XF9wJDfWg4vWwc8SZg16LXt'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Problem Solving', 'Keywords': 'problem solving, psp, logic', 'Notes Link': 'https://drive.google.com/drive/u/5/folders/1yKkXdRkNXuui8Ysq7hCygAPak9OS49O_'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Maths', 'Keywords': 'math, maths, calculus, algebra', 'Notes Link': 'https://drive.google.com/drive/folders/1sYdBua6wr7uhMYw4uIKw5hrPtYd10c_B'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Basic Electronics', 'Keywords': 'electronics, basic electronics, circuits', 'Notes Link': 'https://drive.google.com/drive/folders/17iJtHYPWgAjSgAG1-SPQKYIBfQsDTcYK'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Cyber Security', 'Keywords': 'cyber security, security, hacking', 'Notes Link': 'https://drive.google.com/drive/folders/17kg_R1QPAVeMBKRJIIcAtGzJH7h1UIw2'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Python', 'Keywords': 'python, programming, coding', 'Notes Link': 'https://drive.google.com/drive/folders/1z5Ai6kwTfIdODpzdKd6imVBjoNWZNqL5'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'English', 'Keywords': 'english, grammar, language', 'Notes Link': 'https://drive.google.com/drive/folders/17lhdfYPpJruKzbPyIbqv2wL9TBdvwgDq'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Constitution of India', 'Keywords': 'constitution, india, law', 'Notes Link': 'https://drive.google.com/drive/folders/17na00jELfbtiLk7gdjzpFRbZ58AtEAyf'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'Civil', 'Keywords': 'civil, civil engineering, structures', 'Notes Link': 'https://drive.google.com/drive/folders/1bfCQooRwbnmkJC_W18mTRYzTgfWHJhEb'},
    {'Semester': '1st', 'Cycle': 'Physics', 'Subject': 'PSP', 'Keywords': 'psp, problem solving, logic', 'Notes Link': 'https://drive.google.com/drive/u/5/folders/1yKkXdRkNXuui8Ysq7hCygAPak9OS49O_'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'Chemistry', 'Keywords': 'chemistry, chemical, reactions', 'Notes Link': 'https://drive.google.com/drive/folders/11s9sgR-Hpb40p2tVlsetlBWcE6UPIubO'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'Maths', 'Keywords': 'math, maths, calculus, algebra', 'Notes Link': 'https://drive.google.com/drive/folders/1DL06euTxLjK1GWH2AFPaB1Yfd5mxf_8j'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'C Programming', 'Keywords': 'c programming, coding, programming', 'Notes Link': 'https://drive.google.com/drive/folders/134H9d31TReG8O_qgglnE9qqgctLtEv-z'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'PSP', 'Keywords': 'psp, problem solving, logic', 'Notes Link': 'https://drive.google.com/drive/folders/1yKkXdRkNXuui8Ysq7hCygAPak9OS49O_'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'BEE', 'Keywords': 'bee, basic electrical engineering', 'Notes Link': 'https://drive.google.com/drive/folders/19sv3ZFsqBuNxB3Ltuyu6YwYJLh_86q__'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'IT Skills', 'Keywords': 'it skills, computer skills', 'Notes Link': 'https://drive.google.com/drive/folders/11qYDOnYNVIRyVNSYOFan64n-RHn8ozIa'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'Cyber Security', 'Keywords': 'cyber security, security, hacking', 'Notes Link': 'https://drive.google.com/drive/folders/17kg_R1QPAVeMBKRJIIcAtGzJH7h1UIw2'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'ADLD', 'Keywords': 'adld, advanced digital logic design', 'Notes Link': 'https://drive.google.com/drive/folders/16T2_I_JIEisswgPj4Xk6S_OY_DTtCklG'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'Bio and EVS', 'Keywords': 'bio, evs, environment, biology', 'Notes Link': 'https://drive.google.com/drive/folders/13K6Hwh_bkWi1hBb9iYAJf6nQcS6In0AQ'},
    {'Semester': '1st', 'Cycle': 'Chemistry', 'Subject': 'EV', 'Keywords': 'ev, environmental studies', 'Notes Link': 'https://drive.google.com/drive/folders/1EBRbMBS6r42GQ60k8O4AdkiC_0muZ1TF'},
])

# Create a simplified ML model (no need for scikit-learn if we just want a basic search)
class MLNotesFinderModel:
    def __init__(self, data_df):
        self.data_df = data_df
        
    def get_notes_link(self, query):
        query = query.lower()
        best_match = None
        best_score = 0
        
        for _, row in self.data_df.iterrows():
            # Check if query matches any keywords, subject, or cycle
            search_text = (row['Subject'].lower() + ' ' + 
                           row['Keywords'].lower() + ' ' + 
                           row['Cycle'].lower() + ' ' + 
                           row['Semester'].lower())
            
            # Simple scoring - count how many words match
            query_words = query.split()
            score = sum(1 for word in query_words if word in search_text)
            
            if score > best_score:
                best_score = score
                best_match = row
        
        if best_match is None or best_score == 0:
            return {
                'success': False,
                'message': 'No matching notes found.'
            }
        
        return {
            'success': True,
            'semester': best_match['Semester'],
            'cycle': best_match['Cycle'],
            'subject': best_match['Subject'],
            'keywords': best_match['Keywords'],
            'notes_link': best_match['Notes Link']
        }

# Initialize the model
model = MLNotesFinderModel(data_df=data)
print("Model initialized successfully!")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('query', '')
    
    if not query:
        return jsonify({
            'success': False,
            'message': 'Please enter a query.'
        })
    
    result = model.get_notes_link(query)
    return jsonify(result)

@app.route('/api/search', methods=['POST'])
def api_search():
    data = request.get_json()
    query = data.get('query', '')
    
    if not query:
        return jsonify({
            'success': False,
            'message': 'Please enter a query.'
        })
    
    result = model.get_notes_link(query)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
