# Code Review Report: 7b061ac - "finished html part"

**Date**: 2026-03-30  
**Commit**: 7b061ac370ac4b7fd0344573010aea0f86de82b2  
**Author**: mkssymh (maxhladiak@gmail.com)  
**Branch**: main  
**File Modified**: single-project.html  

---

## Executive Summary

This commit introduces **CRITICAL violations** of the AGENTS.md architecture standards. The changes include:

- **Bootstrap framework usage** (FORBIDDEN per AGENTS.md)
- **Large inline sections** instead of HTMX partials
- **Broken HTML structure** with unclosed elements
- **Inconsistent code formatting**
- **Semantic HTML violations**

**Overall Compliance**: ❌ **CRITICAL - 7 major violations identified**

---

## Detailed Issues

### Issue 1: Bootstrap Framework Usage ❌ CRITICAL

**Severity**: CRITICAL  
**Violation**: AGENTS.md - Forbidden Patterns (Section: "Forbidden Patterns")  
**Lines**: 255, 258, 260, 263, 266, 270, 274, 312

#### Description
The code uses Bootstrap CSS framework classes, which is explicitly forbidden in AGENTS.md:

> "AI agents must **not introduce**:
> * React
> * Vue
> * Angular
> * **Tailwind**
> * jQuery
> * **CSS frameworks**
> * build systems
> * bundlers"

#### Code Examples
```html
<!-- Line 255 -->
<div id="carouselExample" class="carousel slide">

<!-- Line 257 -->
<div class="carousel-inner">

<!-- Lines 258-267 -->
<div class="carousel-item active">
<div class="carousel-item">

<!-- Lines 270-277 -->
<button class="carousel-control-prev" data-bs-target="#carouselExample">
<button class="carousel-control-next" data-bs-target="#carouselExample">

<!-- Line 312 -->
<button type="submit" class="projects-footer__btn">
```

#### Required Action
- Remove all Bootstrap classes
- Replace with custom CSS using BEM methodology
- Create a custom carousel component using vanilla JavaScript and HTMX
- Follow project's CSS architecture guidelines

---

### Issue 2: Large Inline Sections Instead of HTMX Partials ❌ CRITICAL

**Severity**: CRITICAL  
**Violation**: AGENTS.md - HTML Architecture & HTMX Partial Rules  
**Lines**: 254-279 (carousel), 280-287 (contact), 289-325 (footer)

#### Description
The HTML Architecture section explicitly requires:

> "Rules:
> * **Avoid large inline sections inside pages**
> * Use **HTMX partials instead**
> * Each section should have **a dedicated partial**"

The new sections were added directly inline instead of using HTMX partial loading.

#### Issues
1. **Carousel section** (lines 254-279): Should be `single-project.carousel.partial.html`
2. **Contact section** (lines 280-287): Should be `single-project.contact-info.partial.html`
3. **Footer section** (lines 289-325): Should be `global.footer.partial.html`

#### Required Action
- Create three separate partial files following naming convention: `[page].[component].partial.html`
- Extract carousel, contact, and footer into dedicated partials
- Replace inline content with HTMX loader elements:
  ```html
  <section
    data-hx-trigger="load"
    data-hx-swap="outerHTML"
    data-hx-get="single-project.carousel.partial.html"
  ></section>
  ```

---

### Issue 3: Broken HTML Structure ❌ CRITICAL

**Severity**: CRITICAL  
**Violation**: AGENTS.md - Semantic HTML Structure  
**Lines**: 256, 269

#### Description
The HTML structure has multiple issues that break semantic validity:

#### Problem 1: Unclosed `carousel-inner` div
```html
<!-- Line 256: Opens carousel-inner -->
<div class="carousel-inner">
    <div class="carousel-item active">
        <img src="..." alt="...">
    </div>
<!-- Line 260: Direct div.carousel-item WITHOUT closing carousel-inner -->
<div class="carousel-item">
```

The `carousel-inner` div is never properly closed before sibling carousel items.

#### Problem 2: Carousel controls in bare `<div>`
```html
<!-- Line 269: Controls wrapped in generic div -->
<div>
    <button class="carousel-control-prev" ...>
    <button class="carousel-control-next" ...>
</div>
<!-- Missing closing div for carousel-inner and other containers -->
</section>
```

#### Required Action
- Verify and fix all unclosed HTML elements
- Use proper nesting structure
- Ensure valid semantic HTML before merging
- Run HTML validator (W3C) to verify structure

---

### Issue 4: Missing HTMX Data Attributes ❌ HIGH

**Severity**: HIGH  
**Violation**: AGENTS.md - HTMX Partial Rules  
**Lines**: 254, 280, 289

#### Description
New sections are not using HTMX architecture and miss required data attributes:
- `data-hx-trigger="load"`
- `data-hx-swap="outerHTML"`
- `data-hx-get="[partial-path]"`

#### Current (Wrong)
```html
<section class="recent-projects-carousel">
    <!-- Content directly inline -->
</section>
```

#### Should Be
```html
<section
  data-hx-trigger="load"
  data-hx-swap="outerHTML"
  data-hx-get="single-project.carousel.partial.html"
></section>
```

#### Required Action
- Implement HTMX loading for all new sections
- Create corresponding partial files
- Follow HTMX architecture pattern from HTML Architecture section

---

### Issue 5: Inconsistent Code Formatting ❌ MEDIUM

