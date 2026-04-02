# Code Review Report - 2026-04-02

**Date:** April 2, 2026
**Reviewer:** Automated Code Review Agent
**Branch:** cursor/code-review-issues-e84c
**Base Branch:** main

---

## Summary

Reviewed commits merged from main branch on 2026-04-02:
- **Commit:** e54f060 by mkssymh - "added css"
- **Commit:** 6bff71e by Daniello210 - "burger menu fix"

**Total Issues Found:** 6 critical violations of AGENTS.md standards
**Created GitHub Issues:** #170 - #175

---

## Review Against AGENTS.md Standards

### 1. CSS File Naming Violations (#170)

**Severity:** Medium
**Author:** mkssymh
**Files:** css/projects.css, css/single.project.css

**Issues:**
- File `css/single.project.css` uses dot notation inconsistent with project's kebab-case convention
- AGENTS.md requires all files use kebab-case naming

**Violations:**
```
Incorrect: single.project.css
Correct: single-project.css (matches HTML file naming)
```

**AGENTS.md Reference:** Section "File Naming Rules"
- All files must use kebab-case
- No camelCase, PascalCase, or snake_case

---

### 2. JavaScript/HTML Burger Menu Inconsistency (#171)

**Severity:** High
**Author:** Daniello210
**Files:** js/header.js, projects.html, single-project.html, global.header-nav.partial.html

**Issues:**
- `projects.html` and `single-project.html` hardcode duplicate header instead of using HTMX partial
- Inconsistent IDs/classes between implementations:
  - global.header-nav.partial.html uses: `#burger`, `#nav-menu`, `.header__burger`
  - projects.html uses: `header__toggle`, `projects-mobile-nav`
- Creates maintenance burden and coupling
- js/header.js targets '#burger' and '#nav-menu' which don't match projects page structure

**Root Cause:**
- Projects pages duplicate header code instead of loading via HTMX (like index.html correctly does)

**AGENTS.md Reference:** Section "HTMX Partial Architecture"
- Pages should act as containers for HTMX-loaded sections
- Avoid large inline sections inside pages
- Use HTMX partials instead

---

### 3. JavaScript Component Naming Violation (#172)

**Severity:** Medium
**Author:** mkssymh
**File:** js/single-project-carousel.js

**Issues:**
- Generic component naming violates BEM principles
- Selectors lack namespace:
  - `.recent-projects-card` (partial BEM, but should be full)
  - Uses generic data attributes without BEM class names
- No component namespace hierarchy

**Incorrect Pattern:**
```javascript
const recentProjectsCarousel = document.querySelector("[data-recent-projects-carousel]");
const firstCard = track.querySelector(".recent-projects-card");
```

**Correct Pattern (should follow BEM):**
```javascript
// Add BEM class to main element
.recent-projects-carousel {}
.recent-projects-carousel__track {}
.recent-projects-carousel__card {}
.recent-projects-carousel__button--prev {}
.recent-projects-carousel__button--next {}
```

**AGENTS.md Reference:** Section "Component Naming"
- Avoid generic class names like: carousel, slider, tabs, accordion
- Good: carousel-clients, slider-products
- Each component must have unique namespace

---

### 4. HTML Code Duplication - Hardcoded Headers (#173)

**Severity:** High
**Author:** mkssymh
**Files:** projects.html, single-project.html

**Issues:**
- **Header appears in 3 places** creating maintenance nightmare:
  1. index.html (correct) - loaded via HTMX partial
  2. projects.html - hardcoded (lines 18-66)
  3. single-project.html - hardcoded (lines 18-66)

