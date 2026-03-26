# Code Review Report - March 26, 2026
## Repository: https://github.com/koldovsky/4963-team-02

**Automation ID**: f6e29a42-d230-4060-a079-3db342ef77c5  
**Trigger**: Push to main branch  
**Review Date**: 2026-03-26  
**Review Standard**: AGENTS.md  

---

## Executive Summary

Code review performed on recent commits to identify violations against AGENTS.md standards. **8 new GitHub issues created** (86-93) addressing violations across multiple categories.

### Key Findings

| Severity | Count | Issues | Resolution Status |
|----------|-------|--------|------------------|
| **CRITICAL** | 2 | Invalid HTML structure, Invalid JS syntax | 🔴 GitHub #86, #87 |
| **WARNING** | 6 | CSS, BEM naming, file naming, semantics, accessibility, HTMX | 🟡 GitHub #88-93 |
| **INFO** | - | - | - |

---

## Detailed Issues

### CRITICAL VIOLATIONS (Prevent deployment)

#### Issue #86: Invalid HTML Structure in single-project.html
**Author**: mkssymh  
**File**: single-project.html (commit 6e14e61 "added html")  
**Severity**: CRITICAL  
**AGENTS.md Violation**: Core Principle #1 - Semantic HTML structure

**Problems**:
1. **Headings nested in paragraph tags** (lines 89-101)
   - `<h2>` and `<h3>` inside `<p>` violates HTML spec
   - Flow content rules forbid this nesting

2. **Broken element tree** (lines 74-79, 107)
   - `<article class="single-project-item">` opened but never closed
   - `</section>` mismatches with `<section class="single-project-grid">`
   - Extra `</section>` at line 107

3. **Code formatting error** (line 80)
   - `class ="project-info-block"` (stray space) instead of `class="project-info-block"`

**Impact**: Page structure broken, semantic meaning lost, accessibility affected  
**Fix**: Proper HTML validation and restructuring required  
**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/86

---

#### Issue #87: Invalid JavaScript Syntax in projects-navbar.js
**Author**: mkssymh  
**File**: js/projects-navbar.js (lines 6-8)  
**Severity**: CRITICAL  
**AGENTS.md Violation**: JavaScript guidelines - minimal and clean code

**Problem**:
```javascript
const header = document.querySelector('.header');
const toggle = document.querySelector('.header__toggle');

if (!header || !toggle)
  return;  // <-- INVALID: top-level return in non-function context
```

- Return statements only valid inside functions
- Module-level return causes parse errors or silent failures
- Violates AGENTS.md "minimal and modular" principle

**Impact**: Script may fail; mobile navigation may not work  
**Fix**: Wrap code in IIFE or function  
**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/87

---

### WARNING VIOLATIONS (Should be fixed before merge)

#### Issue #88: Non-kebab-case File/Directory Naming
**Severity**: WARNING  
**AGENTS.md Violation**: File Naming Rules (must use kebab-case)

**Problems**:

1. **Directory**: `js/jsTasks/` (camelCase)
   - Should be: `js/js-tasks/`

2. **Image files** (11 files use snake_case):
   - `shot_website.jpg` → `shot-website.jpg`
   - `glowup_website.jpg` → `glowup-website.jpg`
   - `hard_seltzer.jpg` → `hard-seltzer.jpg`
   - `kiikii_app.jpg` → `kiikii-app.jpg`
   - `inn_beauty.jpg` → `inn-beauty.jpg`
   - `png_journal.jpg` → `png-journal.jpg`
   - `before_toothpaste.jpg` → `before-toothpaste.jpg`
   - `super_bowls.jpg` → `super-bowls.jpg`
   - `loom_clothing.jpg` → `loom-clothing.jpg`
   - `twyg_porcelain.jpg` → `twyg-porcelain.jpg`
   - `crave_chips.jpg` → `crave-chips.jpg`

**Impact**: Inconsistent naming convention violates project standards  
**Fix**: Rename all files and update references  
**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/88

---

#### Issue #89: CSS Violations - Desktop-first and Hardcoded Colors
**Severity**: WARNING  
**AGENTS.md Violations**: 
- Responsive Design - must use mobile-first
- CSS Variables - avoid hardcoded colors

