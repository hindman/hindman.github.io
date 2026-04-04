// examples.js -- Hardcoded example videos loaded by the "Load examples" (ae)
// feature. Each video uses its YouTube ID as its app ID so the operation is
// idempotent: re-running ae skips any video already in the library.
//
// To add or update examples: fill in real YouTube IDs, names, and entity
// timings. The last_modified values below are intentionally set in the past
// so that any edits the user makes will always be treated as newer.

export const EXAMPLES = [

  // Ex1: single song, illustrating sections and saved loops.
  {
    "id": "zP4lYpsfL8c",
    "url": "https://www.youtube.com/watch?v=zP4lYpsfL8c",
    "name": "Catfish blues — daddystovepipe",
    "last_modified": 1775284026418,
    "duration": 250.661,
    "time": 184.51931994087218,
    "start": 0,
    "end": null,
    "speed": 1,
    "seek_delta": 10,
    "nudge_delta": 1,
    "entity_type": "section",
    "looping": false,
    "last_opened": 1775284038381,
    "zone2_mode": "sections",
    "chapters": [
      {
        "id": "ez84bz8",
        "end": 50,
        "name": "Ch1",
        "start": 0
      },
      {
        "id": "j1tmegf",
        "end": 190,
        "name": "Ch2",
        "start": 50
      },
      {
        "id": "xdpdttx",
        "end": null,
        "name": "Ch3",
        "start": 190
      }
    ],
    "sections": [
      {
        "id": "ojt7aob",
        "end": 30,
        "name": "A",
        "start": 0
      },
      {
        "id": "fujw0zi",
        "end": null,
        "name": "B",
        "start": 30
      },
      {
        "id": "z3kny04",
        "end": null,
        "name": "Verse 3",
        "start": 60
      },
      {
        "id": "z78dunf",
        "end": null,
        "name": "D",
        "start": 90
      },
      {
        "id": "ir4wr87",
        "end": 150,
        "name": "E",
        "start": 120
      },
      {
        "id": "6oqwyko",
        "end": 180,
        "name": "F",
        "start": 150
      },
      {
        "id": "9hx7i5s",
        "end": null,
        "name": "G",
        "start": 180
      },
      {
        "id": "35z4eir",
        "end": null,
        "name": "H",
        "start": 210
      }
    ],
    "loops": [
      {
        "id": "kf4zydo",
        "end": 152,
        "name": "",
        "start": 118,
        "source": null,
        "is_scratch": true
      },
      {
        "id": "xrui1ho",
        "end": 58,
        "name": "x",
        "start": 48,
        "source": null,
        "is_scratch": false
      },
      {
        "id": "1q43g89",
        "end": 165,
        "name": "a",
        "start": 133,
        "source": null,
        "is_scratch": false
      },
      {
        "id": "k523ku4",
        "name": "New loop test",
        "start": 174,
        "end": 182,
        "source": null,
        "is_scratch": false
      }
    ],
    "marks": [
      {
        "id": "7ym90tn",
        "name": "",
        "time": 35.88379595040894
      },
      {
        "id": "7nf1jxv",
        "name": "",
        "time": 44.87840707076686
      },
      {
        "id": "lhhvfvn",
        "name": "",
        "time": 53.775559
      },
      {
        "id": "117t5g2",
        "name": "",
        "time": 80.469793
      },
      {
        "id": "tbc6hvo",
        "name": "",
        "time": 92.0931
      },
      {
        "id": "4sjtlly",
        "name": "",
        "time": 104.74525299999999
      },
      {
        "id": "z9u9bk4",
        "time": 125.01302,
        "name": ""
      },
      {
        "id": "5zrwms6",
        "time": 165.47975300000002,
        "name": ""
      },
      {
        "id": "hw51mo1",
        "time": 191,
        "name": "bar"
      }
    ],
    "jumps": [
      108,
      54.868793093460084,
      197.11561489700318,
      65.32864087220764,
      145.09136292179872,
      53.74954097711181,
      138.18416102670287,
      38.690225078201294,
      125.01302,
      155.3077168111725,
      195.28111511825563,
      135.899576,
      135.899576,
      195.28111511825563,
      191.614182,
      113.8034473244147,
      133,
      79.847529,
      133,
      48,
      134.907023,
      175.04630190272522,
      177.79267208392335,
      141.5482541525879,
      129.08855803623962,
      69.37245104196167,
      122.67998902861022,
      123.69034511634827,
      133.47945,
      127.03487492561341,
      109.17357004005432,
      127.278324,
      130.7776689809265,
      137.6048560114441,
      142.93076216212464,
      131.87534194850159,
      17.023211062942504,
      150,
      120,
      90
    ]
  },

  // Ex2: concert video, illustrating chapters.
  {
    "id": "hf91Y7-WNyw",
    "url": "https://www.youtube.com/watch?v=hf91Y7-WNyw",
    "name": "Tommy Emmanuel — Grey Fox Bluegrass Festival",
    "last_modified": 1775284038380,
    "duration": 4247.801,
    "time": 1378.852422,
    "start": 0,
    "end": null,
    "speed": 0.7,
    "seek_delta": 5,
    "nudge_delta": 5,
    "entity_type": "any",
    "looping": true,
    "last_opened": 1775284026418,
    "zone2_mode": "sections",
    "chapters": [],
    "sections": [],
    "loops": [
      {
        "id": "10lo1ax",
        "end": 1788.3115020019075,
        "name": "",
        "start": 1377.4942189023438,
        "source": null,
        "is_scratch": true
      },
      {
        "id": "a5xjuvj",
        "end": 1788.3115020019075,
        "name": "L1",
        "start": 1375.4121940362397,
        "source": null,
        "is_scratch": false
      },
      {
        "id": "zmixudu",
        "end": 1788.3115020019075,
        "name": "L2",
        "start": 1652.3275259832153,
        "source": null,
        "is_scratch": false
      }
    ],
    "marks": [],
    "jumps": []
  },

];
