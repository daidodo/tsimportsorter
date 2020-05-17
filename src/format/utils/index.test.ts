import assert from 'assert';

import { normalizePath } from './';

suite('utils', () => {
  suite('normalizePath', () => {
    test('forward-slash', () => {
      assert.deepEqual(normalizePath(undefined), '');
      assert.deepEqual(normalizePath(null), '');
      assert.deepEqual(normalizePath(''), '');
      assert.deepEqual(normalizePath('a'), 'a');
      assert.deepEqual(normalizePath('a/'), 'a/');
      assert.deepEqual(normalizePath('a/b'), 'a/b');
      assert.deepEqual(normalizePath('a/b/'), 'a/b/');
      assert.deepEqual(normalizePath('a/b/.'), 'a/b');
      assert.deepEqual(normalizePath('a/b/./'), 'a/b/');
      assert.deepEqual(normalizePath('a/b/./..'), 'a');
      assert.deepEqual(normalizePath('a/b/./../'), 'a/');
      assert.deepEqual(normalizePath('a/b/..'), 'a');
      assert.deepEqual(normalizePath('a/b/../'), 'a/');
      assert.deepEqual(normalizePath('a/b/../.'), 'a');
      assert.deepEqual(normalizePath('a/b/.././'), 'a/');
      assert.deepEqual(normalizePath('.'), './');
      assert.deepEqual(normalizePath('./'), './');
      assert.deepEqual(normalizePath('./a'), './a');
      assert.deepEqual(normalizePath('./a/'), './a/');
      assert.deepEqual(normalizePath('./a/b'), './a/b');
      assert.deepEqual(normalizePath('./a/b/'), './a/b/');
      assert.deepEqual(normalizePath('./a/b/.'), './a/b');
      assert.deepEqual(normalizePath('./a/b/./'), './a/b/');
      assert.deepEqual(normalizePath('./a/b/./..'), './a');
      assert.deepEqual(normalizePath('./a/b/./../'), './a/');
      assert.deepEqual(normalizePath('./a/b/..'), './a');
      assert.deepEqual(normalizePath('./a/b/../'), './a/');
      assert.deepEqual(normalizePath('./a/b/../.'), './a');
      assert.deepEqual(normalizePath('./a/b/.././'), './a/');
      assert.deepEqual(normalizePath('..'), '../');
      assert.deepEqual(normalizePath('../'), '../');
      assert.deepEqual(normalizePath('../a'), '../a');
      assert.deepEqual(normalizePath('../a/'), '../a/');
      assert.deepEqual(normalizePath('../a/b'), '../a/b');
      assert.deepEqual(normalizePath('../a/b/'), '../a/b/');
      assert.deepEqual(normalizePath('../a/b/.'), '../a/b');
      assert.deepEqual(normalizePath('../a/b/./'), '../a/b/');
      assert.deepEqual(normalizePath('../a/b/./..'), '../a');
      assert.deepEqual(normalizePath('../a/b/./../'), '../a/');
      assert.deepEqual(normalizePath('../a/b/..'), '../a');
      assert.deepEqual(normalizePath('../a/b/../'), '../a/');
      assert.deepEqual(normalizePath('../a/b/../.'), '../a');
      assert.deepEqual(normalizePath('../a/b/.././'), '../a/');
      assert.deepEqual(normalizePath('./.'), './');
      assert.deepEqual(normalizePath('././'), './');
      assert.deepEqual(normalizePath('./..'), '../');
      assert.deepEqual(normalizePath('./../'), '../');
      assert.deepEqual(normalizePath('../.'), '../');
      assert.deepEqual(normalizePath('.././'), '../');
      assert.deepEqual(normalizePath('../..'), '../../', '../..');
      assert.deepEqual(normalizePath('../../'), '../../');
      assert.deepEqual(normalizePath('a//b'), 'a/b');
      assert.deepEqual(normalizePath('a//b//'), 'a/b/');
    });
    test('back-slash', () => {
      assert.deepEqual(normalizePath('a'), 'a');
      assert.deepEqual(normalizePath('a\\'), 'a/');
      assert.deepEqual(normalizePath('a\\b'), 'a/b');
      assert.deepEqual(normalizePath('a\\b\\'), 'a/b/');
      assert.deepEqual(normalizePath('a\\b\\.'), 'a/b');
      assert.deepEqual(normalizePath('a\\b\\.\\'), 'a/b/');
      assert.deepEqual(normalizePath('a\\b\\.\\..'), 'a');
      assert.deepEqual(normalizePath('a\\b\\.\\..\\'), 'a/');
      assert.deepEqual(normalizePath('a\\b\\..'), 'a');
      assert.deepEqual(normalizePath('a\\b\\..\\'), 'a/');
      assert.deepEqual(normalizePath('a\\b\\..\\.'), 'a');
      assert.deepEqual(normalizePath('a\\b\\..\\.\\'), 'a/');
      assert.deepEqual(normalizePath('.'), './');
      assert.deepEqual(normalizePath('.\\'), './');
      assert.deepEqual(normalizePath('.\\a'), './a');
      assert.deepEqual(normalizePath('.\\a\\'), './a/');
      assert.deepEqual(normalizePath('.\\a\\b'), './a/b');
      assert.deepEqual(normalizePath('.\\a\\b\\'), './a/b/');
      assert.deepEqual(normalizePath('.\\a\\b\\.'), './a/b');
      assert.deepEqual(normalizePath('.\\a\\b\\.\\'), './a/b/');
      assert.deepEqual(normalizePath('.\\a\\b\\.\\..'), './a');
      assert.deepEqual(normalizePath('.\\a\\b\\.\\..\\'), './a/');
      assert.deepEqual(normalizePath('.\\a\\b\\..'), './a');
      assert.deepEqual(normalizePath('.\\a\\b\\..\\'), './a/');
      assert.deepEqual(normalizePath('.\\a\\b\\..\\.'), './a');
      assert.deepEqual(normalizePath('.\\a\\b\\..\\.\\'), './a/');
      assert.deepEqual(normalizePath('..'), '../');
      assert.deepEqual(normalizePath('..\\'), '../');
      assert.deepEqual(normalizePath('..\\a'), '../a');
      assert.deepEqual(normalizePath('..\\a\\'), '../a/');
      assert.deepEqual(normalizePath('..\\a\\b'), '../a/b');
      assert.deepEqual(normalizePath('..\\a\\b\\'), '../a/b/');
      assert.deepEqual(normalizePath('..\\a\\b\\.'), '../a/b');
      assert.deepEqual(normalizePath('..\\a\\b\\.\\'), '../a/b/');
      assert.deepEqual(normalizePath('..\\a\\b\\.\\..'), '../a');
      assert.deepEqual(normalizePath('..\\a\\b\\.\\..\\'), '../a/');
      assert.deepEqual(normalizePath('..\\a\\b\\..'), '../a');
      assert.deepEqual(normalizePath('..\\a\\b\\..\\'), '../a/');
      assert.deepEqual(normalizePath('..\\a\\b\\..\\.'), '../a');
      assert.deepEqual(normalizePath('..\\a\\b\\..\\.\\'), '../a/');
      assert.deepEqual(normalizePath('.\\.'), './');
      assert.deepEqual(normalizePath('.\\.\\'), './');
      assert.deepEqual(normalizePath('.\\..'), '../');
      assert.deepEqual(normalizePath('.\\..\\'), '../');
      assert.deepEqual(normalizePath('..\\.'), '../');
      assert.deepEqual(normalizePath('..\\.\\'), '../');
      assert.deepEqual(normalizePath('..\\..'), '../../', '../..');
      assert.deepEqual(normalizePath('..\\..\\'), '../../');
      assert.deepEqual(normalizePath('C:\\'), 'C:/');
      assert.deepEqual(normalizePath('C:\\a'), 'C:/a');
      assert.deepEqual(normalizePath('C:\\a\\'), 'C:/a/');
      assert.deepEqual(normalizePath('a\\\\b'), 'a/b');
      assert.deepEqual(normalizePath('a\\\\b\\\\'), 'a/b/');
    });
  });
});