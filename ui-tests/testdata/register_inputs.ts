export const invalidRegisterDetails = [
  {
    email: undefined,
    password: 'Password_123',
    confirmPassword: 'Password_123',
    expectedErrors: ['The Email field is required.'],
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: undefined,
    confirmPassword: 'Password_123',
    expectedErrors: [
      'The Password field is required.The password and confirmation password do not match.',
    ],
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: 'Password_123',
    confirmPassword: undefined,
    expectedErrors: ['The password and confirmation password do not match.'],
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: 'Password_123',
    confirmPassword: '321_Password',
    expectedErrors: ['The password and confirmation password do not match.'],
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: 'noDigitNoSpecial',
    confirmPassword: 'noDigitNoSpecial',
    expectedErrors: [
      "Passwords must have at least one non letter or digit character. Passwords must have at least one digit ('0'-'9').",
    ],
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: '0123456789',
    confirmPassword: '0123456789',
    expectedErrors: [
      "Passwords must have at least one non letter or digit character. Passwords must have at least one lowercase ('a'-'z'). Passwords must have at least one uppercase ('A'-'Z').",
    ],
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: 'nouppercase_123',
    confirmPassword: 'nouppercase_123',
    expectedErrors: ["Passwords must have at least one uppercase ('A'-'Z')."],
  },
  ...[
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@example.web',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
    '“(),:;<>[]@example.com',
    'just"not"right@example.com',
    'this is"really"notallowed@example.com',
  ].map(email => {
    return {
      email: email,
      password: 'Password_123',
      confirmPassword: 'Password_123',
      expectedErrors: ['The Email field is not a valid e-mail address.'],
    }
  }),
]
