# flashcards

This is a simple flashcard project I created while reading for TDT4173. I were in need of a flashcard application with support for mathematical formulas. So that's the difference between this flashcard-app and the ones I could locate by a quick search on GitHub.

### Change subject:
The questions are loaded from a JSON file located in `client/subjects/`. Place your file here. In this folder it's located a translater that converts plain text files to valid JSON files.

Change subject by editing the following line in `client/flashcard.js` to point to your JSON file:

```javascript
loadData('tdt4173.json');
```

#### Usage `text2json.py`:
Create your file containing questions with a freely chosen filename (e.g. `tdt0000.txt`). The format of this file must be the following:

```
Subject Name
Subject Code
Question:= Answer
...
```

The questions and/or answers may be on contain text in Latex Math Mode. A simple example of this is:

```
The formula for the Naive Bayes Classifier:= $v_{NB} = \underset{v_j \in V}{argmax} ~P(v_j) \prod_{i} P(a_j|v_j)$
```

`text2json.py` converts this file to valid JSON by executing the command:

```bash
$ python3 text2json.py tdt0000
```
