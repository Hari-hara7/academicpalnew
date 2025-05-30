import pandas as pd
import numpy as np
import re
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download necessary NLTK components (run this only once)
try:
    nltk.data.find('corpora/stopwords')
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('stopwords')
    nltk.download('wordnet')
    nltk.download('punkt')

class MLNotesFinderModel:
    def __init__(self, data_path=None, data_df=None):
        """
        Initialize the ML model with either a CSV file path or a pandas DataFrame
        """
        if data_df is not None:
            self.data = data_df
        elif data_path:
            self.data = pd.read_csv(data_path)
        else:
            raise ValueError("Either data_path or data_df must be provided")
        
        # Preprocess the data
        self._preprocess_data()
        
        # Train the model
        self._train_model()
    
    def _clean_text(self, text):
        """Clean and normalize text for better matching"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove punctuation
        text = re.sub('[%s]' % re.escape(string.punctuation), ' ', text)
        
        # Remove extra spaces
        text = re.sub('\s+', ' ', text).strip()
        
        # Lemmatization
        lemmatizer = WordNetLemmatizer()
        words = nltk.word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
        
        return ' '.join(words)
    
    def _preprocess_data(self):
        """Preprocess the dataset for ML model training"""
        # Create a text corpus for each row combining subject, cycle, and keywords
        self.data['text_corpus'] = self.data.apply(
            lambda row: f"{row['Subject']} {row['Cycle']} {row['Keywords']}", axis=1
        )
        
        # Clean the text corpus
        self.data['cleaned_corpus'] = self.data['text_corpus'].apply(self._clean_text)
        
        # Create a combined training corpus for each subject-cycle combination
        self.training_data = []
        for _, row in self.data.iterrows():
            # Create multiple training examples with different patterns
            self.training_data.append({
                'text': f"i want {row['Subject']} notes from {row['Cycle']} cycle",
                'subject': row['Subject'],
                'cycle': row['Cycle'],
                'link': row['Notes Link']
            })
            self.training_data.append({
                'text': f"{row['Subject']} notes {row['Cycle']} cycle",
                'subject': row['Subject'],
                'cycle': row['Cycle'],
                'link': row['Notes Link']
            })
            self.training_data.append({
                'text': f"give me {row['Subject']} for {row['Cycle']}",
                'subject': row['Subject'],
                'cycle': row['Cycle'],
                'link': row['Notes Link']
            })
            
            # Add keyword-based training examples
            keywords = row['Keywords'].split(', ')
            for keyword in keywords:
                self.training_data.append({
                    'text': f"i need {keyword} notes {row['Cycle']}",
                    'subject': row['Subject'],
                    'cycle': row['Cycle'],
                    'link': row['Notes Link']
                })
                self.training_data.append({
                    'text': f"{keyword} {row['Cycle']}",
                    'subject': row['Subject'],
                    'cycle': row['Cycle'],
                    'link': row['Notes Link']
                })
        
        # Convert to DataFrame for easier processing
        self.training_df = pd.DataFrame(self.training_data)
        
        # Clean the training texts
        self.training_df['cleaned_text'] = self.training_df['text'].apply(self._clean_text)
    
    def _train_model(self):
        """Train the TF-IDF vectorizer on the training data"""
        # Initialize and fit the TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2))
        self.tfidf_matrix = self.vectorizer.fit_transform(self.training_df['cleaned_text'])
    
    def get_notes_link(self, query):
        """Get the notes link based on the user query"""
        # Clean the query
        cleaned_query = self._clean_text(query)
        
        # Transform the query to TF-IDF vector
        query_vector = self.vectorizer.transform([cleaned_query])
        
        # Calculate cosine similarity with all training examples
        cosine_similarities = cosine_similarity(query_vector, self.tfidf_matrix).flatten()
        
        # Get the index of the most similar training example
        best_match_idx = np.argmax(cosine_similarities)
        similarity_score = cosine_similarities[best_match_idx]
        
        # If similarity is too low, return failure
        if similarity_score < 0.3:
            return {
                'success': False,
                'message': "I couldn't understand your query clearly. Please specify both subject and cycle.",
                'similarity_score': similarity_score
            }
        
        # Get the best matching training example
        best_match = self.training_df.iloc[best_match_idx]
        
        # Return the resultt
        return {
            'success': True,
            'message': f"Found notes for {best_match['subject']} in {best_match['cycle']} cycle.",
            'link': best_match['link'],
            'subject': best_match['subject'],
            'cycle': best_match['cycle'],
            'similarity_score': similarity_score
        }