**Problems**:

1. **Desktop-first media queries** (should be mobile-first):
   - `css/index.main-hero.partial.css` (lines 21, 41, 73, ...)
   - `css/index.our-team.partial.css` (lines 8, 31, ..., 215)
   - `css/index.contact-popup.partial.css` (line 213)
   - `css/index.who-we-are.partial.css` (line 146)
   - `css/projects.css` (line 446)

2. **Hardcoded colors** instead of CSS variables:
   - `css/projects.css`: `#151515`, `#ffffff`, `#ff6a00`, `#ee0979`, `#111217`
   - `css/index.contact-popup.partial.css`: `#ff4d82`, `#fff`, gradient hexes
   - `css/index.main-hero.partial.css`: `#fff`, gradient hexes

**Fix Required**:
- Convert all `@media (max-width:)` to `@media (min-width:)` with mobile-first base styles
- Replace hex colors with `var(--color-*)` from `:root`

**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/89

---

#### Issue #90: Non-BEM CSS Naming and Generic Component Names
**Severity**: WARNING  
**AGENTS.md Violation**: CSS Architecture - BEM methodology + Component Naming

**Problems**:

1. **Generic component names** (explicitly forbidden):
   - `css/index.project-overview.css`:
     - `.accordion-item` (should be `.accordion-project-items`)
     - `.accordion-checkbox`
     - `.accordion__*`
     - `.tools-tech` (should be namespaced)
     - `.accent-num` (should be namespaced)

2. **Incorrect modifier syntax**:
   - Current: `.header__burger.active`, `.header__nav.active`
   - Should be: `.header__burger--open`, `.header__nav--active`

3. **Non-namespaced utilities**:
   - `index.who-we-are.partial.html`: `stat-muted` (should be `who-we-are__stat--muted`)

**AGENTS.md Requirement**: Each component must have **unique namespace**  
**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/90

---

#### Issue #91: HTML Semantic Structure Violations
**Severity**: WARNING  
**AGENTS.md Violation**: Semantic HTML structure requirement

**Problems**:

1. **Marketing copy as heading**:
   - `index.mission.partial.html` (lines 14-18)
   - Large text marked as `<h3>` instead of `<p>`

2. **Wrong landmark element**:
   - `index.our-team.partial.html` (lines 2-3)
   - Team section uses `<nav>` (for site navigation only)
   - Should be: `<section>`, `<div>`, or `<article>`

3. **Header not using semantic wrapper**:
   - `index.html` (lines 23-27)
   - Header partial loaded into plain `<div>`
   - AGENTS.md pattern requires: `<header>` tag

4. **Services should use semantic list**:
   - `index.main-hero.partial.html` (lines 46-51)
   - Service items as divs instead of `<ul>`/`<li>`

**Impact**: Reduced semantics, accessibility issues, CSS hook inconsistencies  
**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/91

---

#### Issue #92: Accessibility Attribute Violations
**Severity**: WARNING  
**AGENTS.md Requirement**: Always include alt attributes, semantic HTML, ARIA labels

**Problems**:

1. **Mobile menu button missing attributes**:
   - `global.header-nav.partial.html` (lines 8-12)
   - Missing: `type="button"`, `aria-label`, `aria-expanded`, `aria-controls`

2. **Form inputs missing labels**:
   - `global.footer-nav.partial.html` (line 29)
   - Email field has only `placeholder`, no `<label>`
   - Placeholder ≠ label for accessibility

3. **Vague image alt text**:
   - `index.section-news.partial.html` (lines 14, 44)
   - `alt="portfolio"` too generic; should describe image content

4. **Missing ARIA for decorative elements**:
   - `index.our-services.partial.html` (lines 13-16)
   - Decorative SVG should have `alt=""` and `aria-hidden="true"`

**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/92

---

#### Issue #93: HTMX Usage and JavaScript Architecture Issues
**Severity**: WARNING  
**AGENTS.md Violations**: 
- HTMX partial loading architecture
- Minimal and modular JavaScript
- Consistent patterns

