import Link from "next/link";

const pages = [
    {href:'/', name:'Home'}
];

export default function Header(){
    return <header>
        <nav className={styles.nav}>
            <ul>
                {pages.map(({href, name})=> <li key={href}><Link href={href}>{name}</Link></li>)}
            </ul>
        </nav>
    </header>;
}