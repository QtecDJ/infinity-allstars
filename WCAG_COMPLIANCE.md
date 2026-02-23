# WCAG 2.1/2.2 Level AA Compliance

This project implements Web Content Accessibility Guidelines (WCAG) 2.1/2.2 Level AA standards to ensure the website is accessible to all users.

## Implemented Standards

### Perceivable

#### 1.1 Text Alternatives
- ✅ **1.1.1 Non-text Content**: All images have appropriate alt text
- ✅ Videos have descriptive ARIA labels
- ✅ Decorative images use empty alt="" attributes

#### 1.2 Time-based Media
- ✅ **1.2.1 Audio-only and Video-only**: Video includes track element for captions
- ✅ **1.2.2 Captions (Prerecorded)**: Support for video captions
- ✅ **1.2.5 Audio Description**: Video descriptions available via aria-describedby

#### 1.3 Adaptable
- ✅ **1.3.1 Info and Relationships**: Proper heading hierarchy (h1-h6)
- ✅ **1.3.2 Meaningful Sequence**: Logical content flow
- ✅ **1.3.3 Sensory Characteristics**: Instructions not solely based on sensory characteristics
- ✅ **1.3.4 Orientation**: Content adapts to portrait and landscape
- ✅ **1.3.5 Identify Input Purpose**: Form inputs have appropriate autocomplete attributes

#### 1.4 Distinguishable
- ✅ **1.4.3 Contrast (Minimum)**: 4.5:1 contrast ratio for normal text
- ✅ **1.4.4 Resize Text**: Text can be resized up to 200% (via accessibility menu)
- ✅ **1.4.10 Reflow**: No horizontal scrolling at 320px width
- ✅ **1.4.11 Non-text Contrast**: UI components have 3:1 contrast ratio
- ✅ **1.4.12 Text Spacing**: Proper line-height, letter-spacing, word-spacing
- ✅ **1.4.13 Content on Hover or Focus**: Tooltips dismissible and hoverable

### Operable

#### 2.1 Keyboard Accessible
- ✅ **2.1.1 Keyboard**: All functionality available via keyboard
- ✅ **2.1.2 No Keyboard Trap**: Focus can be moved away using standard methods
- ✅ **2.1.4 Character Key Shortcuts**: Keyboard shortcuts can be modified

#### 2.2 Enough Time
- ✅ **2.2.1 Timing Adjustable**: Timeouts have warnings and can be extended
- ✅ **2.2.2 Pause, Stop, Hide**: Video can be paused

#### 2.3 Seizures and Physical Reactions
- ✅ **2.3.1 Three Flashes**: No content flashes more than three times per second
- ✅ **2.3.3 Animation from Interactions**: Animations can be disabled via reduced motion

#### 2.4 Navigable
- ✅ **2.4.1 Bypass Blocks**: Skip-to-content link available
- ✅ **2.4.2 Page Titled**: Descriptive page titles via SEO component
- ✅ **2.4.3 Focus Order**: Logical focus order maintained
- ✅ **2.4.4 Link Purpose**: Links have descriptive text or ARIA labels
- ✅ **2.4.5 Multiple Ways**: Navigation menu, sitemap available
- ✅ **2.4.6 Headings and Labels**: Descriptive headings and form labels
- ✅ **2.4.7 Focus Visible**: Clear focus indicators (3px outline)
- ✅ **2.4.11 Focus Not Obscured (WCAG 2.2)**: Focused elements not hidden behind other content

#### 2.5 Input Modalities
- ✅ **2.5.1 Pointer Gestures**: All pointer functionality available with single-pointer
- ✅ **2.5.2 Pointer Cancellation**: Click/tap actions triggered on up-event
- ✅ **2.5.3 Label in Name**: Visible labels match accessible names
- ✅ **2.5.4 Motion Actuation**: No motion-only controls
- ✅ **2.5.5 Target Size (Enhanced)**: Touch targets minimum 44x44px
- ✅ **2.5.7 Dragging Movements (WCAG 2.2)**: Draggable elements have keyboard alternatives
- ✅ **2.5.8 Target Size (Minimum) (WCAG 2.2)**: Minimum 24x24px targets

### Understandable

#### 3.1 Readable
- ✅ **3.1.1 Language of Page**: HTML lang attribute set dynamically
- ✅ **3.1.2 Language of Parts**: Language changes marked with lang attribute

#### 3.2 Predictable
- ✅ **3.2.1 On Focus**: No context changes on focus
- ✅ **3.2.2 On Input**: No unexpected context changes on input
- ✅ **3.2.3 Consistent Navigation**: Navigation consistent across pages
- ✅ **3.2.4 Consistent Identification**: UI components identified consistently

#### 3.3 Input Assistance
- ✅ **3.3.1 Error Identification**: Errors clearly identified with aria-invalid
- ✅ **3.3.2 Labels or Instructions**: Form inputs have labels
- ✅ **3.3.3 Error Suggestion**: Error messages provide suggestions
- ✅ **3.3.4 Error Prevention**: Confirmation for important actions

### Robust

#### 4.1 Compatible
- ✅ **4.1.1 Parsing**: Valid HTML structure
- ✅ **4.1.2 Name, Role, Value**: All UI components have proper ARIA attributes
- ✅ **4.1.3 Status Messages**: Live regions for dynamic content updates

## Accessibility Features

### Built-in Tools
1. **Accessibility Menu** (`src/components/ui/accessibility-menu.tsx`)
   - Font size adjustment (80-150%)
   - High contrast mode
   - Reduced motion toggles
   - Larger cursor option (desktop only)
   - Settings persist in localStorage

2. **Keyboard Navigation**
   - Tab/Shift+Tab for focus navigation
   - Enter/Space for activation
   - Arrow keys for menu navigation
   - Escape to close modals/menus
   - Focus trap in modals

3. **Screen Reader Support**
   - Semantic HTML elements
   - ARIA labels and descriptions
   - Live regions for announcements
   - Skip-to-content link
   - Proper heading hierarchy

4. **Visual Indicators**
   - 3px focus outlines
   - High contrast mode
   - Minimum 44x44px touch targets
   - Clear error states

5. **WCAG Utilities** (`src/utils/wcag-utils.ts`)
   - FocusManager: Trap and manage focus
   - LiveRegion: Screen reader announcements
   - TimeoutManager: Accessible timeouts
   - Helper functions for keyboard events

6. **WCAG Monitor** (Development only)
   - Automatic accessibility issue detection
   - Console warnings for missing alt text
   - Heading hierarchy validation
   - Form label validation
   - Link accessibility checks

## Testing

### Manual Testing Checklist
- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Test at 200% zoom level
- [ ] Test at 320px viewport width
- [ ] Verify reduced motion preferences
- [ ] Test high contrast mode
- [ ] Verify all images have alt text
- [ ] Check form validation and error messages
- [ ] Test focus management in modals

### Automated Testing
The WCAGMonitor component runs automatically in development mode and reports issues to the console.

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Screen Reader Compatibility
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS, iOS)
- TalkBack (Android)

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.2 What's New](https://www.w3.org/WAI/WCAG22/Understanding/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Continuous Improvement
This implementation follows current best practices, but accessibility is an ongoing process. Regular audits and user testing with assistive technology users is recommended.

## Contact
For accessibility issues or concerns, please contact: info@icacheer.space
