
const code = 'function helloWorld(message){return message;}';
const tree =
  {
    'range': [
      0,
      45
    ],
    'loc': {
      'start': {
        'line': 1,
        'column': 0
      },
      'end': {
        'line': 1,
        'column': 45
      }
    },
    'type': 'Program',
    'body': [
      {
        'range': [
          0,
          45
        ],
        'loc': {
          'start': {
            'line': 1,
            'column': 0
          },
          'end': {
            'line': 1,
            'column': 45
          }
        },
        'type': 'FunctionDeclaration',
        'id': {
          'range': [
            9,
            19
          ],
          'loc': {
            'start': {
              'line': 1,
              'column': 9
            },
            'end': {
              'line': 1,
              'column': 19
            }
          },
          'type': 'Identifier',
          'name': 'helloWorld'
        },
        'params': [
          {
            'range': [
              20,
              27
            ],
            'loc': {
              'start': {
                'line': 1,
                'column': 20
              },
              'end': {
                'line': 1,
                'column': 27
              }
            },
            'type': 'Identifier',
            'name': 'message'
          }
        ],
        'defaults': [

        ],
        'body': {
          'range': [
            28,
            45
          ],
          'loc': {
            'start': {
              'line': 1,
              'column': 28
            },
            'end': {
              'line': 1,
              'column': 45
            }
          },
          'type': 'BlockStatement',
          'body': [
            {
              'range': [
                29,
                44
              ],
              'loc': {
                'start': {
                  'line': 1,
                  'column': 29
                },
                'end': {
                  'line': 1,
                  'column': 44
                }
              },
              'type': 'ReturnStatement',
              'argument': {
                'range': [
                  36,
                  43
                ],
                'loc': {
                  'start': {
                    'line': 1,
                    'column': 36
                  },
                  'end': {
                    'line': 1,
                    'column': 43
                  }
                },
                'type': 'Identifier',
                'name': 'message'
              }
            }
          ]
        },
        'generator': false,
        'expression': false
      }
    ],
    'sourceType': 'script'
  };

const annotstionWarning = {
  row: '0',
  column: 1,
  text: 'Function helloWorld has not been exercised yet',
  type: 'warning'
};

const annotstionPassing = {
  row: '0',
  column: 1,
  text: 'All the 1 test cases Pass',
  type: 'info'
};

const annotstionFailling = {
  row: '0',
  column: 1,
  text: '10 out of 10 test cases Fail',
  type: 'info'
};


export { code, tree, annotstionWarning, annotstionPassing, annotstionFailling};
