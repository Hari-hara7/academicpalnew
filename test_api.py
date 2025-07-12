#!/usr/bin/env python3
"""
Test script for Academic Pal API
Run this to test if the Flask app is working correctly
"""

import requests
import json

# Test configuration
BASE_URL = "http://localhost:8080"
TEST_QUERIES = [
    "physics",
    "python programming",
    "chemistry",
    "math",
    "cyber security",
    "nonexistent subject"
]

def test_api():
    print("🧪 Testing Academic Pal API...")
    print("="*50)
    
    # Test 1: Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/api/subjects")
        if response.status_code == 200:
            print("✅ Server is running")
            data = response.json()
            print(f"📚 Available subjects: {len(data.get('subjects', []))}")
        else:
            print("❌ Server responded with error")
            return
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure Flask app is running on port 8080")
        return
    
    # Test 2: Search functionality
    print("\n🔍 Testing search functionality...")
    print("-" * 30)
    
    for query in TEST_QUERIES:
        try:
            response = requests.post(
                f"{BASE_URL}/api/search",
                json={"query": query},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    print(f"✅ '{query}' -> Found: {result.get('subject')}")
                else:
                    print(f"❌ '{query}' -> {result.get('message')}")
            else:
                print(f"❌ '{query}' -> HTTP {response.status_code}")
                
        except Exception as e:
            print(f"❌ '{query}' -> Error: {e}")
    
    print("\n🎯 Test completed!")

if __name__ == "__main__":
    test_api()
