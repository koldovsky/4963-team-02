# Code Review Summary: Commit 7b061ac

## Push Information
- **Repository**: https://github.com/koldovsky/4963-team-02
- **Commit SHA**: 7b061ac370ac4b7fd0344573010aea0f86de82b2
- **Commit Message**: "finished html part"
- **Author**: mkssymh (maxhladiak@gmail.com)
- **Branch**: main
- **File Modified**: single-project.html
- **Lines Changed**: +77, -2 (Lines 248-326)
- **Review Date**: 2026-03-30

---

## Code Review Results

### Overall Compliance: ❌ **CRITICAL - 7 MAJOR VIOLATIONS**

The commit violates AGENTS.md standards in 7 different areas with CRITICAL and HIGH severity issues that prevent merging.

---

## Issues Created

### ✅ Issue #117: Bootstrap Framework Usage - Forbidden Pattern
**Severity**: CRITICAL  
**Category**: Forbidden Pattern  
**Lines**: 255, 258-267, 270-277, 312  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/117

Uses Bootstrap CSS framework classes (`carousel`, `carousel-item`, `carousel-slide`, `data-bs-*`, `d-block w-100`) which is explicitly forbidden in AGENTS.md. The project must remain a vanilla HTML/CSS/JavaScript static site.

---

### ✅ Issue #118: Inline Sections Instead of HTMX Partials
**Severity**: CRITICAL  
**Category**: Architecture Violation  
**Lines**: 254-279 (carousel), 280-287 (contact), 289-325 (footer)  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/118

Adds large inline sections directly to `single-project.html` instead of using HTMX partial loading architecture. Violates AGENTS.md HTML Architecture and HTMX Partial Rules sections.

Requires:
- `single-project.carousel.partial.html`
- `single-project.contact-info.partial.html`
- `global.footer.partial.html`

---

### ✅ Issue #119: Broken HTML Structure - Unclosed Elements
**Severity**: CRITICAL  
**Category**: HTML Validity  
**Lines**: 256, 269  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/119

Multiple HTML structure problems:
1. Line 256: `<div class="carousel-inner">` is never properly closed
2. Line 269: Carousel controls wrapped in bare `<div>` without proper nesting

Results in invalid HTML that breaks rendering and accessibility.

---

### ✅ Issue #120: Missing HTMX Data Attributes
**Severity**: HIGH  
**Category**: HTMX Pattern  
**Lines**: 254, 280, 289  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/120

New sections lack required HTMX attributes:
- `data-hx-trigger="load"`
- `data-hx-swap="outerHTML"`
- `data-hx-get="[partial-path]"`

Depends on Issue #118 (creating partials).

---

### ✅ Issue #121: Code Formatting Issues - Prettier Standards
**Severity**: MEDIUM  
**Category**: Code Style  
**Lines**: 80, 254-279  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/121

Formatting violations:
1. Line 80: Space before equals sign in attribute: `class ="project-info-block"`
2. Lines 254-279: Uses 4-space indentation instead of project standard 2-space

Violates AGENTS.md Code Formatting section (Prettier standards).

---

### ✅ Issue #122: Semantic HTML Violations - Contact Section
**Severity**: MEDIUM  
**Category**: Accessibility  
**Lines**: 280-285  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/122

Contact information uses incorrect semantic HTML:
- `<h3>` element used for data (should be for headings only)
- Email and phone in single text node (should be separate links)
- Missing `<address>` and `<a href="mailto:">`, `<a href="tel:">`

Violates AGENTS.md Accessibility section.

---

### ✅ Issue #123: File Structure Violation - Should Use Partials
**Severity**: HIGH  
**Category**: Project Structure  
**File**: single-project.html (entire approach)  
**Status**: OPEN  
**URL**: https://github.com/koldovsky/4963-team-02/issues/123

Violates AGENTS.md Project Structure and File Naming rules by adding content directly to page instead of using partial architecture used consistently throughout the project.

Current approach breaks maintainability and consistency with other pages.

---

## Violation Summary Table

