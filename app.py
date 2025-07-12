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

# Enhanced ML model for better search results
class MLNotesFinderModel:
    def __init__(self, data_df):
        self.data_df = data_df
        
    def get_notes_link(self, query):
        """
        Find the best matching notes based on the query
        Uses multiple scoring methods for better accuracy
        """
        query = query.lower().strip()
        
        if not query:
            return {
                'success': False,
                'message': 'Please enter a search query.'
            }
        
        best_match = None
        best_score = 0
        
        for _, row in self.data_df.iterrows():
            # Create searchable text from all relevant fields
            search_text = ' '.join([
                row['Subject'].lower(),
                row['Keywords'].lower(),
                row['Cycle'].lower(),
                row['Semester'].lower()
            ])
            
            # Calculate score using multiple methods
            score = self._calculate_match_score(query, search_text, row)
            
            if score > best_score:
                best_score = score
                best_match = row
        
        # Return result based on score threshold
        if best_match is None or best_score < 1:
            return {
                'success': False,
                'message': f'No matching notes found for "{query}". Try keywords like: physics, python, chemistry, math, electronics, etc.'
            }
        
        return {
            'success': True,
            'semester': best_match['Semester'],
            'cycle': best_match['Cycle'],
            'subject': best_match['Subject'],
            'keywords': best_match['Keywords'],
            'notes_link': best_match['Notes Link']
        }
    
    def _calculate_match_score(self, query, search_text, row):
        """Calculate match score using multiple criteria"""
        score = 0
        query_words = query.split()
        
        # Exact subject match gets highest score
        if query in row['Subject'].lower():
            score += 10
            
        # Exact keyword match gets high score
        if query in row['Keywords'].lower():
            score += 8
            
        # Word-by-word matching
        for word in query_words:
            if len(word) > 2:  # Only consider meaningful words
                if word in search_text:
                    score += 2
                    
        # Bonus for cycle match
        if any(cycle in query for cycle in ['physics', 'chemistry']):
            if any(cycle in row['Cycle'].lower() for cycle in ['physics', 'chemistry']):
                score += 3
                
        return score

# Initialize the model
model = MLNotesFinderModel(data_df=data)
print("✅ Academic Pal ML Model initialized successfully!")
print(f"📚 Loaded {len(data)} subjects across {data['Cycle'].nunique()} cycles")
print("🚀 Ready to find your notes!")

@app.route('/')
def index():
    """Serve the main search interface"""
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    """Handle form-based search requests"""
    try:
        query = request.form.get('query', '').strip()
        
        if not query:
            return jsonify({
                'success': False,
                'message': 'Please enter a search query.'
            })
        
        result = model.get_notes_link(query)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }), 500

@app.route('/api/search', methods=['POST'])
def api_search():
    """Handle JSON-based API search requests"""
    try:
        if not request.is_json:
            return jsonify({
                'success': False,
                'message': 'Request must be JSON'
            }), 400
            
        data = request.get_json()
        query = data.get('query', '').strip()
        
        if not query:
            return jsonify({
                'success': False,
                'message': 'Please provide a query parameter.'
            })
        
        result = model.get_notes_link(query)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }), 500

@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    """Get list of available subjects"""
    try:
        subjects = data['Subject'].unique().tolist()
        cycles = data['Cycle'].unique().tolist()
        semesters = data['Semester'].unique().tolist()
        
        return jsonify({
            'success': True,
            'subjects': subjects,
            'cycles': cycles,
            'semesters': semesters
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500

if __name__ == '__main__':
    print("\n🎓 Starting Academic Pal Notes Finder...")
    print("📍 Access the app at: http://localhost:8080")
    print("📍 API endpoint: http://localhost:8080/api/search")
    print("📍 Available subjects: http://localhost:8080/api/subjects")
    print("="*50)
    app.run(debug=True, host='0.0.0.0', port=8080)
