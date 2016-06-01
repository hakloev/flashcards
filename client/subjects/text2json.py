# -*- coding: utf-8 -*-

import json

quest = 'naive bayes ass'
string = r'$v_{MAP} = \underset{v_j \in V}{argmax} ~P(v_j) \prod_{i} P(a_j|v_j)$'

obj = { 'answer': quest, 'question': string }

print(json.dumps(obj))
