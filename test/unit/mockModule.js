
export class MockModule {

  getMockCode() {
    return  `
       function helloWorld(message){
         return message;
       }
    `;
  }
  getMockTree() {
    return {
      'type': 'Program',
      'body': [
        {
          'type': 'FunctionDeclaration',
          'id': {
            'type': 'Identifier',
            'name': 'helloWorld',
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
            }
          },
          'params': [
            {
              'type': 'Identifier',
              'name': 'message',
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
              }
            }
          ],
          'body': {
            'type': 'BlockStatement',
            'body': [
              {
                'type': 'ReturnStatement',
                'argument': {
                  'type': 'Identifier',
                  'name': 'message',
                  'range': [
                    47,
                    54
                  ],
                  'loc': {
                    'start': {
                      'line': 2,
                      'column': 16
                    },
                    'end': {
                      'line': 2,
                      'column': 23
                    }
                  }
                },
                'range': [
                  40,
                  55
                ],
                'loc': {
                  'start': {
                    'line': 2,
                    'column': 9
                  },
                  'end': {
                    'line': 2,
                    'column': 24
                  }
                }
              }
            ],
            'range': [
              28,
              65
            ],
            'loc': {
              'start': {
                'line': 1,
                'column': 28
              },
              'end': {
                'line': 3,
                'column': 8
              }
            }
          },
          'generator': false,
          'expression': false,
          'range': [
            0,
            65
          ],
          'loc': {
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 3,
              'column': 8
            }
          }
        }
      ],
      'sourceType': 'script',
      'range': [
        0,
        65
      ],
      'loc': {
        'start': {
          'line': 1,
          'column': 0
        },
        'end': {
          'line': 3,
          'column': 8
        }
      }
    };
  }
  
}
