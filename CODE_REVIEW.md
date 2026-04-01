# Code Review Report - Commit badc23b

**Date**: April 1, 2026
**Commit**: badc23b3f7da03aee41f06a6f1caa5d4b9f2d68d
**Message**: added css
**Author**: mkssymh (maxhladiak@gmail.com)
**Files Modified**: 
- css/single.project.css
- single-project.html

---

## Summary

Code review against AGENTS.md standards found **4 major issues** that violate the project's architectural guidelines and code quality standards. All violations require fixing to maintain consistency with the project's strict requirements for HTML semantics, CSS architecture, and BEM naming methodology.

---

## Issues Found

### 1. ❌ CRITICAL: Hardcoded Colors in CSS - Violates CSS Variables Rule

**Location**: css/single.project.css (multiple lines)
**Severity**: High
**Rule Violated**: AGENTS.md - CSS Variables section (lines 237-260)

**Problem**: 
The CSS contains numerous hardcoded color values instead of using CSS variables as required by AGENTS.md:

- Line 5: `background-color: #151515;`
- Line 6: `color: #ffffff;`
- Line 23: `color: #ffffff;`
- Line 59: `color: #ffffff;`
- Line 84-95: Multiple `#ffffff` color values
- Line 123: `color: #E25D1F;`
- Line 134: `color: #ffffff;`
- Line 141: `color: #CACACA;`
- Line 186: `color: #CACACA;`
- Line 194: `color: #E25D1F;`
- Line 203: `color: #ffffff;`
- Line 212: `color: #ffffff;`
- Line 221: `color: #CACACA;`
- Line 230: `color: rgba(202, 202, 202, 0.86);`
- Line 234: `color: rgb(226, 26, 89);`
- Line 275, 278, 293, 296, 309: rgba() colors in borders and shadows

**AGENTS.md Requirement**:
```css
:root {
  --color-primary: #7b1e3b;
  --color-dark: #1a1a1a;
  --color-light: #ffffff;
  --color-gray: #f5f5f5;
}

.button {
  background-color: var(--color-primary);
}
```

**Required Action**:
- Define all colors as CSS variables in `:root`
- Replace all hardcoded color values with variable references
- This applies to the entire stylesheet

**Recommendation**: Use variables like `--color-white`, `--color-accent`, `--color-gray`, `--color-orange`, `--color-pink` throughout the file.

---

### 2. ❌ CRITICAL: Semantic HTML Violation - Using `<p>` for Non-Paragraph Content

**Location**: single-project.html (old markup, lines 181-239 in the diff)
**Severity**: High
**Rule Violated**: AGENTS.md - Semantic HTML structure (lines 44, 341-346)

**Problem**:
The HTML uses `<p>` (paragraph) tags to wrap structural content that is not actually paragraphs. This violates semantic HTML principles.

**Old Code Pattern**:
```html
<p class="project-design-description">
    <h2>design & development</h2>
</p>

<p class="project-key-features">
    <h3>key features:</h3>
</p>

<p class="project-feature">
    <h4>- dynamic photo rendering; - smooth visuals & layout.</h4>
</p>

<p class="design-examples">
    <h3>design examples:</h3>
</p>

<p class="design-examples-info">
    <h4>* Wireframes & prototypes <br>...</h4>
</p>
```

**Issue**: 
- Headings `<h2>`, `<h3>` should NEVER be wrapped in `<p>` tags
- Content wrapped in `<p>` should use semantic containers like `<section>`, `<article>`, or `<div>`
- This breaks accessibility for screen readers

**AGENTS.md Requirement** (lines 343-346):
"Always include:
* alt attributes
* semantic HTML
* readable color contrast"

**Correct Markup**:
```html
<div class="project-design-description">
    <h2>design & development</h2>
</div>

<div class="project-key-features">
    <h3>key features:</h3>
</div>

<div class="project-feature">
    <h4>- dynamic photo rendering; - smooth visuals & layout.</h4>
</div>
```

