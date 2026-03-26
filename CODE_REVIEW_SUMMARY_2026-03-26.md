# Code Review Summary - March 26, 2026

## Overview

This code review was performed on commits pushed to `main` branch on March 26, 2026 by mkssymh.

**Commits Reviewed**:
- `787aae4` - "fixed js" 
- `4be0fe5` - Merge branch 'main' (merge commit, no review needed)

**Total Issues Found**: 5 violations of AGENTS.md standards

---

## Issues Created

### Issue #79 - Critical: Removed DOMContentLoaded Event Wrapper
**Severity**: 🔴 HIGH  
**Commit**: 787aae4 ("fixed js")  
**Author**: mkssymh  
**File**: `js/projects-navbar.js`

**Violation**: Removed `DOMContentLoaded` event listener wrapper, causing code to execute before DOM is ready.

**Details**:
- Before: `document.addEventListener("DOMContentLoaded", () => { ... })`
- After: Code runs immediately at module level

**AGENTS.md Reference**: JavaScript Guidelines - "use vanilla JavaScript, avoid unnecessary DOM manipulation"

**Risk**: Elements may be null when accessed, causing runtime errors

**Status**: ⏳ Assigned to mkssymh

---

### Issue #80 - Medium: Inconsistent BEM Class Naming (menu state)
**Severity**: 🟡 MEDIUM  
**Category**: BEM Naming Inconsistency  
**Files**: `js/header.js`, `js/projects-navbar.js`, `css/global.css`, `css/projects.css`

**Violation**: Two different class names for menu open state:
- `header.js` uses: `menu-open` (non-BEM)
- `projects-navbar.js` uses: `body--menu-open` (BEM-compliant)

**AGENTS.md Reference**: CSS Architecture - "CSS must follow BEM methodology"

**Status**: ⏳ Assigned to Daniello210

---

### Issue #81 - Medium: Non-BEM Compliant .active Class
**Severity**: 🟡 MEDIUM  
**Category**: BEM Naming Violation  
**Files**: `js/header.js`, `css/global.header.partial.css`

**Violation**: Generic `.active` class instead of BEM-compliant modifier

**Details**:
- `header.js` toggles `active` class
- CSS uses `.header__burger.active`, `.header__nav.active`
- Should use: `.header__burger--active`, `.header__nav--active`

**AGENTS.md Reference**: Component Naming - "Avoid generic class names"

**Status**: ⏳ Assigned to Daniello210

---

### Issue #82 - Low-Medium: Non-BEM Compliant .popup-open Class
**Severity**: 🟡 MEDIUM  
**Category**: BEM Naming Inconsistency  
**Files**: `js/contact-popup.js`, `css/index.contact-popup.partial.css`

**Violation**: Non-BEM compliant `popup-open` class on body element

**Details**:
- Should be: `body--popup-open` (consistent with other body modifiers)
- Currently: `popup-open` (non-BEM, generic name)

**AGENTS.md Reference**: CSS Architecture - BEM Methodology

**Status**: ⏳ Assigned to mkssymh

---

### Issue #83 - Medium: Global Variables in JavaScript
**Severity**: 🟡 MEDIUM  
**Commit**: f169e6feaf8a (from previous push, but related to active codebase)  
**Author**: szymon-inski  
**File**: `js/index.our-team.partial.photo-animation.js`

**Violation**: Module-level variables `checkCount` and `checkInterval` pollute global scope

**Details**:
```javascript
let checkCount = 0;  // Global variable
const checkInterval = setInterval(() => { ... });  // Global variable
```

**AGENTS.md Reference**: JavaScript Guidelines - "avoid global variables"

**Recommendation**: Wrap code in IIFE (pattern already used in `contact-popup.js`)

**Status**: ⏳ Assigned to szymon-inski

---

## Summary by Category

### BEM Naming Violations: 4 issues
1. `menu-open` vs `body--menu-open` inconsistency
2. `.active` generic class (should be `--active` modifier)
3. `.popup-open` non-BEM naming
4. (Related pattern found in global.css using `menu-open`)

### JavaScript Best Practices: 2 issues
1. Missing `DOMContentLoaded` wrapper (critical)
2. Global variables not encapsulated

### File/Code Quality: Overall
- ✅ File naming follows kebab-case correctly
- ✅ HTML structure appears semantic
- ✅ CSS mostly follows BEM (except noted issues)
- ❌ Inconsistent class naming patterns
- ❌ Some JavaScript patterns not following guidelines

---

## Recommendations

### Immediate (High Priority)
1. **Issue #79**: Restore `DOMContentLoaded` wrapper in `projects-navbar.js`
2. **Issue #80**: Standardize on `body--menu-open` across all files

### Short-term (Medium Priority)
3. **Issue #81**: Rename `.active` to BEM-compliant modifiers
4. **Issue #82**: Rename `popup-open` to `body--popup-open`
5. **Issue #83**: Encapsulate global variables in IIFE

### Long-term
- Establish linting rules to catch these violations automatically
- Add code review checklist based on AGENTS.md
- Consider using CSS/JS linters (stylelint, ESLint) without requiring frameworks

---

## Code Review Process Used

✅ File structure verified  
✅ Naming conventions checked  
✅ BEM CSS compliance reviewed  
✅ JavaScript patterns analyzed  
✅ Global variable scope examined  
✅ DOM manipulation practices verified  
✅ Issues created and assigned to authors  

---

**Review Date**: March 26, 2026  
**Reviewer**: Cursor Automation Agent  
**Repository**: https://github.com/koldovsky/4963-team-02  
**Base Branch**: main
