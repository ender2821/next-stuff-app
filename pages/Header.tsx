
import Link from 'next/link';
import Logo from '../assets/schit-logo.svg'
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <span>
        <Link href="/">
          <Logo />
        </Link>
      </span>
    </header>
  )
}