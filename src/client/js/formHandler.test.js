// Import the functions to test
import { handleSubmit } from './formHandler';

// Mock the global fetch so we don't perform actual HTTP requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({irony: 'IRONIC', confidence: '100', agreement: 'AGREED', subjectivity: 'SUBJECTIVE'}),
  })
);

// Mock Client object
global.Client = {
  validateInput: jest.fn(),
};

// Setup and teardown for mocking the DOM
beforeEach(() => {
  // Mock document.getElementById
  document.getElementById = jest.fn((id) => {
    if (!global[id]) {
      global[id] = { value: '' };
    }
    return global[id];
  });

  // Reset fetch mock before each test
  fetch.mockClear();
  Client.validateInput.mockClear();
});

afterEach(() => {
  Object.keys(global).forEach(key => {
    if (['irony', 'confidence', 'agreement', 'subjectivity'].includes(key)) {
      delete global[key];
    }
  });
});

test('handleSubmit function exists', () => {
  expect(handleSubmit).toBeDefined();
});

test('handleSubmit calls validateInput and postData', () => {
  const event = { preventDefault: jest.fn() };
  handleSubmit(event);
  expect(event.preventDefault).toHaveBeenCalled();

  return new Promise((resolve) => {
    setTimeout(() => {
      expect(Client.validateInput).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(1);
      resolve();
    }, 0);
  });
});

test('postData updates DOM elements correctly', () => {
  const event = { preventDefault: jest.fn() };
  handleSubmit(event);

  return new Promise((resolve) => {
    setTimeout(() => {
      expect(document.getElementById('irony').value).toBe('IRONIC');
      expect(document.getElementById('confidence').value).toBe('100');
      expect(document.getElementById('agreement').value).toBe('AGREED');
      expect(document.getElementById('subjectivity').value).toBe('SUBJECTIVE');
      resolve();
    }, 0);
  });
});