| # | Issue | Severity | Category | Lines | Status |
|---|-------|----------|----------|-------|--------|
| 117 | Bootstrap Framework | CRITICAL | Forbidden | 255, 258-267, 270-277 | OPEN |
| 118 | Inline Sections | CRITICAL | Architecture | 254-279, 280-287, 289-325 | OPEN |
| 119 | Broken HTML | CRITICAL | HTML Validity | 256, 269 | OPEN |
| 120 | Missing HTMX | HIGH | HTMX Pattern | 254, 280, 289 | OPEN |
| 121 | Code Formatting | MEDIUM | Code Style | 80, 254-279 | OPEN |
| 122 | Semantic HTML | MEDIUM | Accessibility | 280-285 | OPEN |
| 123 | File Structure | HIGH | Architecture | Entire | OPEN |

---

## Related AGENTS.md Sections Violated

1. **Forbidden Patterns** (Lines 452-465)
   - Bootstrap framework usage

2. **HTML Architecture** (Lines 120-161)
   - Large inline sections instead of HTMX partials

3. **HTMX Partial Rules** (Lines 164-197)
   - Missing partial files and naming conventions

4. **Code Formatting** (Lines 379-395)
   - Incorrect indentation (4-space vs 2-space)
   - Space before equals in attributes

5. **Project Structure** (Lines 57-89)
   - Monolithic file instead of partial-based architecture

6. **Component Naming** (Lines 286-308)
   - Generic component naming

7. **Accessibility** (Lines 341-353)
   - Semantic HTML violations
   - Missing alt attributes (existing issues)

---

## Code Review Artifacts

1. **Detailed Report**: `CODE_REVIEW_REPORT_7b061ac.md` (committed to code-review branch)
2. **GitHub Issues**: 7 issues created (#117-#123)
3. **Branch**: `cursor/code-review-issues-1dfb` (pushed to remote)

---

## Recommendation

**Status**: ❌ **REJECT - Cannot Merge**

This commit introduces critical violations that prevent it from being merged to the main branch. Major refactoring is required:

### Must Fix (CRITICAL)
1. Remove Bootstrap framework - replace with custom CSS
2. Create HTMX partial files for carousel, contact, footer
3. Fix broken HTML structure (unclosed elements)
4. Implement HTMX loading architecture

### Should Fix (HIGH)
5. Fix code formatting (indentation, spacing)
6. Add HTMX data attributes to sections

### Could Fix (MEDIUM)
7. Improve semantic HTML in contact section
8. Follow project naming conventions

### Estimated Effort
- **Carousel refactoring**: Custom carousel component without Bootstrap
- **Partial extraction**: 3 new files to create
- **HTML validation**: Fix structural issues
- **Code formatting**: Adjust indentation

---

## Next Steps

### For Author (mkssymh)
1. Review AGENTS.md carefully, especially:
   - HTML Architecture section
   - HTMX Partial Rules section
   - Forbidden Patterns section
   
2. Refer to existing partials as examples:
   - `global.header-nav.partial.html`
   - `index.who-we-are.partial.html`
   - `index.our-services.partial.html`

3. Create required partial files

4. Remove Bootstrap and implement custom CSS

5. Fix HTML structure issues

6. Update commit and re-submit for review

### For Code Reviewers
- Monitor issues #117-#123 for author responses
- Verify all violations resolved before approving
- Ensure compliance with AGENTS.md standards
- Test HTMX functionality of new partials

---

## Project Context

**Project Type**: Static Frontend Website  
**Stack**: HTML, CSS, Vanilla JavaScript, HTMX  
**Architecture**: HTMX partial-based  
**CSS Methodology**: BEM  
**Constraints**: No frameworks (React, Vue, Angular, Tailwind, Bootstrap, etc.)  

This commit violates core project principles and cannot be accepted as-is.

---

**Review Status**: ✅ COMPLETE  
**Issues Created**: 7  
**Code Review Report**: Committed  
**Branch Status**: `cursor/code-review-issues-1dfb` → Ready for PR  

**Reviewer**: Cursor Code Review Agent  
**Review Date**: 2026-03-30 11:23 UTC
