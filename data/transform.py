import csv
import json

data = []
with open('data.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        data.append({"email": row[0], "display_name": row[1]})
print(json.dumps(data))
