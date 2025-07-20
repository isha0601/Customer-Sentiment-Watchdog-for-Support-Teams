from transformers import pipeline
import sys
import json

classifier = pipeline("text-classification", model="nateraw/bert-base-uncased-emotion")

def analyze(text):
    result = classifier(text)[0]
    return result

if __name__ == "__main__":
    text = sys.stdin.read()
    result = analyze(text)
    print(json.dumps(result))