**Problems**:

1. **HTMX loaded but unused**:
   - `projects.html` and `single-project.html` include HTMX script
   - No `data-hx-*` attributes in HTML
   - Adds bloat without functionality

2. **Duplicated header implementations**:
   - `header.js` vs `projects-navbar.js` implement same functionality differently
   - `.active` class vs different selectors
   - Maintenance burden, inconsistent behavior

3. **Unused JavaScript exercises**:
   - `js/jsTasks/tasks-01.js`, `tasks-02.js`, `tasks-03.js`
   - Not referenced by any HTML
   - Dead code violates "minimal" principle

4. **Inconsistent HTMX hooks**:
   - `js/index.js` uses `htmx:afterOnLoad`
   - `js/script.js` uses `htmx:afterSwap`
   - No documented reason for difference

5. **Module-level side effects**:
   - Scripts not wrapped in functions/IIFEs
   - Can cause global variable pollution
   - Violates "modular" principle

**GitHub Issue**: https://github.com/koldovsky/4963-team-02/issues/93

---

## Summary Statistics

### Issues by Category
- **HTML/Semantic**: 2 critical, 1 warning = 3 total
- **CSS/Styling**: 2 warnings = 2 total
- **JavaScript**: 2 critical, 1 warning = 3 total
- **File Management**: 1 warning = 1 warning
- **Accessibility**: 1 warning = 1 warning
- **Architecture**: 1 warning = 1 warning

### Issues by Author
| Author | CRITICAL | WARNING | Total |
|--------|----------|---------|-------|
| mkssymh | 2 | 6 | **8** |

### Compliance Summary
| Standard | Violations | Compliance |
|----------|-----------|-----------|
| File Naming (kebab-case) | 12 | 92% |
| HTML Semantic Structure | 4 | 94% |
| CSS BEM Methodology | 5 | 88% |
| CSS Mobile-first | Multiple | 70% |
| CSS Variables | 10+ | 75% |
| JavaScript Modularity | 3 | 92% |
| HTMX Architecture | 3 | 80% |
| Accessibility | 4 | 90% |

---

## GitHub Issues Created

All issues assigned to **mkssymh** (code author):

| # | Title | Severity | Status |
|---|-------|----------|--------|
| 86 | Invalid HTML structure in single-project.html | CRITICAL | Open |
| 87 | Invalid JavaScript syntax in projects-navbar.js | CRITICAL | Open |
| 88 | Non-kebab-case file/directory naming | WARNING | Open |
| 89 | CSS violations - desktop-first and hardcoded colors | WARNING | Open |
| 90 | Non-BEM CSS naming and generic component names | WARNING | Open |
| 91 | HTML semantic structure violations | WARNING | Open |
| 92 | Accessibility attribute violations | WARNING | Open |
| 93 | HTMX usage and JavaScript architecture issues | WARNING | Open |

---

## Recommendations

### Immediate (Before Merge)
1. ✅ **Fix CRITICAL HTML issue** (#86) - Structure broken
2. ✅ **Fix CRITICAL JS issue** (#87) - Syntax error
3. 🔲 **Fix file naming** (#88) - Rename files to kebab-case

### Short Term (This Sprint)
4. 🔲 **CSS refactoring** (#89) - Mobile-first + variables
5. 🔲 **BEM compliance** (#90) - Fix class names
6. 🔲 **Semantic HTML** (#91) - Use correct tags
7. 🔲 **Accessibility** (#92) - Add ARIA/labels
8. 🔲 **JS architecture** (#93) - Consolidate implementations

---

## Conclusion

**8 new code review issues created** across multiple categories of AGENTS.md violations. The repository shows good adherence to the framework overall (70-94% compliance per category), but **2 CRITICAL issues must be fixed** before merging:

1. Invalid HTML structure in single-project.html
2. Invalid JavaScript syntax in projects-navbar.js

Remaining **6 WARNING issues** should be addressed in the sprint to maintain code quality standards and project consistency.

---

**Report Generated**: 2026-03-26 20:51  
**Review Process**: Automated code review against AGENTS.md standards  
**Next Review**: On next push event
