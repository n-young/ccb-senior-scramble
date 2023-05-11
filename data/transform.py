import csv
import json

data = []
with open('data.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        data.append({"email": row[1], "display_name": row[0]})
print(json.dumps(data))
