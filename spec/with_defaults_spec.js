jest.autoMockOff();

const { withDefaults } = require('../index');

describe('withDefaults', () => {
  let userUrl;
  let categoryUrl;
  let externalUrl;
  let relativeUrl;

  beforeEach(() => {
    withDefaults({ _host: 'api.example.com' }, function(generate) {
      userUrl = generate('/users/:id');
      categoryUrl = generate('/categories/:name', { name: 'all' });
      externalUrl = generate('/', { _host: 'example.com' });
      relativeUrl = generate('/local', { _host: null });
    });
  });

  it('adds the params by default', () => {
    expect(userUrl(1)).toEqual('//api.example.com/users/1');
  });

  it('allows the params to be overridden', () => {
    expect(userUrl(1, { _host: 'test.com' })).toEqual('//test.com/users/1');
  });

  it('allows the params to be removed', () => {
    expect(userUrl(1, { _host: null })).toEqual('/users/1');
  });

  it('it merges with route-specific default params', () => {
    expect(categoryUrl()).toEqual('//api.example.com/categories/all');
  });

  it('it can be overridden by route-specific default params', () => {
    expect(externalUrl()).toEqual('//example.com/');
  });

  it('can have the param removed by route-specific default params', () => {
    expect(relativeUrl()).toEqual('/local');
  });
});
