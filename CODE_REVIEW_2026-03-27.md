# Code Review Report - March 27, 2026

**Review Date:** Friday, Mar 27, 2026  
**Reviewed Commits:** 386aeab, b9e237a  
**Review Standard:** AGENTS.md  

---

## Summary

Code review of 2 commits merged to main branch. Found 4 violations and 1 observation of AGENTS.md standards. Issues created and assigned to authors.

---

## Reviewed Commits

### Commit 1: 386aeab - "fixed burger menu bug"
**Author:** mkssymh  
**Files Modified:**
- `css/projects.css`
- `js/projects-navbar.js`

---

## Violations Found

### Issue #97: CSS Formatting Violations (AGENTS.md - Code Formatting)
**Author:** mkssymh  
**Severity:** Medium

**Violations:**
1. Empty inline semicolon on line 601 of `css/projects.css`
2. Inconsistent spacing and indentation in media queries
3. Code does not follow Prettier formatting standards (2 space indentation)

**Example:**
```css
.header--open .header__menu li {
    /* ... */
    display: inline-block;
    ;  /* <- Empty semicolon */
}
```

**Required Fix:** Clean up CSS formatting to comply with Prettier standards.

---

### Issue #98: JavaScript Architecture Violation (AGENTS.md - Predictable File Structure)
**Author:** mkssymh  
**Severity:** Medium

**Violations:**
The JavaScript was modified to use multiple selectors including ID-based selectors:
- Old: `.header__toggle`
- New: `.header__toggle, #burger` and `#projects-mobile-nav, #nav-menu, .header__nav`

Per AGENTS.md principles, code should:
- Use consistent class-based selectors
- Avoid unnecessary ID selectors when class-based selectors work
- Keep code predictable and maintainable

**Impact:** Indicates potential HTML architecture changes that may not follow BEM naming conventions.

---

### Commit 2: b9e237a - "fixed our mission and our services"
**Author:** korrolse  
**Files Modified:**
- `css/index.mission.partial.css`
- `css/index.our-services.partial.css`
- `index.mission.partial.html`
- `index.our-services.partial.html`

---

### Issue #99: HTML Formatting Violation (AGENTS.md - Code Formatting)
**Author:** korrolse  
**Severity:** Low

**Violations:**
Button element has attributes split across lines without proper Prettier formatting in `index.mission.partial.html`:

```html
<button type="button" class="mission__cta-button"
data-popup-open="project-brief-popup">let's work<span>↗</span></button>
```

Should be formatted consistently with proper indentation.

---

### Issue #100: Missing Newline at EOF (AGENTS.md - Code Formatting)
**Author:** korrolse  
**Severity:** Low

**Violations:**
File `css/index.our-services.partial.css` ends without a newline character.

Per standard code formatting practices and Prettier settings, all text files should end with a newline.

---

### Issue #101: CSS Media Query Organization (AGENTS.md - Responsive Design)
**Author:** korrolse  
**Severity:** Low (Observation)

**Observation:**
The CSS in `css/index.mission.partial.css` was reorganized to move media queries to the end of the file. While this change itself may be acceptable, it should be verified that the mobile-first approach is maintained.

Per AGENTS.md - Responsive Design: "Use mobile-first CSS"

The file structure should ensure mobile-first styles come first, with media queries for larger breakpoints below.

---

## Summary of Issues Created

| Issue | Type | Author | Severity |
|-------|------|--------|----------|
| #97 | CSS Formatting | mkssymh | Medium |
| #98 | JavaScript Architecture | mkssymh | Medium |
| #99 | HTML Formatting | korrolse | Low |
| #100 | Missing Newline | korrolse | Low |
| #101 | CSS Organization | korrolse | Low |

---

## Next Steps

1. Authors should review assigned issues
2. Issues should be addressed in follow-up commits
3. Code should be re-reviewed after fixes

---

## Review Methodology

This review was conducted according to AGENTS.md standards, which define:
- Semantic HTML structure
- HTMX partial architecture
- Mobile-first responsive design
- BEM CSS naming methodology
- Minimal JavaScript
- Predictable file structure
- Semantic file naming
- Simple Git workflow
- Prettier code formatting