**Severity**: MEDIUM  
**Violation**: AGENTS.md - Code Formatting (Prettier)  
**Lines**: 80, 254-279

#### Description
Code formatting violates Prettier standards specified in AGENTS.md:

> "Rules:
> * 2 space indentation
> * lowercase HTML attributes
> * consistent nesting"

#### Issues Found

**Issue 5a: Space before equals sign** (Line 80)
```html
<!-- Wrong -->
<section class ="project-info-block">

<!-- Correct -->
<section class="project-info-block">
```

**Issue 5b: Inconsistent indentation** (Lines 254-279)
The carousel section uses 4-space indentation instead of 2-space:
```html
<!-- Line 255-267: Using 4-space indentation -->
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">

<!-- Should be: 2-space indentation -->
      <div id="carouselExample" class="carousel slide">
        <div class="carousel-inner">
          <div class="carousel-item active">
```

#### Required Action
- Fix all indentation to 2-space format
- Remove space before equals in attributes
- Run Prettier or format manually to match project standards

---

### Issue 6: Semantic HTML Violations ❌ MEDIUM

**Severity**: MEDIUM  
**Violation**: AGENTS.md - Accessibility & Semantic HTML  
**Lines**: 280-285

#### Description
Contact information is marked up with incorrect semantic elements:

```html
<!-- Wrong: Using heading elements for contact data -->
<h2 class="contact-info-title">let's create something amazing together</h2>
<h3 class="contact-info">email: ctrl-digital@email.com phone: +1 (234) 567 89 00</h3>
```

#### Issues
1. `<h3>` used for contact details (not a heading)
2. Mixed email and phone in single text (should be semantic elements)
3. No semantic markup for contact type information

#### Correct Approach
```html
<section class="contact-info">
  <div class="container">
    <article class="contact-info-block">
      <h2 class="contact-info__title">Let's create something amazing together</h2>
      <ul class="contact-info__list">
        <li class="contact-info__item">
          <a href="mailto:ctrl-digital@email.com" class="contact-info__link">
            ctrl-digital@email.com
          </a>
        </li>
        <li class="contact-info__item">
          <a href="tel:+1-234-567-8900" class="contact-info__link">
            +1 (234) 567 89 00
          </a>
        </li>
      </ul>
    </article>
  </div>
</section>
```

#### Required Action
- Replace heading elements with semantic contact markup
- Use `<a>` with proper `href` attributes for links
- Follow BEM naming for contact info components
- Improve accessibility for screen readers

---

### Issue 7: File Structure Violation ❌ HIGH

**Severity**: HIGH  
**Violation**: AGENTS.md - Project Structure & File Naming  

#### Description
The commit adds multiple content sections directly to `single-project.html` when they should be split into separate partial files following the project structure rules:

> "Typical repository structure:
> - Partial HTML files should be stored in the project root or `partials/`
> 
> HTMX Partial Naming format: `[page].[component].partial.html`"

#### Current Structure (WRONG)
- `single-project.html` - monolithic file with all content

#### Required Structure (CORRECT)
- `single-project.html` - page template with HTMX loaders
- `single-project.carousel.partial.html` - carousel component
- `single-project.contact-info.partial.html` - contact info section
- `global.footer.partial.html` - footer (shared across pages)

#### Required Action
- Create separate partial files for each section
- Use proper kebab-case naming
- Update `single-project.html` to reference partials via HTMX
- Maintain consistent architecture with other pages in project

---

## Summary of Violations

| Issue | Type | Severity | Lines | Category |
|-------|------|----------|-------|----------|
| Bootstrap Framework | Framework | CRITICAL | 255, 258-277, 312 | Forbidden Pattern |
| Inline Sections | Architecture | CRITICAL | 254-325 | HTMX Violation |
| Broken HTML Structure | HTML | CRITICAL | 256, 269 | Semantic HTML |
| Missing HTMX Attributes | Architecture | HIGH | 254, 280, 289 | HTMX Pattern |
| Inconsistent Formatting | Code Style | MEDIUM | 80, 254-279 | Prettier |
| Semantic HTML | Accessibility | MEDIUM | 280-285 | HTML Best Practice |
| File Structure | Organization | HIGH | Entire | Project Structure |

---

## Recommendation

**Status**: ❌ REJECT - Requires Major Revisions

This commit cannot be merged in its current state. It violates multiple CRITICAL requirements from AGENTS.md:

1. **Must remove Bootstrap** and replace with custom CSS
2. **Must create HTMX partials** for all new sections
3. **Must fix HTML structure** issues
4. **Must format code** per Prettier standards
5. **Must use semantic HTML** for accessibility

**Estimated effort**: Significant refactoring required. The existing implementation needs to be restructured following HTMX architecture pattern used in the rest of the project.

---

## Next Steps for Author (@mkssymh)

1. Review AGENTS.md sections: HTML Architecture, HTMX Partial Rules, Forbidden Patterns
2. Create three new partial files following naming conventions
3. Remove Bootstrap classes and create custom CSS
4. Fix HTML structure issues (unclosed divs)
5. Update formatting to 2-space indentation
6. Implement semantic HTML for contact section
7. Create new commit with proper structure before re-submitting

---

**Code Review Completed**: 2026-03-30  
**Reviewer**: Cursor Code Review Agent  
**Status**: Awaiting Author Response
