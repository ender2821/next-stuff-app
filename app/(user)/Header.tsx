
import classNames from 'classnames';
import Link from 'next/link';

import Logo from '../../assets/schit-logo.svg'
import SecondaryLogo from '../../assets/schit-logo-secondary.svg';
import BackIcon from '../../assets/back-icon.svg'
import BackSecondaryIcon from '../../assets/back-secondary-icon.svg'

import styles from './header.module.scss';
import { useRouter, usePathname } from 'next/navigation';

type HeaderProps = {
  className?: string;
  secondaryLayout?: boolean;
  titleText?: string;
}

export default function Header(props:HeaderProps) {
  const { className, secondaryLayout, titleText } = props
  const router = useRouter();
  const path = usePathname();

  return (
    <header className={classNames(styles.header, {[styles.headerSecondary]: className})}>
      {path !== '/' && <button className={styles.backButton} onClick={() => router.back()}>{secondaryLayout ? <BackSecondaryIcon /> : <BackIcon/>}</button>}
      <div className={styles.title}>
        <Link href="/">
          {secondaryLayout ? <SecondaryLogo /> : <Logo />}
        </Link>
        {titleText !== '' && <span className={styles.titleText}>{titleText}</span>}
      </div>
    </header>
  )
}