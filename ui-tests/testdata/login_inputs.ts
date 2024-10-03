export const invalidLoginDetails = [
  {
    email: undefined,
    password: 'Password_123',
    expectedEmailError: 'The Email field is required.',
    expectedPasswordError: '',
    expectSuccess: false,
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: undefined,
    expectedEmailError: '',
    expectedPasswordError: 'The Password field is required.',
    expectSuccess: false,
  },
  {
    email: 'csaba.test.bobak@nowhere.com',
    password: 'invalid',
    expectedEmailError: '',
    expectedPasswordError: '',
    expectSuccess: false,
  },
  {
    email: 'invalid',
    password: 'Password_123',
    expectedEmailError: '',
    expectedPasswordError: '',
    expectSuccess: false,
  },
  {
    email: 'invalid',
    password: 'invalid',
    expectedEmailError: '',
    expectedPasswordError: '',
    expectSuccess: false,
  },
]
