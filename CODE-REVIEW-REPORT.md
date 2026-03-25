# Code Review Report - March 25, 2026

**Reviewed Commits**: Last 5 commits to `main` branch (949ac56 to f8ba6e5)
**Review Date**: March 25, 2026
**Standards Applied**: AGENTS.md project guidelines

---

## Summary

This code review identifies **6 distinct violations** of AGENTS.md conventions across recent commits. All issues have been documented as GitHub issues and assigned to the respective authors.

### Violations by Severity:
- **Critical**: 2 issues
- **Major**: 3 issues  
- **Minor**: 1 issue

---

## Issues Found and Documented

### Issue #57: Invalid Filename - header,js
**Author**: Daniello210
**Commit**: a968fcb9c88f269ab39eefd677ae09173eea5594
**Severity**: CRITICAL
**Status**: PARTIALLY FIXED (renamed in commit 949ac56)

**Violation**: File was created with invalid name `header,js` (comma instead of dot)

**AGENTS.md Reference**: Section "File Naming Rules" - All files must use kebab-case
- ✗ Invalid: `header,js`
- ✓ Correct: `header.js`

**Details**: 
- The JavaScript file was initially created with an invalid filename containing a comma instead of a dot
- While the file was subsequently renamed to `js/header.js` in commit 949ac56, the initial violation should have been caught during development
- This demonstrates a need for stricter filename validation in the development workflow

**Prevention**: Ensure proper kebab-case naming from the start; use development tools that validate filename conventions

---

### Issue #58: Hardcoded Colors Instead of CSS Variables
**Author**: shopiakkh
**Commit**: f8ba6e5f8a8081c36d8ef19320f03ec6a9d86ecd
**Severity**: MAJOR
**Status**: OPEN

**Violation**: JavaScript uses hardcoded color strings instead of CSS custom properties

**AGENTS.md Reference**: 
- Section "CSS Variables" - All colors must be declared inside `:root`
- Rule: Avoid hardcoded colors when variables exist

**Current Code** (js/index.section-news.partial.js):
```javascript
const colors = ['white', 'black', 'red'];
```

**Problem**:
- Hard-coded color values bypass the centralized color system
- Changes to color scheme require code modification instead of CSS update
- Violates the principle of using CSS variables defined in global.css

**Global.css Available Colors**:
```css
--primary-text-color: #ffffff
--background-color: #151515
--secondary-text-color: #cacaca
--brand-color: #e21a59
--light-accent-color: #e25d1f
```

**Recommended Fix**:
Instead of hardcoded colors, use CSS variables. Consider switching to CSS animations instead of JavaScript:

```css
@keyframes color-cycle {
  0% { color: var(--primary-text-color); }
  33% { color: var(--background-color); }
  66% { color: var(--brand-color); }
  100% { color: var(--primary-text-color); }
}

.news__title--main {
  animation: color-cycle 6s infinite;
}
```

---

### Issue #59: Inappropriate Alert Functionality
**Author**: shopiakkh
**Commit**: f8ba6e5f8a8081c36d8ef19320f03ec6a9d86ecd
**Severity**: MAJOR
**Status**: OPEN

**Violation**: Browser `alert()` used for user interaction in production code

**Current Code** (js/index.section-news.partial.js):
```javascript
workText.addEventListener('click', () => {
  alert("Thanks for you choise! 😉");
});
```

**Problems**:
1. Browser alerts provide poor UX - they block all user interaction
2. No actual functionality - just displays a message
3. Typo: 'choise' should be 'choice'
4. Not aligned with modern web standards or accessibility requirements
5. Cannot be styled or customized
6. Appears to be placeholder/test code

**AGENTS.md Reference**:
- Section "Minimal JavaScript" - Avoid unnecessary DOM manipulation
- Principle: Prefer clarity and maintainability

**Recommended Fix**:
Remove the alert functionality, or if user feedback is needed, implement a proper toast notification system. This appears to be testing code that should be removed entirely.

---

### Issue #60: Duplicate CSS Selector
**Author**: shopiakkh
**Commits**: Related to CSS updates (0d574cc, f8ba6e5)
**Severity**: MAJOR
**Status**: OPEN

**Violation**: CSS selector `.news__subtitle--item` appears twice with conflicting definitions

**Location**: `css/index.section-news.partial.css`

**First Definition** (line 98-107):
```css
.news__subtitle--item {
  color: var(--brand-color);
  font-family: var(--font-secondary);
  text-align: center;
  font-size: clamp(14px, 4vw, 15px);

  @media (min-width: 768px) {
    text-align: right;
  }
}
```

**Second Definition** (line 223-228):
```css
.news__subtitle--item {
  font-weight: bold;
  cursor: pointer; 
  animation: pulse 1s infinite; 
}
```

**Problems**:
- Duplicate selectors reduce CSS maintainability
- Second definition partially overrides properties of the first
- Creates CSS cascade confusion
- Difficult to debug which styles apply to which elements
- Makes future modifications risky

**AGENTS.md Reference**: Section "Code Formatting" - Keep code readable and maintainable

