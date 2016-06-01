# -*- coding: utf-8 -*-

import sys
import json
import os

_file = sys.argv[1]

if not _file.endswith('.txt'):
    _file = '%s.txt' % _file

location = os.path.join(os.path.dirname(__file__), _file)
print(location)

data = None
with open(location) as f:
    data = f.readlines()

contents = {
    'subject': data[0].strip(),
    'code': data[1].strip(),
    'questions': []
}

for line in data[2:]:
    raw_content = line.rstrip().split(':=')
    question = {
        'question': raw_content[0],
        'answer': raw_content[1]
    }
    contents['questions'].append(question)

new_file = location.split('.')[0] + '.json'
with open(new_file, 'w+') as f:
    f.write(json.dumps(contents))
