// examples.js -- Hardcoded example videos loaded by the "Load examples" (ae)
// feature. Each video uses its YouTube ID as its app ID so the operation is
// idempotent: re-running ae skips any video already in the library.
//
// To add or update examples: fill in real YouTube IDs, names, and entity
// timings. The last_modified values below are intentionally set in the past
// so that any edits the user makes will always be treated as newer.
//
// When the app schema version changes: update the video data to match the new
// schema and bump schema_version below to match SCHEMA_VERSION in state.js.

export const EXAMPLES = {
  schema_version: 11,
  videos: [

  // Ex1: single song, illustrating all entities.
  {
    "id": "zP4lYpsfL8c",
    "url": "https://www.youtube.com/watch?v=zP4lYpsfL8c",
    "name": "Catfish blues — daddystovepipe",
    "last_modified": 1775858192218,
    "duration": 250.661,
    "time": 0,
    "start": 0,
    "end": null,
    "speed": 1,
    "seek_delta": 5,
    "nudge_delta": 1,
    "entity_type": "section",
    "scratchLoop": { "start": 0, "end": 19, "looping": true, "sourceId": null, "sourceType": null },
    "last_opened": 1775858168685,
    "zone2_mode": "sections",
    "chapters": [
      {
        "id": "ug9fe48",
        "name": "Ch1: intro",
        "start": 0,
        "end": null
      },
      {
        "id": "icagmb1",
        "name": "Ch2: A1-A3",
        "start": 17,
        "end": null
      },
      {
        "id": "jqmysbg",
        "name": "Ch3: solo",
        "start": 127,
        "end": null
      },
      {
        "id": "k4kjfe3",
        "name": "Ch4: A4-A5",
        "start": 160,
        "end": null
      },
      {
        "id": "3jhycz1",
        "name": "Ch5: outro",
        "start": 220,
        "end": null
      }
    ],
    "sections": [
      {
        "id": "ojt7aob",
        "name": "Intro",
        "start": 0,
        "end": null
      },
      {
        "id": "kszi8qb",
        "start": 17,
        "end": null,
        "name": "A1"
      },
      {
        "id": "xmi5snx",
        "start": 50,
        "end": null,
        "name": "A2"
      },
      {
        "id": "nkk44dh",
        "start": 90,
        "end": null,
        "name": "A3"
      },
      {
        "id": "cs046zs",
        "start": 127,
        "end": null,
        "name": "Solo"
      },
      {
        "id": "zvrk99d",
        "start": 160,
        "end": null,
        "name": "A4"
      },
      {
        "id": "e36hlwi",
        "start": 196,
        "end": null,
        "name": "A5"
      },
      {
        "id": "l6ov0a8",
        "start": 220,
        "end": null,
        "name": "Outro"
      }
    ],
    "loops": [
      {
        "id": "m4cj7fs",
        "name": "Section tag",
        "start": 76.94232,
        "end": 90.78550597138977
      },
      {
        "id": "qbm6vir",
        "name": "Solo",
        "start": 125,
        "end": 162
      },
      {
        "id": "2f0c069",
        "name": "Outro riff",
        "start": 225.67748203814696,
        "end": 233.05485189318847
      }
    ],
    "marks": [
      {
        "id": "6jkw6w9",
        "time": 26.310959961853026,
        "name": "Thumb hit"
      },
      {
        "id": "wqz92g0",
        "time": 46.948387032424925,
        "name": "E7 trill"
      },
      {
        "id": "71y4hzo",
        "time": 77.48883514305115,
        "name": "Tag"
      },
      {
        "id": "zszxj65",
        "time": 127.7603690114441,
        "name": "Bends"
      },
      {
        "id": "4mh3h4r",
        "time": 247.388527,
        "name": "The look"
      }
    ],
    "jumps": [ ]
  },

  // Ex2: concert video, illustrating chapters.
  {
    "id": "iZMZ_xk2big",
    "url": "https://www.youtube.com/watch?v=iZMZ_xk2big",
    "name": "Edith Pageaud - SiccasGuitars",
    "last_modified": 1775858065671,
    "duration": null,
    "time": 865.092756,
    "start": 0,
    "end": null,
    "speed": 1,
    "seek_delta": 5,
    "nudge_delta": 5,
    "entity_type": "any",
    "scratchLoop": { "start": 864.751025, "end": 1156, "looping": true, "sourceId": null, "sourceType": null },
    "last_opened": 1775857572383,
    "zone2_mode": "chapters",
    "chapters": [
      {
        "id": "spssetk",
        "name": "Passacaglia in B - Biber",
        "start": 20.679577,
        "end": null
      },
      {
        "id": "iryfgek",
        "name": "Sonata 24 - Seixas",
        "start": 529.937977,
        "end": null
      },
      {
        "id": "qnm6whl",
        "name": "Oblivion - Piazzolla",
        "start": 600,
        "end": null
      },
      {
        "id": "p9dudc0",
        "name": "Prelude in C#m - Rachmaninov",
        "start": 866.751025,
        "end": null
      },
      {
        "id": "hiqggpp",
        "name": "Passacaille - Tansman",
        "start": 1154,
        "end": null
      },
      {
        "id": "uqdazzl",
        "name": "Segovia - Presti",
        "start": 1519,
        "end": null
      },
      {
        "id": "undm4oa",
        "name": "Los Caujaritos - Figueredo",
        "start": 1933.971781,
        "end": null
      }
    ],
    "sections": [],
    "loops": [],
    "marks": [],
    "jumps": [ ]
  }

  ],
};
