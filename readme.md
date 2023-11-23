## Script to automate translation

#### Install Dependencies

```console
pnpm install
```

#### Run

```console
pnpm run dev
```

### Sample input.csv

| Key(**do not remove this!**) |
| ---------------------------- |
| 68 is preposition            |
| 72 is real                   |

### Sample output.csv

| English           | Hindi           | Marathi              | Gujarati             | Tamil                |
| ----------------- | --------------- | -------------------- | -------------------- | -------------------- |
| 68 is preposition | 68 पूर्वसर्ग है | 68 म्हणजे पूर्वतयारी | 68 પૂર્વનિર્ધારિત છે | 68 என்பது முன்மொழிவு |
| 72 is real        | 72 असली है      | 72 वास्तविक आहेी     | 72 વાસ્તવિક છે       | 72 உண்மையானது        |

### Sample languages.json

```javascript
{
  "0": { "68 is preposition": "68 is preposition", "72 is real": "72 is real" },
  "1": { "68 is preposition": "68 पूर्वसर्ग है", "72 is real": "72 असली है" },
  "2": {
    "68 is preposition": "68 पूर्वसूचना आहे",
    "72 is real": "72 वास्तविक आहे"
  },
  "3": {
    "68 is preposition": "68 પૂર્વનિર્ધારણ છે",
    "72 is real": "72 વાસ્તવિક છે"
  },
  "4": {
    "68 is preposition": "68 என்பது முன்மொழிவு",
    "72 is real": "72 உண்மையானது"
  }
}
```
