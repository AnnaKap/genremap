import Link from 'next/link'


const linkStyle = {
    marginRight: 10, 
    textDecoration: 'none'
}

const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
        <Link href='/auth/login'>
            <a style={linkStyle}>Spotify Login</a>
        </Link>
    </div>
)

export default Header