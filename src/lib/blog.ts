import { serialize } from 'next-mdx-remote/serialize';

export interface BlogPost {
    title: string;
    date: string;
    author: string;
    description: string;
    tags: string[];
    slug: string;
    content: string;
    readTime: number;
    imageUrl: string;
}

const blogPosts: BlogPost[] = [
    {
        slug: 'data-science-best-practices',
        title: 'Data Science Best Practices: From Data Collection to Deployment',
        date: 'March 15, 2024',
        author: 'Rhett Jorgensen',
        description: 'A comprehensive guide to data science best practices, covering the entire pipeline from data collection to model deployment.',
        tags: ['Data Science', 'Machine Learning', 'Best Practices', 'Python', 'Data Analysis'],
        content: `# Data Science Best Practices: From Data Collection to Deployment

This is a comprehensive guide to data science best practices...`,
        readTime: 10,
        imageUrl: '/images/blog/data-science.jpg',
    },
    {
        slug: 'modern-web-development',
        title: 'Modern Web Development: Best Practices and Essential Tools',
        date: 'March 16, 2024',
        author: 'Rhett Jorgensen',
        description: 'A comprehensive guide to modern web development practices, covering essential tools, frameworks, and best practices for building robust web applications.',
        tags: ['Web Development', 'Frontend', 'Backend', 'Best Practices', 'TypeScript', 'React'],
        content: `# Modern Web Development: Best Practices and Essential Tools

This is a comprehensive guide to modern web development...`,
        readTime: 12,
        imageUrl: '/images/blog/web-development.jpg',
    },
    {
        slug: 'building-my-portfolio',
        title: 'Building My Developer Portfolio: A Journey in Next.js and Modern Web Development',
        date: 'March 20, 2024',
        author: 'Rhett Jorgensen',
        description: 'Join me on my journey of building a modern portfolio website using Next.js, and learn about the technologies and decisions that shaped this project.',
        tags: ['Next.js', 'Web Development', 'Portfolio', 'Job Search'],
        content: `# Building My Developer Portfolio: A Journey in Next.js and Modern Web Development

Creating a developer portfolio is more than just showcasing your work—it's an opportunity to demonstrate your skills, thought process, and attention to detail. In this post, I'll share my journey of building my portfolio using Next.js and modern web development practices.

## 1. Planning and Design

Before writing any code, it's crucial to plan your portfolio:

### Key Considerations
- Target audience
- Content structure
- Visual design
- Technical requirements
- Performance goals

### Design Principles
- Clean and professional look
- Easy navigation
- Mobile responsiveness
- Fast loading times
- Accessibility compliance

## 2. Technology Stack

Choosing the right technology stack is crucial:

### Core Technologies
- **Next.js**: For server-side rendering and routing
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For utility-first styling
- **MDX**: For blog content
- **Framer Motion**: For animations

## 3. Project Structure

A well-organized project structure is essential:

\`\`\`
src/
├── app/
│   ├── (routes)/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── projects/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── styles/
\`\`\`

## 4. Key Features Implementation

Let's look at some key features:

### Responsive Navigation

\`\`\`typescript
const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold">
                        Portfolio
                    </Link>
                    
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <MenuIcon />
                    </button>
                    
                    <div className={\`\${isOpen ? 'block' : 'hidden'} md:block\`}>
                        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/projects">Projects</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
\`\`\`

## 5. Performance Optimization

Performance is crucial for a portfolio:

### Image Optimization
- Use Next.js Image component
- Implement proper image sizing
- Use WebP format when possible
- Implement lazy loading

### Code Optimization
- Implement code splitting
- Use dynamic imports
- Minimize bundle size
- Implement proper caching

## 6. Deployment

Deploying a Next.js application:

### Deployment Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Custom server

### Deployment Process
1. Set up environment variables
2. Configure build settings
3. Set up custom domain
4. Implement proper caching
5. Set up monitoring

## 7. Continuous Improvement

A portfolio is never truly finished:

### Regular Updates
- Add new projects
- Update skills
- Write new blog posts
- Improve performance
- Enhance accessibility

### Analytics and Feedback
- Implement analytics
- Gather user feedback
- Monitor performance
- Track user behavior

## Conclusion

Building a developer portfolio is a continuous journey that requires:

1. **Planning**: Clear vision and structure
2. **Technology**: Right tools for the job
3. **Implementation**: Clean and maintainable code
4. **Performance**: Fast and efficient
5. **Content**: Regular updates and improvements
6. **Feedback**: Continuous improvement based on analytics

Remember that your portfolio is a living document of your skills and growth. Keep it updated, experiment with new technologies, and always strive to improve.`,
        readTime: 8,
        imageUrl: '/images/blog/portfolio.jpg',
    },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
    return blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const post = blogPosts.find((p) => p.slug === slug);
    
    if (!post) {
        return null;
    }

    const mdxSource = await serialize(post.content);
    return {
        ...post,
        content: mdxSource,
    };
} 