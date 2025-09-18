/**
 * Used in docgen plugin
 *
 * Very primitive way to check if a prop's type is referenced via a type alias (SpacingScale, IconName, etc).
 * If it starts with a capital letter, is not the literal value, and is an array with more than 1 value than
 * we can reasonably say this is one of those type aliases. The plugin allows us to pull these type aliases
 * out via the `addToSharedTypeAliases` fn that is passed into the onProcessDoc callback. If a prop's type is matched with
 * an alias in sharedTypeAliases it will only show the alias name with a Link that triggers a Modal to view the actual
 * value. This helps us avoid super long values which can make the docs noisy. We also avoid making docs too sparse
 * had we only shown the alias without any way to view the actual underlying value.
 */
function isTypeAlias(prop) {
  function firstIsUppercase(str) {
    if (typeof str !== 'string' || str.length === 0) return false;
    if (str[0].toUpperCase() === str[0]) return true;
    return false;
  }

  const { raw, value } = prop.type;
  return firstIsUppercase(raw) && !raw.includes('|') && Array.isArray(value) && value.length >= 2;
}

module.exports = isTypeAlias;
