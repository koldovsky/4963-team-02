# Code Review: Add overflow hidden style for menu open state

**Commit:** 369eab39947beea554af84825375e6fd171cdf52  
**Author:** Daniello210  
**Date:** Wed Mar 25 16:09:23 2026 +0100  
**File Modified:** css/global.css  
**GitHub Issue:** [#63 - BEM Naming Violation: Inconsistent menu-open class naming](https://github.com/koldovsky/4963-team-02/issues/63)

---

## Summary

This commit adds a CSS rule `body.menu-open { overflow: hidden; }` to prevent scrolling when the mobile menu is open. While the functionality is correct, there are **critical AGENTS.md compliance issues** related to BEM CSS naming conventions.

---

## Issues Found

### 🔴 CRITICAL: BEM Naming Violation

**Location:** `css/global.css` (line 62-64)

**Problem:**
The CSS class name `body.menu-open` violates BEM methodology defined in AGENTS.md.

**Current Code:**
```css
body.menu-open {
  overflow: hidden;
}
```

**Violation Details:**
1. According to AGENTS.md, BEM pattern is: `.block__element--modifier`
2. The class name should be `body--menu-open` (BEM modifier syntax)
3. However, `js/header.js` uses `menu-open` (generic, not BEM-prefixed)
4. Meanwhile, `js/projects-navbar.js` correctly uses `body--menu-open` (BEM syntax)

**Code Inconsistency:**

File: `js/header.js` (lines 11, 18)
```javascript
document.body.classList.toggle("menu-open");
document.body.classList.remove("menu-open");
```

File: `js/projects-navbar.js` (lines 13, 21, 30)
```javascript
document.body.classList.toggle("body--menu-open", isOpen);
document.body.classList.remove("body--menu-open");
```

**AGENTS.md Reference:**
- Section: "CSS Architecture" (lines 201-233)
- Rule: "CSS must follow **BEM methodology**"
- Pattern: `.block__element--modifier`

**Required Fix:**
The CSS should use the BEM-compliant name:
```css
body--menu-open {
  overflow: hidden;
}
```

And the `header.js` file should be updated to use the same class name for consistency.

---

## Impact

- **Severity:** High
- **Type:** Code Quality / Standards Violation
- **Scope:** Affects consistency between two JavaScript files and CSS
- **Risk:** Future maintenance issues due to inconsistent naming patterns

---

## Recommendation

1. Rename CSS class from `body.menu-open` to `body--menu-open`
2. Update `js/header.js` to use `body--menu-open` instead of `menu-open`
3. Ensure consistency with existing `js/projects-navbar.js` implementation

---

## AGENTS.md Compliance Checklist

- ❌ **BEM CSS naming** - Uses `body.menu-open` instead of `body--menu-open`
- ❌ **Code consistency** - Inconsistent class naming between `header.js` and `projects-navbar.js`
- ✅ **File placement** - CSS correctly placed in `css/global.css`
- ✅ **Formatting** - Code formatting follows standards
- ✅ **Mobile-first** - Not applicable (global style)
