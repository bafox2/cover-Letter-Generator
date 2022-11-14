import Icon from '@mdi/react'
import {
  mdiGithub,
  mdiCodepen,
  mdiWeb,
  mdiMailboxOutline,
  mdiRss,
} from '@mdi/js'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
function Footer() {
  return (
    <footer className={styles.footer}>
        <a href="https://github.com/bafox2" target="_blank" rel="noopener noreferrer">
          <Icon path={mdiGithub} size={1.5} color="black" />
          <p>| bfox © 2022</p>
       </a>

    </footer>
  )
}

export default Footer
