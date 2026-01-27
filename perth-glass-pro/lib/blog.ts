import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Blog posts are stored in /content/blog (as configured in Decap CMS)
const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    thumbnail?: string;
    excerpt?: string;
    content: string;
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
            slug,
            title: matterResult.data.title || 'Untitled',
            date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
            thumbnail: matterResult.data.thumbnail || '',
            excerpt: matterResult.data.excerpt || '',
            content: matterResult.content,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            title: matterResult.data.title || 'Untitled',
            date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
            thumbnail: matterResult.data.thumbnail || '',
            excerpt: matterResult.data.excerpt || '',
            content: matterResult.content,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}