**Required Action**: 
Replace all `<p>` tags used for layout/structure with appropriate semantic `<div>` elements.

---

### 3. ⚠️ CODE QUALITY: Inconsistent BEM Naming Convention

**Location**: css/single.project.css and single-project.html
**Severity**: Medium
**Rule Violated**: AGENTS.md - CSS Architecture & Component Naming (lines 201-308)

**Problems Found**:

1. **Non-standard naming patterns**:
   - `.project-additional-header` - inconsistent with block naming
   - `.project-objectives h3` - targeting elements directly instead of using consistent modifiers
   - `.design-examples-info__bullet` - OK, follows BEM, but inconsistent with other patterns

2. **Missing double underscore for elements**:
   - `.project-info-block .project-header` - should be `.project-info-block__header`
   - `.project-design-description h2` - should be `.project-design-description__heading`
   - `.project-key-features h3` - should be `.project-key-features__heading`

3. **Inconsistent selector specificity**:
   - Sometimes: `.class h2 { }` (descendant selector)
   - Sometimes: `.class h4 { }` (direct tag targeting)
   - This makes CSS harder to maintain and override

**AGENTS.md Requirement** (lines 203-233):
```css
.block
.block__element
.block__element--modifier

Example:
.header
.header__nav
.header__menu
.header__menu-item
.header__menu-link
```

**Correct Pattern**:
```css
.project-info-block__header
.project-info-block__description
.project-key-features__heading
.project-feature__description
.design-examples__heading
.design-examples-info__bullet
```

**Required Action**: 
Refactor all CSS selectors to strictly follow BEM naming with double underscores for elements, not direct tag selectors.

---

### 4. ⚠️ CODE FORMATTING: Inconsistent HTML Indentation

**Location**: single-project.html (sections around lines 192-287 in the diff)
**Severity**: Low
**Rule Violated**: AGENTS.md - Code Formatting (lines 379-395)

**Problem**:
HTML indentation is inconsistent throughout the file. Some sections have proper 2-space indentation, others are misaligned.

**Example from diff**:
```html
<div class ="project-objectives">    <!-- Extra space before = -->
```

**Issues**:
- Extra spaces in attributes: `class ="project-objectives"` should be `class="project-objectives"`
- Inconsistent nesting levels
- Missing consistent spacing

**AGENTS.md Requirement** (lines 381-387):
"Code should follow **Prettier formatting**.

Rules:
* 2 space indentation
* lowercase HTML attributes
* consistent nesting"

**Required Action**:
- Run HTML through Prettier formatter
- Ensure all attributes have no space before `=`
- Verify consistent 2-space indentation throughout

---

## Summary Table

| Issue | Type | Severity | Location | Impact |
|-------|------|----------|----------|--------|
| Hardcoded Colors | Architecture | **CRITICAL** | css/single.project.css | Cannot theme site, violates design system |
| Non-semantic `<p>` tags | Semantics | **CRITICAL** | single-project.html | Breaks accessibility, poor HTML structure |
| BEM Naming Inconsistency | Code Quality | Medium | Both files | Maintenance burden, unclear selectors |
| Indentation Issues | Formatting | Low | single-project.html | Code readability |

---

## Required Fixes

- [ ] Define all CSS colors as variables in `:root`
- [ ] Replace all hardcoded color values with CSS variable references
- [ ] Replace `<p>` tags used for layout with `<div>` elements
- [ ] Refactor CSS selectors to strict BEM naming (block__element)
- [ ] Format HTML with Prettier (2-space indent, no spaces in attributes)

---

## References

- AGENTS.md CSS Variables (lines 237-260)
- AGENTS.md Semantic HTML (lines 341-346)
- AGENTS.md CSS Architecture & BEM (lines 201-233)
- AGENTS.md Code Formatting (lines 379-395)
