module.exports = {
  'Notes': {
    'address': '0x5C81f66A68F184AC8B60b638B9Df1fda16C33b76',
    'abi': [
      {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor',
        'signature': 'constructor'
      },
      {
        'anonymous': false,
        'inputs': [
          {
            'indexed': false,
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'NoteAdded',
        'type': 'event',
        'signature': '0x47845bae1c19c06fc781e2d5e8c917f9d4d91f4d7cfceda2946276046a0aa8ec'
      },
      {
        'constant': false,
        'inputs': [
          {
            'name': 'tag',
            'type': 'string'
          },
          {
            'name': 'encrypted',
            'type': 'string'
          },
          {
            'name': 'author',
            'type': 'address'
          },
          {
            'name': 'sharedWith',
            'type': 'address[]'
          },
          {
            'name': 'encryptedKey',
            'type': 'string'
          }
        ],
        'name': 'addNote',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
        'signature': '0x1707c7ad'
      },
      {
        'constant': true,
        'inputs': [],
        'name': 'getNoteCount',
        'outputs': [
          {
            'name': '_count',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
        'signature': '0x41fb87fb'
      },
      {
        'constant': true,
        'inputs': [
          {
            'name': 'id',
            'type': 'uint256'
          }
        ],
        'name': 'getNote',
        'outputs': [
          {
            'name': 'tag',
            'type': 'string'
          },
          {
            'name': 'encrypted',
            'type': 'string'
          },
          {
            'name': 'author',
            'type': 'address'
          },
          {
            'name': 'sharedWith',
            'type': 'address[]'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function',
        'signature': '0xa965a941'
      }
    ]
  }
}