**Recommended Fix**:
Merge both definitions into a single selector:

```css
.news__subtitle--item {
  color: var(--brand-color);
  font-family: var(--font-secondary);
  text-align: center;
  font-size: clamp(14px, 4vw, 15px);
  font-weight: bold;
  cursor: pointer; 
  animation: pulse 1s infinite;

  @media (min-width: 768px) {
    text-align: right;
  }
}
```

---

### Issue #61: Unconventional JavaScript Filename
**Author**: shopiakkh
**Commit**: 48130ad7ac30ea468cc8c617275798a66bd8f9a6
**Severity**: MINOR
**Status**: OPEN

**Violation**: JavaScript file uses non-standard naming pattern `.partial.js`

**File**: `js/index.section-news.partial.js`

**Problem**:
- `.partial` naming convention should only apply to HTML partials
- JavaScript files should use standard kebab-case without `.partial`
- Creates confusion about file type and purpose
- Inconsistent with other JavaScript files: `header.js`, `contact-popup.js`, `script.js`

**AGENTS.md Reference**: 
- Section "File Naming Rules" - All files must use kebab-case
- Section "HTMX Partial Rules" - naming format is `[page].[component].partial.html` for HTML only

**Current References**:
- `index.html`: `<script src="js/index.section-news.partial.js"></script>`

**Recommended Fix**:
1. Rename: `js/index.section-news.partial.js` → `js/index.section-news.js`
2. Update HTML reference:
   ```html
   <script src="js/index.section-news.js"></script>
   ```

---

### Issue #62: Code Formatting Violations in JavaScript
**Author**: shopiakkh
**Commit**: f8ba6e5f8a8081c36d8ef19320f03ec6a9d86ecd
**Severity**: MINOR
**Status**: OPEN

**Violation**: Code formatting does not follow Prettier standards

**File**: `js/index.section-news.partial.js`

**Issues**:

1. **Inconsistent spacing around operators** (line 4):
   ```javascript
   let i=0;  // ✗ No spaces
   let i = 0;  // ✓ Correct
   ```

2. **Inconsistent spacing** (line 7):
   ```javascript
   i= (i + 1) % colors.length;  // ✗ Missing space after =
   i = (i + 1) % colors.length;  // ✓ Correct
   ```

**AGENTS.md Reference**: 
- Section "Code Formatting" - Code should follow Prettier formatting
- Rules: 2 space indentation, consistent spacing

**Recommended Fix**:
Apply proper Prettier formatting to the entire file:
```javascript
const text = document.querySelector(".news__title--main");
const colors = ["white", "black", "red"];

let i = 0;
setInterval(() => {
  text.style.color = colors[i];
  i = (i + 1) % colors.length;
}, 2000);

const workText = document.querySelector(".news__subtitle--item");

workText.addEventListener("click", () => {
  alert("Thanks for your choice! 😉");
});
```

---

## Compliance Summary

### AGENTS.md Sections Referenced:
1. ✓ File Naming Rules - **2 violations found**
2. ✓ CSS Variables - **1 violation found**
3. ✓ Minimal JavaScript - **2 violations found**
4. ✓ Code Formatting - **2 violations found**

### Project Structure Compliance:
- ✓ JavaScript files in `js/` directory - PASS
- ✓ CSS files in `css/` directory - PASS
- ⚠ Kebab-case naming - 3 violations found
- ⚠ Color variable usage - 1 violation found
- ⚠ Code formatting - 2 violations found

---

## GitHub Issues Created

All issues have been created and assigned to respective authors:

| Issue # | Title | Author | Severity |
|---------|-------|--------|----------|
| #57 | Invalid Filename - header,js | Daniello210 | CRITICAL |
| #58 | Hardcoded Colors Instead of CSS Variables | shopiakkh | MAJOR |
| #59 | Inappropriate Alert Functionality | shopiakkh | MAJOR |
| #60 | Duplicate CSS Selector | shopiakkh | MAJOR |
| #61 | Unconventional JavaScript Filename | shopiakkh | MINOR |
| #62 | Code Formatting Violations in JavaScript | shopiakkh | MINOR |

---

## Recommendations

### Immediate Actions:
1. Address CRITICAL and MAJOR severity issues before merge
2. Consolidate duplicate CSS selectors
3. Remove or properly implement user feedback mechanism
4. Use CSS variables for colors

### Process Improvements:
1. Implement pre-commit hooks to validate file naming conventions
2. Consider running Prettier in CI/CD pipeline
3. Add CSS linting to catch duplicate selectors
4. Establish code review checklist based on AGENTS.md guidelines
5. Create development guidelines document for team members

### Future Prevention:
1. Use EditorConfig to enforce consistent formatting
2. Configure Prettier with git hooks
3. Implement ESLint for JavaScript validation
4. Use StyleLint for CSS validation
5. Set up CI checks to validate AGENTS.md compliance

---

## Review Completion

**Review Status**: ✓ COMPLETE
**Total Issues Found**: 6
**Total Commits Reviewed**: 5
**Reviewers**: Code Review Automation
**Date**: March 25, 2026

---
