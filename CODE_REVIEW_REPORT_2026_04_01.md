# Code Review Report - koldovsky/4963-team-02
**Date**: 2026-04-01  
**Repository**: https://github.com/koldovsky/4963-team-02  
**Branch**: main  
**Commits Analyzed**: 2 (8f028fe, 5fd3929, e3eef75)

## Executive Summary

Code review of recent commits revealed **5 violations** of AGENTS.md standards. The violations span semantic HTML, CSS architecture, and responsive design. 

**Overall Compliance**: 37.5% (3/8 AGENTS.md rules followed)  
**Issues Created**: 5  
**Authors Assigned**: 2

---

## Issues Created

### 🔴 Issue #139: Invalid Semantic HTML - Heading elements inside paragraph tags
- **Severity**: HIGH
- **Author**: @mkssymh (maxhladiak@gmail.com)
- **Commit**: 8f028fe - 'added css'
- **Files**: single-project.html (lines 114-123)
- **AGENTS.md Reference**: Line 44 - "Semantic HTML structure"

**Problem**: Heading elements (`<h3>`, `<h4>`) incorrectly nested inside `<p>` tags.

```html
<!-- ❌ WRONG -->
<p class="project-additional-info-description">
     <h3>project summary</h3>
</p>

<!-- ✅ CORRECT -->
<div class="project-additional-info-description">
     <h3>project summary</h3>
</div>
```

---

### 🔴 Issue #140: Hardcoded Color Values - Missing CSS Variables
- **Severity**: MAJOR
- **Author**: @mkssymh (maxhladiak@gmail.com)
- **Commit**: 8f028fe - 'added css'
- **Files**: css/single.project.css (lines 112, 130, 132)
- **AGENTS.md Reference**: Lines 237-260 - "CSS Variables"

**Problem**: Colors hardcoded instead of using CSS variables.

```css
/* ❌ WRONG */
.project-info-block .project-header {
    color: #E25D1F;  /* Hardcoded */
}

/* ✅ CORRECT */
.project-info-block .project-header {
    color: var(--color-header-label);
}
```

**Required Action**: Add to :root in global.css:
```css
:root {
  --color-header-label: #E25D1F;
  --color-description-text: #CACACA;
}
```

---

### 🟠 Issue #141: Invalid CSS font-weight Value - 350 is not valid
- **Severity**: MEDIUM
- **Author**: @mkssymh (maxhladiak@gmail.com)
- **Commit**: 8f028fe - 'added css'
- **Files**: css/single.project.css (line 131)
- **AGENTS.md Reference**: Lines 379-395 - "Code Formatting"

**Problem**: `font-weight: 350` is invalid. Valid values are: 100, 200, 300, 400, 500, 600, 700, 800, 900.

```css
/* ❌ WRONG */
.project-main-info h4 {
    font-weight: 350;  /* Invalid */
}

/* ✅ CORRECT */
.project-main-info h4 {
    font-weight: 400;  /* or 300 based on design */
}
```

---

### 🔴 Issue #142: Missing Mobile-First Responsive Design
- **Severity**: MAJOR
- **Author**: @mkssymh (maxhladiak@gmail.com)
- **Commit**: 8f028fe - 'added css'
- **Files**: css/single.project.css (lines 101-106)
- **AGENTS.md Reference**: Lines 264-282 - "Responsive Design"

**Problem**: Fixed width (1170px) without mobile-first media queries. Will break on mobile devices.

```css
/* ❌ WRONG - Desktop-first */
.single-project-image {
    width: 1170px;  /* Fixed, not responsive */
}

/* ✅ CORRECT - Mobile-first */
.single-project-image {
    width: 100%;  /* Mobile: full width */
    max-width: 1170px;
}

@media (min-width: 768px) {
    .single-project-image {
        width: 100%;
    }
}
```

---

### 🟠 Issue #143: Duplicate CSS Selector
- **Severity**: MEDIUM
- **Author**: @shopiakkh (kshopyak@gmail.com)
- **Commit**: 5fd3929 - 'change news css'
- **Files**: css/index.section-news.partial.css (lines 102-111, 229-233)
- **AGENTS.md Reference**: Line 51 - "Prefer clarity and maintainability"

**Problem**: `.news__subtitle--item` selector defined twice, creating duplicate rules.