- Violates DRY (Don't Repeat Yourself) principle
- Inconsistent class/ID naming between instances
- When header changes, must update in 3 places (or only 2 if using HTMX correctly)

**AGENTS.md Reference:** Section "HTML Architecture"
- Pages should act as containers for HTMX-loaded sections
- Each section should have dedicated partial
- Avoid large inline sections inside pages

**Correct Approach (like index.html):**
```html
<div
  data-hx-trigger="load"
  data-hx-swap="outerHTML"
  data-hx-get="global.header-nav.partial.html"
></div>
```

---

### 5. CSS DRY Principle Violations (#174)

**Severity:** Medium
**Author:** mkssymh
**Files:** css/projects.css, css/single.project.css

**Issues:**
- Hardcoded color values throughout instead of using CSS variables
- Repeated button styles with identical gradient patterns (lines 107-127 and 154-175 in projects.css)
- Hardcoded values: #151515, #ffffff, rgba(255,255,255, ...)
- Multiple media query blocks with duplicate selectors

**Violations:**
```css
/* Instead of */
color: #ffffff;
background-color: #151515;

/* Should use */
color: var(--color-light);
background-color: var(--color-dark);
```

**Repeated Patterns:**
```css
.project-grid-link { /* lines 107-127 */
  background: linear-gradient(590deg,
    #ff6a00 -35%,
    #ee0979 60%,
    #ff6a00 100%);
}

.projects.grid .project-info__link { /* lines 154-175 */
  background: linear-gradient(590deg,
    #ff6a00 -35%,
    #ee0979 60%,
    #ff6a00 100%);
}
```

**AGENTS.md Reference:** Section "CSS Variables"
- All colors must be declared inside :root
- Avoid hardcoded colors when variables exist
- Use: `background-color: var(--color-primary)`

---

### 6. Semantic HTML Violations (#175)

**Severity:** Low
**Author:** mkssymh
**File:** projects.html

**Issues:**
- Line 201: Uses `<button>` element with `href` attribute
  ```html
  <button href="#" class="project-grid-link">contact us</button>
  ```
  Should be:
  ```html
  <a href="#" class="project-grid-link">contact us</a>
  ```

- Semantic error: buttons shouldn't have href attributes
- Should use proper element for its purpose

**AGENTS.md Reference:** Section "Accessibility"
- Use semantic HTML
- Use proper elements for their intended purpose
- <a> for navigation/links
- <button> for form submission or JS actions

---

## Authors and Issues

### mkssymh (maxhladiak@gmail.com)
- **Issue #170:** CSS file naming inconsistency
- **Issue #172:** JS component naming violation
- **Issue #173:** HTML code duplication
- **Issue #174:** CSS DRY principle violations
- **Issue #175:** Semantic HTML violations

### Daniello210 (118121837+Daniello210@users.noreply.github.com)
- **Issue #171:** JS/HTML burger menu inconsistency

---

## Statistics

| Category | Count |
|----------|-------|
| Critical Issues | 2 |
| High Severity | 2 |
| Medium Severity | 2 |
| Low Severity | 0 |
| **Total Issues** | **6** |

---

## Recommendations

### Priority 1 (Critical)
1. **Refactor HTML Structure** - Remove hardcoded headers from projects pages
   - Use HTMX partial loading like index.html
   - Standardize class/ID naming globally
   - Update js/header.js to work with standardized selectors

2. **Fix JS/HTML Inconsistency** - Align burger menu implementation across all pages
   - Standardize on single set of class/ID names
   - Ensure js/header.js targets correct elements

### Priority 2 (Important)
1. **Extract CSS Variables** - Replace hardcoded colors with CSS custom properties
   - Audit global.css for existing variables
   - Define missing variables in :root
   - Update all hardcoded color references

2. **Fix Component Naming** - Add proper BEM namespacing to carousel
   - Rename generic classes to semantic BEM names
   - Add unique component namespace prefix

### Priority 3 (Standard)
1. **Fix File Naming** - Rename single.project.css to single-project.css
2. **Fix Semantic HTML** - Replace button elements with proper links
3. **Code Review Process** - Consider pre-commit linting for AGENTS.md compliance

---

## AGENTS.md Compliance Checklist

- [ ] All files use kebab-case naming
- [ ] HTMX partials used for all page sections
- [ ] No code duplication across pages
- [ ] BEM CSS methodology followed consistently
- [ ] CSS variables used for all colors
- [ ] Semantic HTML elements used correctly
- [ ] JavaScript is minimal and modular
- [ ] No unnecessary global variables
- [ ] Component names are unique and namespaced
- [ ] Prettier formatting applied consistently

---

## Files Requiring Changes

**HTML Files:**
- projects.html
- single-project.html
- global.header-nav.partial.html

**CSS Files:**
- css/projects.css
- css/single.project.css
- css/global.css (possible expansion needed)

**JavaScript Files:**
- js/header.js
- js/single-project-carousel.js

---

## Report Generated

- **Date:** 2026-04-02
- **Tool:** Automated Code Review Agent
- **Reviewed Commits:** 2
- **Files Changed:** 6
- **Issues Created:** 6 (GitHub #170-#175)

---

## Next Steps

1. Review GitHub issues #170-#175
2. Assign to respective authors
3. Prioritize fixes by severity
4. Implement changes following AGENTS.md guidelines
5. Submit for re-review after changes
6. Merge to main after approval

---
