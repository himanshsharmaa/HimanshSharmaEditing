# Video Editor Portfolio Website

A modern, minimal, and professional portfolio website for video editors showcasing short-form and long-form content.

## Features

✨ **Modern Design**
- Clean, creative aesthetic with dark theme
- Smooth scrolling and subtle animations
- Modern typography with responsive scaling
- Fully responsive for desktop, tablet, and mobile

📱 **Content Showcase**
- **Short-Form Section**: Grid layout for Instagram Reels and YouTube Shorts (6 videos)
- **Long-Form Section**: Landscape layout for YouTube videos and promotional edits (4 videos)
- **About Section**: Personal introduction with skills and tools

🎥 **Video Integration**
- Embedded video players with custom controls
- Smooth hover effects and transitions
- Responsive video containers with proper aspect ratios
- Lightbox-style video viewing

🎨 **Design Highlights**
- Dark background (#0a0e27) with cyberpunk accents (cyan #00d9ff, magenta #ff006e)
- Smooth fade-in animations on scroll
- Floating gradient backgrounds in hero section
- Professional skill cards with hover states
- Custom scrollbar styling

♿ **Accessibility**
- Semantic HTML structure
- Keyboard navigation support
- Focus states for interactive elements
- Alt text and proper video labels
- ARIA-friendly design

## File Structure

```
video-editing-portfolio/
├── index.html          # Main HTML file with structure
├── styles.css          # Complete styling with animations
├── script.js           # JavaScript for interactions
└── README.md          # This file
```

## Getting Started

### Local Setup
1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. No build tools or dependencies required

### Live Server (Recommended)
For best development experience, use VS Code's Live Server:
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Browser will auto-refresh on file changes

## Customization

### Update Videos
Edit the `src` attribute in `index.html` video tags:
```html
<video src="your-video-url.mp4" controls></video>
```

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-bg: #0a0e27;      /* Main background */
    --accent-color: #00d9ff;    /* Cyan accent */
    --accent-alt: #ff006e;      /* Magenta accent */
    /* ... more variables */
}
```

### Change Content
- **Hero Section**: Update `.hero-title`, `.hero-subtitle`, `.hero-description` text
- **About Section**: Edit `.about-description` and skill items
- **Navigation**: Modify `.nav-menu` links and `.logo` text
- **Video Labels**: Update `.video-label` and `.video-caption` text

## Video Sources

The portfolio uses sample videos from Google's test video library:
- `ForBiggerBlazes.mp4`
- `ElephantsDream.mp4`
- `BigBuckBunny.mp4`

Replace these with your actual portfolio videos:
```html
<video src="path/to/your/video.mp4" controls></video>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

- **Desktop**: Full multi-column layout
- **Tablet** (768px and below): 2-column grid for short-form, single-column for long-form
- **Mobile** (480px and below): Single-column layout
- **Navbar**: Responsive navigation with smooth scrolling

## Performance Optimizations

- Optimized CSS with efficient selectors
- Lazy loading support for videos
- Smooth 60fps animations using CSS transforms
- Minimal JavaScript for better performance
- CSS Grid and Flexbox for responsive layouts

## JavaScript Features

- **Smooth Scroll Navigation**: Click nav links to smooth scroll to sections
- **Intersection Observer**: Fade-in animations as content enters viewport
- **Video Autoplay Hover**: Videos preview on hover (when possible)
- **Keyboard Navigation**: Use arrow keys to navigate between sections
- **Scroll Effects**: Navbar shadow on scroll

## Customization Tips

### Add More Videos
1. Add `.video-card` divs to desired section
2. Update grid column counts in CSS if needed
3. Animations will automatically apply

### Change Typography
Modify in `styles.css`:
```css
h1, h2, h3 { font-family: 'Your Font', sans-serif; }
```

### Adjust Animations
Edit animation delays and durations in `styles.css`:
```css
.video-card:nth-child(1) { animation-delay: 0s; }
```

### Mobile-First Approach
Customize breakpoints in media queries:
```css
@media (max-width: 768px) { /* tablet */ }
@media (max-width: 480px) { /* mobile */ }
```

## No External Dependencies

This portfolio is built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks or libraries required!

## Future Enhancements

- [ ] Contact form integration
- [ ] Blog/articles section
- [ ] Client testimonials carousel
- [ ] Advanced lightbox with gallery navigation
- [ ] Dark/light theme toggle
- [ ] Video filtering by category
- [ ] Analytics integration

## License

Free to use and modify for personal portfolio purposes.

## Notes

- All content is placeholder-ready for your actual videos
- Remove `controlsList="nodownload"` from videos if you want to allow downloads
- Test videos across different browsers for compatibility
- Consider optimizing video file sizes for web delivery
- Use CSS `prefers-reduced-motion` for accessibility

---

**Built with ❤️ for video creators**
