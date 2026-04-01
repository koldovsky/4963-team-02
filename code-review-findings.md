# Code Review Findings - Commit dc2bebd

**Author:** mkssymh  
**Date:** Wed Apr 1 19:03:57 2026  
**Commit:** dc2bebd8d1fe02f41f83bfe612c67bb8a5e0b093

## Files Changed
- `css/single.project.css`
- `single-project.html`

## Issues Created

### Issue #159: Invalid HTML Structure
**Severity:** High  
**Category:** Semantic HTML  

Invalid HTML nesting structure in single-project.html (lines 138-209):
- Article tag with incorrect indentation
- Improper closing tag order (</div> before </article>)
- Extra </div> tag outside of article element

**AGENTS.md Violation:** Semantic HTML structure requirement

---

### Issue #160: Hardcoded Colors
**Severity:** Medium  
**Category:** CSS Architecture  

Hardcoded color values instead of CSS variables:
- #E25D1F (orange)
- #ffffff (white)
- #CACACA (gray)

**AGENTS.md Violation:** CSS Variables requirement - "All colors must be declared inside :root"

---

### Issue #161: Code Formatting Issues
**Severity:** Medium  
**Category:** Code Formatting  

Inconsistent indentation and removed whitespace:
- Mixed 2-space and 4-space indentation
- Removed empty lines between logical sections
- Breaks Prettier formatting standard

**AGENTS.md Violation:** Code Formatting requirement - "2 space indentation, consistent nesting"

---

### Issue #162: Accessibility & Documentation
**Severity:** Low  
**Category:** Accessibility  

New CSS class without proper documentation:
- New `project-design-header` class needs documentation
- CSS positioning (top: 50px) may affect accessibility
- Needs keyboard navigation testing

**AGENTS.md Violation:** Accessibility requirement and Component Naming guideline

---

## Summary

4 issues identified based on AGENTS.md standards:
- 1 High severity (HTML structure)
- 2 Medium severity (CSS colors, formatting)
- 1 Low severity (accessibility/documentation)

All issues assigned to @mkssymh for remediation.

## GitHub Issues Created

✅ Issue #159: Invalid HTML Structure  
   https://github.com/koldovsky/4963-team-02/issues/159

✅ Issue #160: Hardcoded Colors  
   https://github.com/koldovsky/4963-team-02/issues/160

✅ Issue #161: Code Formatting Issues  
   https://github.com/koldovsky/4963-team-02/issues/161

✅ Issue #162: Accessibility & Documentation  
   https://github.com/koldovsky/4963-team-02/issues/162

**Note:** Issues mention mkssymh as the author for assignment. GitHub CLI permissions prevent automatic assignment.
