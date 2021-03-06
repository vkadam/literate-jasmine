var writer = require('../src/writer'),
    fs = require('fs');

describe('writer', function() {
  beforeEach(function() {
    spyOn(fs, 'writeFileSync');
  });

  it('writes the tree of describe and it blocks out to the file', function() {
    var filename = "example_spec.js";
    var tree = {
      name: 'example',
      describes: [{
        name: 'the describe name',
        it: [{
          name: 'the it name',
          code: 'var example = "example";\nexpect(example).toBe("example");\n'
        }]
      }]
    };

    writer(filename, tree);

    expect(fs.writeFileSync.mostRecentCall.args[0]).toBe(filename);

    expect(fs.writeFileSync.mostRecentCall.args[1]).toContain(tree.name);
    expect(fs.writeFileSync.mostRecentCall.args[1]).toContain(tree.describes[0].name);
    expect(fs.writeFileSync.mostRecentCall.args[1]).toContain(tree.describes[0].it[0].name);

    tree.describes[0].it[0].code.split('\n').forEach(function(code_line) {
      expect(fs.writeFileSync.mostRecentCall.args[1]).toContain(code_line);
    });
  });

  it('writes the root global out', function() {
    var tree = {
      name: 'example',
      global: 'var someVariable = 42;',
      describes: []
    };

    writer('someFileName_spec.js', tree);

    expect(fs.writeFileSync.mostRecentCall.args[1]).toContain('var someVariable = 42;');
  });

  it('writes the describe beforeEach out', function() {
    var tree = {
      name: 'example',
      describes: [{
        name: 'the describe name',
        beforeEach: 'someVariable = 404;',
        it: [{
          name: 'the it name',
          code: 'var example = "example";\nexpect(example).toBe("example");\n'
        }]
      }]
    };

    writer('someFileName_spec.js', tree);

    expect(fs.writeFileSync.mostRecentCall.args[1]).toContain('beforeEach');
    expect(fs.writeFileSync.mostRecentCall.args[1]).toContain('someVariable = 404;');
  });
});