```css
/* First definition (lines 102-111) */
.news__subtitle--item {
  color: var(--brand-color);
  font-family: var(--font-secondary);
  text-align: center;
  font-size: clamp(14px, 4vw, 15px);
}

/* Second definition (lines 229-233) - DUPLICATE */
.news__subtitle--item {
  font-weight: bold;
  cursor: pointer;
  animation: pulse 1s infinite;
}

/* ✅ MERGE into one definition */
.news__subtitle--item {
  color: var(--brand-color);
  font-family: var(--font-secondary);
  text-align: center;
  font-size: clamp(14px, 4vw, 15px);
  font-weight: bold;
  cursor: pointer;
  animation: pulse 1s infinite;
}
```

---

## Violation Summary

| Issue | Severity | Category | Author | File | Lines |
|-------|----------|----------|--------|------|-------|
| #139 | HIGH | Semantic HTML | mkssymh | single-project.html | 114-123 |
| #140 | MAJOR | CSS Variables | mkssymh | single.project.css | 112,130,132 |
| #141 | MEDIUM | CSS Syntax | mkssymh | single.project.css | 131 |
| #142 | MAJOR | Responsive Design | mkssymh | single.project.css | 101-106 |
| #143 | MEDIUM | CSS Architecture | shopiakkh | index.section-news.partial.css | 102-111,229-233 |

---

## AGENTS.md Compliance Analysis

| Rule | Status | Notes |
|------|--------|-------|
| Semantic HTML Structure | ❌ FAIL | Issue #139: Invalid `<p>` nesting |
| BEM CSS Naming | ✅ PASS | Correctly uses BEM notation |
| CSS Variables | ❌ FAIL | Issue #140: 3 hardcoded colors |
| Mobile-First Design | ❌ FAIL | Issue #142: Fixed width without breakpoints |
| CSS Formatting | ❌ FAIL | Issue #141: Invalid font-weight value |
| Code Clarity | ❌ FAIL | Issue #143: Duplicate selectors |
| Project Structure | ✅ PASS | Files in correct directories |
| Forbidden Patterns | ✅ PASS | No frameworks/libraries used |

**Overall Score**: 3/8 passing = **37.5% Compliance**

---

## Commits Analyzed

### Commit 8f028fe - "added css" (mkssymh)
- **Author**: mkssymh (maxhladiak@gmail.com)
- **Files Changed**: 2
  - css/single.project.css (+38 lines)
  - single-project.html (27 insertions, 14 deletions)
- **Issues**: #139, #140, #141, #142 (4 violations)

### Commit 5fd3929 - "change news css" (shopiakkh)
- **Author**: shopiakkh (kshopyak@gmail.com)
- **Files Changed**: 1
  - css/index.section-news.partial.css (+1 line)
- **Issues**: #143 (1 violation)

### Commit e3eef75 - "Merge branch 'main'" (mkssymh)
- **Type**: Merge commit
- **Issues**: None (merge introduces issues from both branches)

---

## Recommendations

### Priority 1 (Fix Immediately)
1. **Fix Semantic HTML** (#139) - Affects HTML validation
2. **Add CSS Variables** (#140) - Design consistency
3. **Fix Mobile-First Design** (#142) - UX critical

### Priority 2 (Fix Soon)
4. **Correct font-weight** (#141) - CSS validity
5. **Merge CSS Selectors** (#143) - Code quality

---

## Authors and Assignments

### mkssymh (maxhladiak@gmail.com)
- **Issues**: #139, #140, #141, #142 (4 total)
- **Violations**: 4
- **Severity**: 1 HIGH, 2 MAJOR, 1 MEDIUM
- **Assigned To**: @mkssymh

### shopiakkh (kshopyak@gmail.com)
- **Issues**: #143 (1 total)
- **Violations**: 1
- **Severity**: 1 MEDIUM
- **Assigned To**: @shopiakkh

---

## AGENTS.md Key References

### Semantic HTML (Line 44)
> "Semantic HTML structure" is a core development principle.

### CSS Variables (Lines 237-260)
> "All colors must be declared inside `:root`"
> "Avoid hardcoded colors when variables exist"

### Responsive Design (Lines 264-282)
> "Use **mobile-first CSS**"
> "Avoid desktop-first media queries"

### Code Formatting (Lines 379-395)
> "Code should follow **Prettier formatting**"
> "2 space indentation, lowercase HTML attributes, consistent nesting"

### Code Clarity (Line 51)
> "Prefer **clarity and maintainability** over clever solutions"

---

## Action Items

- [ ] Author mkssymh: Fix 4 violations (issues #139-142)
- [ ] Author shopiakkh: Fix 1 violation (issue #143)
- [ ] Review manager: Verify fixes before merge
- [ ] Team: Consider adding pre-commit hooks to prevent similar violations

---

**Report Generated**: 2026-04-01 11:59 UTC  
**GitHub Issues**: 139, 140, 141, 142, 143  
**Status**: ⏳ Awaiting author responses
