import NextLink from 'next/link'

export { Link }

// Utility Copmonent - Wraps a traditional a tag inside the NextLink routing component
function Link({ href, children, ...props }) {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    )
}