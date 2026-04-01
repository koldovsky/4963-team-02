# Code Review - koldovsky/4963-team-02
## Commits Analyzed: 8f028fe (added css) & e3eef75 (merge)
## Date: 2026-04-01

## VIOLATIONS FOUND

### 1. SEMANTIC HTML - Invalid Usage of Elements
**Issue**: Line 114 in single-project.html
```html
<p class ="project-additional-info-description">
     <h3>project summary</h3>
</p>
```
**Violation**: Using `<h3>` inside `<p>` tag. According to HTML spec, `<p>` should only contain phrasing content, not heading elements.
**AGENTS.md Reference**: Line 44 - "Semantic HTML structure"
**Files**: single-project.html (lines 114-118, 119-123)
**Author**: mkssymh (maxhladiak@gmail.com) - commit 8f028fe

### 2. SEMANTIC HTML - Multiple p-tags with block-level content
**Issue**: Lines 119-123 in single-project.html
```html
<p class="project-additional-info">
    <h4>We partnered with...</h4>
</p>
```
**Violation**: Multiple `<p>` tags wrapping heading elements (`<h4>`, `<h3>`). Should use `<div>` instead.
**AGENTS.md Reference**: Line 44 - "Semantic HTML structure"
**Files**: single-project.html (lines 114-123)
**Author**: mkssymh (maxhladiak@gmail.com) - commit 8f028fe

### 3. HARDCODED COLOR VALUES - Missing CSS Variables
**Issue**: Lines 112, 130 in css/single.project.css
```css
.project-info-block .project-header {
    color: #E25D1F;  /* Hardcoded color */
}

.project-main-info h4 {
    color: #CACACA;  /* Hardcoded color */
    opacity: 0.86;   /* Hardcoded opacity */
}
```
**Violation**: Colors hardcoded instead of using CSS variables. Should use `var(--color-primary)` pattern.
**AGENTS.md Reference**: Lines 237-260 - "CSS Variables: All colors must be declared inside :root"
**Files**: css/single.project.css (lines 112, 130, 132)
**Author**: mkssymh (maxhladiak@gmail.com) - commit 8f028fe

### 4. CSS UNIT ISSUES - Non-standard font-weight value
**Issue**: Line 131 in css/single.project.css
```css
.project-main-info h4 {
    font-weight: 350;  /* Invalid CSS value */
}
```
**Violation**: `font-weight: 350` is not a valid CSS value. Valid values are: 100, 200, 300, 400, 500, 600, 700, 800, 900, normal, bold, bolder, lighter, inherit.
**AGENTS.md Reference**: Line 385 - "Code should follow Prettier formatting"
**Files**: css/single.project.css (line 131)
**Author**: mkssymh (maxhladiak@gmail.com) - commit 8f028fe

### 5. INCONSISTENT RESPONSIVE DESIGN - Missing mobile-first approach
**Issue**: css/single.project.css
**Violation**: The new CSS rules (lines 101-133) do not follow mobile-first design. Missing responsive media queries for mobile viewports.
**Example**: `.single-project-image { width: 1170px; }` - Fixed width not responsive
**AGENTS.md Reference**: Lines 264-282 - "Use mobile-first CSS" and "Responsive Design"
**Files**: css/single.project.css (lines 101-106)
**Author**: mkssymh (maxhladiak@gmail.com) - commit 8f028fe

### 6. UNUSED/DUPLICATE CSS SELECTORS
**Issue**: css/index.section-news.partial.css
**Violation**: Line 229-233 defines `.news__subtitle--item` again (already defined at lines 102-111), creating duplicate rules.
```css
.news__subtitle--item {  /* Line 102-111 - original */
  color: var(--brand-color);
  font-family: var(--font-secondary);
  text-align: center;
  font-size: clamp(14px, 4vw, 15px);
}

.news__subtitle--item {  /* Line 229-233 - duplicate */
  font-weight: bold;
  cursor: pointer;
  animation: pulse 1s infinite;
}
```
**AGENTS.md Reference**: Line 51 - "Prefer clarity and maintainability over clever solutions"
**Files**: css/index.section-news.partial.css (lines 102-233)
**Author**: shopiakkh (kshopyak@gmail.com) - commit 5fd3929

---

## SUMMARY

| Violation | Count | Severity | Author | Commit |
|-----------|-------|----------|--------|--------|
| Invalid Semantic HTML | 2 | HIGH | mkssymh | 8f028fe |
| Hardcoded Colors | 3 | MAJOR | mkssymh | 8f028fe |
| Invalid CSS Values | 1 | MEDIUM | mkssymh | 8f028fe |
| Missing Mobile-First | 1 | MAJOR | mkssymh | 8f028fe |
| Duplicate CSS Selectors | 1 | MEDIUM | shopiakkh | 5fd3929 |

**Total Violations**: 8  
**Overall Compliance**: 37.5% (3/8 AGENTS.md rules followed)
