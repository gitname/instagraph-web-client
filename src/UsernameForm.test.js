import { usernameValidators } from './UsernameForm';

const {isNotEmpty, hasValidFormat} = usernameValidators;

describe('usernameValidators', function () {

  test('validates non-emptiness of string', () => {
    expect(isNotEmpty("a")).toBeUndefined();
    expect(isNotEmpty("abc")).toBeUndefined();
    expect(isNotEmpty(".")).toBeUndefined();
    expect(isNotEmpty("_")).toBeUndefined();
    expect(isNotEmpty("#")).toBeUndefined();
    expect(isNotEmpty(" ")).toBeUndefined();
    expect(isNotEmpty("")).not.toBeUndefined();
  });

  test('validates format of string', () => {
    expect(hasValidFormat("a")).toBeUndefined();
    expect(hasValidFormat("A")).toBeUndefined();
    expect(hasValidFormat("1")).toBeUndefined();
    expect(hasValidFormat(".")).toBeUndefined();
    expect(hasValidFormat("_")).toBeUndefined();
    expect(hasValidFormat("abc.DEF..123_456__789")).toBeUndefined();
    expect(hasValidFormat("#")).not.toBeUndefined();
    expect(hasValidFormat(" ")).not.toBeUndefined();
    expect(hasValidFormat("")).not.toBeUndefined();
  });

});